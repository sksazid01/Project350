const API_BASE_URL = import.meta.env.VITE_API_BASE || 'https://backend350.vercel.app';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon, CalendarIcon, ClockIcon, MapPinIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
const token = localStorage.getItem('accessToken');

const EventCard = ({ event }) => (
  <div className="panel card bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 p-4">
    <img
      src={event.image || '/assets/images/coming-soon.svg'}
      alt={event.title}
      className="w-full h-48 object-cover rounded-xl"
    />
    <div className="space-y-4 mt-4">
      <div className="flex items-center">
        <CalendarIcon className="w-6 h-6 text-yellow-400" />
        <p className="ml-3 text-sm font-medium text-gray-900">
          {new Date(event.date).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center">
        <ClockIcon className="w-6 h-6 text-blue-500" />
        <p className="ml-3 text-sm font-medium text-gray-900">
          {new Date(event.date).toLocaleTimeString()}
        </p>
      </div>
      <div className="flex items-center">
        <MapPinIcon className="w-6 h-6 text-green-500" />
        <p className="ml-3 text-sm font-medium text-gray-900">
          {event.location || 'Location not specified'}
        </p>
      </div>
      <p className="text-gray-700 text-base leading-relaxed">{event.description}</p>
      <div className="flex items-center">
        <BuildingLibraryIcon className="w-5 h-5 text-blue-500" />
        <span className="ml-2 text-sm text-gray-600">{event.clubName || 'Unknown Club'}</span>
      </div>
    </div>
  </div>
);

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [finishedEvents, setFinishedEvents] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.currentUser);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      let response = await axios.get(`${API_BASE_URL}/events/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const eventClubIds = [...new Set(response.data.map((event) => event.clubId))];
      if (!showAllEvents && user) {
        console.log(response.data);
        const userClubIds = user.clubs.map((club) => club.id);
        response.data = response.data.filter((item) => userClubIds.includes(item.clubId));
        console.log(user.clubs)
        
      }

      
      const clubsResponse = await axios.get(`${API_BASE_URL}/clubs/club/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const clubs = clubsResponse.data;

      const clubMap = new Map(clubs.map((club) => [club.id, club.name]));

      const eventsWithClubNames = response.data.map((event) => ({
        ...event,
        clubName: clubMap.get(event.clubId) || 'Unknown Club',
      }));

      setUpcomingEvents(eventsWithClubNames.filter((event) => new Date(event.date) > new Date()));
      setFinishedEvents(eventsWithClubNames.filter((event) => new Date(event.date) <= new Date()));
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [showAllEvents]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-end">
        <button
          onClick={() => setShowAllEvents(!showAllEvents)}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
        >
          <span className="font-medium text-base">{showAllEvents ? 'My Club Events' : 'All Events'}</span>
          {showAllEvents ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeSlashIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Events</h1>

      <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No upcoming events found.</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-3">Finished Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {finishedEvents.length > 0 ? (
          finishedEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p>No finished events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
