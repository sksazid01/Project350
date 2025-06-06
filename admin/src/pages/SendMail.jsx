import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/userSlice';

const SendMail = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [selectedOption, setSelectedOption] = useState('all');
  const [selectedClub, setSelectedClub] = useState('');
  const [sending, setSending] = useState(false);
  const [recipientCount, setRecipientCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  console.log(user);

  // Error boundary
  if (hasError) {
    return (
      <div className="p-4 text-red-600">
        An error occurred while loading the email form. Please try refreshing the page.
      </div>
    );
  }
  if (user.role !== 'admin' && user.role !== 'moderator') {
    return (
      <div className="p-4 text-red-600">
        You are not authorized to access this page.
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  // Fetch clubs for the dropdown
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/clubs');
        setClubs(response.data.results || []);
        console.log('Clubs fetched:', response.data.results[0].id);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        toast.error('Failed to load clubs');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Base URL for API requests
  const API_BASE_URL = 'https://backend350.vercel.app/v1';
  const token = localStorage.getItem('accessToken');

  // Update recipient count when selection changes
  useEffect(() => {
    const updateRecipientCount = async () => {
      try {
        console.log('Updating recipient count. Option:', selectedOption, 'Club:', selectedClub);
        
        if (!token) {
          console.error('No authentication token found');
          toast.error('Please log in to continue');
          return;
        }

        if (selectedOption === 'all') {
          console.log('Fetching users...');
          const response = await fetch(`${API_BASE_URL}/users?limit=1000`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Users fetched:', data);
          const count = data?.results?.length || data?.length || 0
          console.log('Total users:', count);
          setRecipientCount(count);
          
        } else if (selectedOption === 'club' && selectedClub) {
          console.log('Fetching club members for club:', selectedClub);
          const response = await fetch(`${API_BASE_URL}/clubs/${selectedClub}/members`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              moderatorId: user.id // Assuming user object is available from Redux
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Club members response:', data);
          const count = Array.isArray(data) ? data.length : 0;
          setRecipientCount(count);
          
        } else {
          console.log('No valid selection, setting recipient count to 1');
          setRecipientCount(1);
        }
      } catch (error) {
        console.error('Error fetching recipient count:', error);
        toast.error('Failed to fetch recipient count. Using default count.');
        setRecipientCount(1);
      }
    };

    updateRecipientCount();
  }, [selectedOption, selectedClub, token]);

  // Debug log for form values and button state
  useEffect(() => {
    console.log('Form values:', watch());
    console.log('Button disabled state:', {
      sending,
      clubSelected: selectedOption === 'club',
      hasClub: !!selectedClub,
      hasRecipients: recipientCount > 0,
      isDisabled: sending || (selectedOption === 'club' && !selectedClub) || recipientCount === 0
    });
  }, [watch(), sending, selectedOption, selectedClub, recipientCount]);

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    
    if (selectedOption === 'club' && !selectedClub) {
      toast.error('Please select a club');
      return;
    }

    if (!token) {
      toast.error('Please log in to continue');
      return;
    }

    const recipient = selectedOption === 'all' ? 'all' : selectedClub;
    console.log('Sending to recipient:', recipient);

    try {
      setSending(true);
      console.log('Sending email...');
      
      const response = await fetch(`${API_BASE_URL}/mail/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: recipient,
          subject: data.subject,
          message: data.message,
        })
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to send email');
      }

      console.log('Email sent successfully:', responseData);
      toast.success(responseData.message || 'Email sent successfully');
      reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(error.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  // Button styles
  const buttonBase = 'px-4 py-2 rounded-md font-medium transition-colors';
  const buttonPrimary = 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50';
  const buttonSecondary = 'bg-gray-200 text-gray-800 hover:bg-gray-300';
  const buttonSelected = 'ring-2 ring-blue-500';

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Send Email</h1>
            <p className="text-gray-600 mt-1">
              Send emails to all users or specific club members
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Recipient Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  type="button"
                  className={`${buttonBase} ${selectedOption === 'all' ? buttonPrimary : buttonSecondary} ${selectedOption === 'all' ? buttonSelected : ''} flex-1 flex items-center justify-center`}
                  onClick={() => setSelectedOption('all')}
                >
                  <span className="mr-2">👥</span>
                  All Users
                </button>
                <button
                  type="button"
                  className={`${buttonBase} ${selectedOption === 'club' ? buttonPrimary : buttonSecondary} ${selectedOption === 'club' ? buttonSelected : ''} flex-1 flex items-center justify-center`}
                  onClick={() => setSelectedOption('club')}
                >
                  <span className="mr-2">👥</span>
                  Club Members
                </button>
              </div>

              {selectedOption === 'club' && (
                <div className="mb-4">
                  <label htmlFor="club" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Club
                  </label>
                  <select
                    id="club"
                    value={selectedClub}
                    onChange={(e) => setSelectedClub(e.target.value)}
                    disabled={loading}
                    required={selectedOption === 'club'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select a club</option>
                    {clubs.map((club) => (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="text-sm text-gray-500">
                {recipientCount > 0 ? (
                  <div className="flex items-center text-green-600">
                    <span className="mr-1">✓</span>
                    Will be sent to {recipientCount} {recipientCount === 1 ? 'recipient' : 'recipients'}
                  </div>
                ) : (
                  <span>No recipients selected</span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Email subject"
                {...register('subject', { required: 'Subject is required' })}
                disabled={sending}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={8}
                placeholder="Write your message here..."
                {...register('message', { required: 'Message is required' })}
                disabled={sending}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={sending || (selectedOption === 'club' && !selectedClub) || !watch('subject') || !watch('message')}
                className={`${buttonBase} ${buttonPrimary} inline-flex items-center ${
                  (sending || (selectedOption === 'club' && !selectedClub) || !watch('subject') || !watch('message')) 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-700'
                }`}
              >
                {sending ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Email
                    <span className="ml-2">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMail;