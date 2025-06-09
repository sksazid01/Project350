import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

// Base URL for the API (adjust if necessary)
const API_BASE_URL = import.meta.env.VITE_API_BASE || 'https://backend350.vercel.app/v1';

// Helper to format date and time
const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    try {
        return new Date(isoDate).toLocaleDateString(undefined, { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });
    } catch (e) {
        return 'Invalid Date';
    }
};

function EventsList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Function to fetch events
    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('Authentication token not found. Please log in.');
            Swal.fire('Error', 'Authentication token not found. Please log in.', 'error');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/events`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            });

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg; 
                } catch(e) { /* Ignore parse error */ }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            // Ensure data is an array, handle potential pagination object
             if (Array.isArray(data)) {
                setEvents(data);
            } else if (data && Array.isArray(data.results)) { // Common pagination structure
                 setEvents(data.results);
            } else {
                 console.warn("Unexpected API response structure for events:", data);
                 setEvents([]); // Default to empty array if structure is wrong
                  Swal.fire('Warning', 'Received unexpected data structure for events.', 'warning');
            }
        } catch (err) {
            console.error("Failed to fetch events:", err);
            setError(err.message || 'Failed to fetch events. Please try again later.');
             Swal.fire('Error', err.message || 'Failed to fetch events.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(); // Initial fetch
    }, []);

    // Function to handle event deletion
    const handleDelete = async (eventId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            background: '#374151',
            color: '#f9fafb'
        });

        if (!result.isConfirmed) {
            return; // User cancelled
        }

        setError(null); // Clear previous errors
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('Authentication token not found. Please log in.');
             Swal.fire({
                title: 'Error',
                text: 'Authentication token not found. Please log in.',
                icon: 'error',
                background: '#374151',
                color: '#f9fafb'
             });
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                let errorMsg = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (parseError) { /* Ignore */ }
                throw new Error(errorMsg);
            }
            
            fetchEvents(); // Refresh list after delete
            Swal.fire({
                title: 'Deleted!',
                text: 'The event has been deleted.',
                icon: 'success',
                background: '#374151',
                color: '#f9fafb'
            });

        } catch (err) {
            console.error("Failed to delete event:", err);
            setError(err.message || 'Failed to delete event.');
            Swal.fire({
                title: 'Error',
                text: err.message || 'Failed to delete event.',
                icon: 'error',
                background: '#374151',
                color: '#f9fafb'
            });
        }
    };

    // Helper function to render content based on state
    const renderEventContent = () => {
        if (loading) {
            return (
                 <div className="flex justify-center items-center h-32">
                    {/* You can replace this with a spinner component if you have one */}
                    <span className="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto"></span> 
                    <span className="ml-2 text-gray-300">Loading events...</span>
                 </div>
            );
        }

        // Optional: Add error display here if desired
        // if (error) {
        //     return <p className="text-red-400 mb-4">Error: {error}</p>;
        // }

        if (events.length === 0) {
            return (
                <div className="text-center text-gray-400 p-6 border border-dashed border-gray-600 rounded bg-gray-800">
                    No events found.
                </div>
            );
        }

        // Render event grid
        return (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event) => {
                    // Construct full image URL if event.image is a relative path
                    const imageUrl = event.image ? 
                        (event.image.startsWith('http') ? event.image : `${API_BASE_URL}${event.image}`) 
                        : '/assets/images/coming-soon.svg';

                    return (
                        <div key={event.id || event._id} className="panel card bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-xl hover:shadow-gray-700/50 transition-shadow duration-300 border border-gray-700">
                            {/* Card Image */}
                            <img 
                                src={imageUrl} // Use constructed URL
                                alt={event.title || 'Event Image'} 
                                className="w-full h-48 object-cover" 
                                onError={(e) => { e.target.onerror = null; e.target.src='/assets/images/coming-soon.svg'; }} // Fallback on error to SVG
                            />

                            {/* Card Body */}
                            <div className="p-4 flex-grow">
                                <h2 className="text-lg font-semibold mb-2 text-white truncate" title={event.title}>{event.title || 'Untitled Event'}</h2>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{event.description || 'No description available.'}</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2 flex-shrink-0 text-blue-400" />
                                        <span title={event.date}>{formatDate(event.date)}</span>
                                    </div>
                                    {event.time && (
                                        <div className="flex items-center">
                                            <FaClock className="mr-2 flex-shrink-0 text-green-400" />
                                            <span title={event.time}>{event.time}</span>
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="mr-2 flex-shrink-0 text-red-400" />
                                            <span className="truncate" title={event.location}>{event.location}</span>
                                        </div>
                                    )}
                                    {event.clubName && (
                                        <div className="flex items-center">
                                            <BuildingLibraryIcon className="mr-2 flex-shrink-0 w-5 h-5 text-blue-400" />
                                            <span className="truncate" title={event.clubName}>{event.clubName}</span>
                                        </div>
                                    )}
                                </div>
                            </div> {/* Closing card body div */}

                            {/* Card Footer - Actions */}
                            <div className="p-3 bg-gray-700 border-t border-gray-600 flex justify-end space-x-2">
                                <button 
                                    onClick={() => navigate(`/event/edit/${event.id || event._id}`)} 
                                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
                                    title="Edit Event"
                                >
                                    <FaEdit size={16}/>
                                </button>
                                <button 
                                    onClick={() => handleDelete(event.id || event._id)}
                                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200"
                                    title="Delete Event"
                                >
                                    <FaTrash size={16}/>
                                </button>
                            </div> {/* Closing card footer div */}
                        </div>
                    );
                })}
            </div>
        );
    };

    // Render logic
    return (
        <div className="panel p-4 md:p-6 bg-gray-900 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-xl font-semibold text-white">Events</h1>
                <Link to="/event/add">
                    <button type="button" className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto">
                        Add New Event
                    </button>
                </Link>
            </div>

            {/* Render content using the helper function */}
            {renderEventContent()}

        </div>
    );
}

export default EventsList;
