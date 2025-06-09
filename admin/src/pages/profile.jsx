import { Mail, Phone, Globe, MapPin, User, Briefcase, School, Calendar, Book, Users, Share2, Building2 } from 'lucide-react';
import IconLinkedin from '../components/Icon/IconLinkedin';
import IconTwitter from '../components/Icon/IconTwitter';
import IconFacebook from '../components/Icon/IconFacebook';
import IconGithub from '../components/Icon/IconGithub';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../redux/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { FiHash } from 'react-icons/fi';

export default function Component() {
  const { studentId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE;
  
  // Immediately redirect if studentId is undefined
  useEffect(() => {
    if (!studentId) {
      console.error('Student ID is undefined, redirecting to home');
      navigate('/');
    }
  }, [studentId, navigate]);

  useEffect(() => {
    dispatch(setPageTitle('Profile'));
    
    const fetchUser = async () => {
      // Only attempt to fetch if studentId is defined
      if (studentId) {
        try {
          const res = await axiosInstance.get(`/users/profile/${studentId}`);
          if (res.data) {
            setUser(res.data);
          } else {
            // If no user data is returned, navigate to home page
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If there's an error (e.g., 404), navigate to home page
          navigate('/');
        } finally {
          setLoading(false);
        }
      } else {
        // If studentId is undefined, set loading to false and navigate to home
        console.error('Student ID is undefined');
        setLoading(false);
        navigate('/');
      }
    };
    
    fetchUser();
  }, [studentId, dispatch, navigate, API_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0e1726]">
        <div className="text-white-light text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // This shouldn't be reached now, but keeping it as a fallback
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-[#0e1726] min-h-screen">
      <div className="bg-[#191e3a] shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-[#1b2e4b]">
        {/* Cover Image */}
        <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 to-purple-500 relative">
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Profile Section */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 absolute -top-12 sm:-top-16 left-4 sm:left-8 ring-4 ring-[#191e3a] rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={user.avatar || '/default-avatar.png'} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div className="ml-32 sm:ml-44 sm:ml-0 sm:mt-16">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center text-white-light">
              <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
              {user.name}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 flex items-center mt-1">
              <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
              {user.profession || 'Student'}
            </p>
            <p className="text-sm sm:text-base text-gray-300 flex items-center mt-1">
              <School className="w-4 h-4 mr-2 text-gray-400" />
              <strong> Shahjalal University of Science & Technology</strong>
            </p>
            <p className="text-sm sm:text-base text-gray-300 flex items-center mt-1">
              <Building2 className="w-4 h-4 mr-2 text-gray-400" />
              Department of {user.department || 'N/A'} <Calendar className="w-4 h-4 mx-2 text-gray-400" /> Semester {user.semester || 'N/A'}
            </p>
            <p className="text-sm sm:text-base text-gray-300 flex items-center mt-1">
              <FiHash className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" />
              <span className="font-medium">Student ID:</span>
              <span className="ml-1 break-all">{studentId || 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* About Section */}
        {user.bio && (
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center text-white-light">
              <Book className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
              About
            </h2>
            <p className="text-gray-300">{user.bio}</p>
          </div>
        )}

        {/* Contact Information */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center text-white-light">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
            Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.email && (
              <div className="flex items-center text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
                <span className="text-gray-300">{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
                <span className="text-gray-300">{user.phone}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center text-sm sm:text-base">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
                <a href={user.website} className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300">
                  {user.website}
                </a>
              </div>
            )}
            {user.address && (
              <div className="flex items-center text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
                <span className="text-gray-300">{user.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {user.skills && user.skills.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center text-white-light">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-0.5 rounded-full text-xs sm:text-sm font-medium bg-blue-900 text-blue-200 transition-all duration-300 hover:bg-blue-800 hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Enrolled Clubs Section */}
        {user.clubs && user.clubs.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center text-white-light">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
              Enrolled Clubs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.clubs.map((club, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-[#1b2e4b] rounded-lg shadow-sm hover:shadow-md hover:bg-[#2a3c5a] transition-all duration-300">
                  <div className="flex-shrink-0">
                    <img src={club.logo || '/default-club-logo.png'} alt={`${club.name} logo`} className="w-10 h-10 rounded-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-white-light">{club.name || 'Unknown Club'}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center text-white-light">
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-500" />
            Social Links
          </h2>
          <div className="flex space-x-4">
            {user.facebook && (
              <a href={user.facebook} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <IconFacebook className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
            )}
            {user.twitter && (
              <a href={user.twitter} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <IconTwitter className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
            )}
            {user.github && (
              <a href={user.github} className="text-gray-400 hover:text-gray-200 transition-colors duration-300">
                <IconGithub className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
            )}
            {user.linkedin && (
              <a href={user.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <IconLinkedin className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}