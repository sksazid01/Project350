import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Base URL for the API (adjust if necessary)
const API_BASE_URL = 'https://backend350.vercel.app/v1'; // From your .env file

const EditEvent = () => {
    const { eventId } = useParams(); // Get eventId from URL
    const navigate = useNavigate();

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [clubId, setClubId] = useState(''); // Store original clubId if needed, maybe disable editing?
    const [image, setImage] = useState('');

    // Component/loading state
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch event data on mount
    useEffect(() => {
        const fetchEventData = async () => {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('Authentication token not found. Please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // Populate form state
                setTitle(data.title || '');
                setDescription(data.description || '');
                // Format date correctly for input type="date" (YYYY-MM-DD)
                setDate(data.date ? new Date(data.date).toISOString().split('T')[0] : ''); 
                setTime(data.time || '');
                setLocation(data.location || '');
                setClubId(data.clubId || ''); // Set clubId (consider if editable)
                setImage(data.image || '');

            } catch (err) {
                console.error("Failed to fetch event data:", err);
                setError(err.message || 'Failed to load event data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [eventId]); // Re-fetch if eventId changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('Authentication token not found. Please log in.');
            setSubmitting(false);
            return;
        }

        // Only include fields that are meant to be updated
        // Note: clubId is currently not being sent in the update
        const updateData = {
            title,
            description,
            date,
            time,
            location,
            image, 
            // Do not include clubId here unless you intend for it to be editable
            // Do not include createdBy either
        };

        try {
            const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
                method: 'PATCH', // Use PATCH for updates
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                 throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
            }

            setSuccess('Event updated successfully!');
            // Navigate back after a delay
            setTimeout(() => navigate('/event'), 1500);

        } catch (err) {
            console.error("Failed to update event:", err);
            setError(err.message || 'Failed to update event.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="bg-gray-900 min-h-screen p-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <p className="text-white">Loading event details...</p>
            </div>
        </div>
    );

    // Form structure similar to AddEvent.jsx
    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <div className="panel bg-gray-800 rounded-lg p-6 shadow-lg">
                <h1 className="text-lg font-semibold mb-5 text-white">Edit Event</h1>
                {error && <p className="text-red-400 text-sm mb-4">Error: {error}</p>}
                {success && <p className="text-green-400 text-sm mb-4">{success}</p>}
                
                <form onSubmit={handleSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title *</label>
                            <input 
                                type="text" 
                                id="title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                         <div className="mb-4">
                            <label htmlFor="clubIdDisplay" className="block text-sm font-medium text-gray-300">Club ID</label>
                            <input 
                                type="text" 
                                id="clubIdDisplay" 
                                value={clubId} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-gray-400 cursor-not-allowed" 
                                readOnly 
                                disabled 
                            />
                            {/* Club ID is generally not editable after creation */}
                        </div>
                        <div className="mb-4 md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description *</label>
                            <textarea 
                                id="description" 
                                rows="3" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date *</label>
                            <input 
                                type="date" 
                                id="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                         <div className="mb-4">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-300">Time</label>
                            <input 
                                type="text" 
                                id="time" 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="e.g., 10:00 AM - 12:00 PM" 
                            />
                        </div>
                         <div className="mb-4">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
                            <input 
                                type="text" 
                                id="location" 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                         <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-300">Image URL (Optional)</label>
                            <input 
                                type="text" 
                                id="image" 
                                value={image} 
                                onChange={(e) => setImage(e.target.value)} 
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="https://example.com/image.jpg" 
                            />
                        </div>
                     </div>

                    <div className="flex justify-end mt-4">
                        <button 
                            type="button" 
                            onClick={() => navigate('/event')} 
                            className="px-4 py-2 mr-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50" 
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" 
                            disabled={submitting}
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;