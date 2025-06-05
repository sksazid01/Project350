import React, { useState } from 'react';
import ClubManagementBackgrounds from '../components/club_management_backgrounds';


// Club Activities Background
const ClubActivitiesBackground = ({ children, className = "" }) => {
  return (
    <section className={`relative overflow-hidden py-14 lg:py-[100px] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-800 to-teal-900">
        {/* Activity circles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-blue-400 opacity-30"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 10}%`,
              top: `${15 + i * 5}%`,
              animation: `ripple ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}

        {/* Activity icons floating */}
        {['⚽', '🏸', '🎭', '🎨', '📚', '🎵', '💻', '🏃'].map((icon, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `activityFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {icon}
          </div>
        ))}

        {/* Connecting particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleMove ${4 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
};

// Demo Component
const ClubManagementDemo = () => {
  const [currentBg, setCurrentBg] = useState('community');

  const backgrounds = {
    activities: ClubActivitiesBackground,
  };

  const BackgroundComponent = backgrounds[currentBg];

  const bgTitles = {
    community: 'Community Network',
    events: 'Event Calendar',
    activities: 'Club Activities',
    leadership: 'Leadership Dashboard'
  };

  return (
    <div className="min-h-screen">
      {/* Background Selector */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg p-4 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Background Theme</h3>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(backgrounds).map(([key, _]) => (
            <button
              key={key}
              onClick={() => setCurrentBg(key)}
              className={`px-4 py-2 rounded text-sm transition-all ${
                currentBg === key 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {bgTitles[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Background Section */}
      <div className="relative pt-14 pb-0 lg:pt-20 lg:pb-60 xl:pt-36">
        <div className="absolute inset-0 w-full h-full z-0">
          <ClubManagementBackgrounds />
        </div>
        <div className="relative z-10">
          <BackgroundComponent>
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto text-center text-white">
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Club Management System
                </h1>
                <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                  Streamline your club operations, manage members, organize events, and build stronger communities with our comprehensive platform
                </p>
                
                {/* Feature highlights */}
                <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl mb-3">👥</div>
                    <h3 className="text-lg font-semibold mb-2">Member Management</h3>
                    <p className="text-blue-100 text-sm">Efficiently manage member profiles, subscriptions, and communications</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl mb-3">📅</div>
                    <h3 className="text-lg font-semibold mb-2">Event Planning</h3>
                    <p className="text-blue-100 text-sm">Plan, schedule, and track club events with integrated calendar system</p>
                  </div>
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="text-lg font-semibold mb-2">Analytics & Reports</h3>
                    <p className="text-blue-100 text-sm">Get insights into member engagement and club performance</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                    Start Free Trial
                  </button>
                  <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-3 rounded-lg font-semibold transition-all">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </BackgroundComponent>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes memberFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes calendarPulse {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); transform: scale(1); }
          50% { border-color: rgba(59, 130, 246, 0.8); transform: scale(1.05); }
        }
        
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes activityFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(-5px) rotate(240deg); }
        }
        
        @keyframes particleMove {
          0% { transform: translateX(0px); }
          50% { transform: translateX(50px); }
          100% { transform: translateX(0px); }
        }
        
        @keyframes dashboardPulse {
          0%, 100% { opacity: 0.2; transform: scaleX(1); }
          50% { opacity: 0.5; transform: scaleX(1.1); }
        }
        
        @keyframes barGrow {
          0%, 100% { transform: scaleY(0.7); }
          50% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ClubManagementDemo;

export { ClubActivitiesBackground };