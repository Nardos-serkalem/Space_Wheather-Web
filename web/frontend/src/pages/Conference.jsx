import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiExternalLink, FiImage, FiClock } from "react-icons/fi";

const Conference = () => {
  const [upcomingConferences, setUpcomingConferences] = useState([]);
  const [pastConferences, setPastConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        
        const [upcomingResponse, pastResponse] = await Promise.all([
          fetch('http://localhost:5000/api/conferences/upcoming'),
          fetch('http://localhost:5000/api/conferences/past')
        ]);

        if (!upcomingResponse.ok || !pastResponse.ok) {
          throw new Error('Failed to fetch conferences');
        }

        const upcomingData = await upcomingResponse.json();
        const pastData = await pastResponse.json();

        setUpcomingConferences(upcomingData);
        setPastConferences(pastData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewImageUrl(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (!end || start.toDateString() === end.toDateString()) {
      return formatDate(startDate);
    }
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2E5979] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading conferences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">Error loading conferences: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#2E5979] to-[#1e3a4f] text-white py-20"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_10%,white,transparent_35%),radial-gradient(circle_at_80%_30%,white,transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Conferences</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto opacity-90">
            Join the brightest minds in space science. Explore upcoming and past conferences.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
              Stay informed about events and opportunities
            </span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Conferences */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1e3a4f] flex items-center">
                <FiCalendar className="mr-3 text-[#2E5979]" />
                Upcoming Conferences
              </h2>
              <span className="ml-4 inline-flex items-center rounded-full bg-[#2E5979]/10 text-[#1e3a4f] px-3 py-1 text-xs font-medium">
                {upcomingConferences.length} events
              </span>
            </div>
            <p className="mt-1 text-gray-500 text-sm">What’s next on the calendar.</p>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          
          {upcomingConferences.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <p className="text-gray-600 text-lg">No upcoming conferences scheduled.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="divide-y divide-gray-200">
                {upcomingConferences.map((conference) => (
                  <div
                    key={conference._id}
                    className="p-6 md:p-7"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      {conference.image && (
                        <div className="flex-shrink-0 w-full md:w-[34rem] lg:w-[42rem]">
                          <div className="h-72 md:h-80 lg:h-96 bg-white flex items-center justify-center border border-gray-200">
                            <img
                              src={`http://localhost:5000${conference.image}`}
                              alt={conference.title}
                              className="max-w-full max-h-full object-contain"
                              title="Click to preview"
                              onClick={() => setPreviewImageUrl(`http://localhost:5000${conference.image}`)}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
                            <span className="mr-2 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E69D4A]/15 text-[#8A4B12] ring-1 ring-[#E69D4A]/30 align-middle">
                              Upcoming
                            </span>
                            {conference.title}
                          </h3>
                          <span className="text-sm text-gray-600 whitespace-nowrap flex items-center">
                            <FiClock className="mr-1" />
                            {formatDateRange(conference.date, conference.endDate)}
                          </span>
                        </div>
                        {conference.location && (
                          <div className="mt-2 flex items-center text-gray-700">
                            <FiMapPin className="mr-2 flex-shrink-0" />
                            <span className="text-sm md:text-base">{conference.location}</span>
                          </div>
                        )}
                        {Array.isArray(conference.organizers) && conference.organizers.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {conference.organizers.map((org, idx) => (
                              <span key={idx} className="px-3 py-1 bg-[#2E5979]/10 text-[#1e3a4f] text-xs rounded-full">{org}</span>
                            ))}
                          </div>
                        )}
                        {conference.description && (
                          <p className="mt-4 text-gray-800 text-sm md:text-base leading-relaxed">{conference.description}</p>
                        )}
                        {(conference.registrationLink || conference.website) && (
                          <div className="mt-5 flex flex-wrap gap-3">
                            {conference.registrationLink && (
                              <a
                                href={conference.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 text-sm border border-[#2E5979]/30 text-[#2E5979] rounded-md hover:bg-[#2E5979] hover:text-white transition-colors"
                              >
                                <FiExternalLink className="mr-2" />
                                Register
                              </a>
                            )}
                            {conference.website && (
                              <a
                                href={conference.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
                              >
                                <FiExternalLink className="mr-2" />
                                Website
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* Past Conferences */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1e3a4f] flex items-center">
                <FiImage className="mr-3 text-[#2E5979]" />
                Past Conferences
              </h2>
              <span className="ml-4 inline-flex items-center rounded-full bg-[#2E5979]/10 text-[#1e3a4f] px-3 py-1 text-xs font-medium">
                {pastConferences.length} archived
              </span>
            </div>
            <p className="mt-1 text-gray-500 text-sm">Explore previous events and archives.</p>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-gray-200 to-transparent" />
          </div>
          
          {pastConferences.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-lg">No past conferences available.</p>
            </div>
          ) : (
            <div className="border-t border-gray-200">
              <div className="divide-y divide-gray-200">
                {pastConferences.map((conference) => (
                  <div
                    key={conference._id}
                    className="py-3 md:py-3.5 cursor-pointer transition-colors hover:bg-gray-50"
                    onClick={() => setSelectedConference(conference)}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-sm md:text-base font-normal text-gray-800 hover:text-[#2E5979] transition-colors line-clamp-2">
                        {conference.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDateRange(conference.date, conference.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        
      </div>

      {/* Conference Detail Modal */}
      {selectedConference && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedConference.title}</h2>
                <button
                  onClick={() => setSelectedConference(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {selectedConference.image && (
                <div className="mb-6">
                  <img
                    src={`http://localhost:5000${selectedConference.image}`}
                    alt={selectedConference.title}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg bg-gray-50 cursor-zoom-in"
                    title="Click to view full size"
                    onClick={() => setPreviewImageUrl(`http://localhost:5000${selectedConference.image}`)}
                  />
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-3" />
                  <span>{formatDateRange(selectedConference.date, selectedConference.endDate)}</span>
                </div>
                
                {selectedConference.location && (
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-3" />
                    <span>{selectedConference.location}</span>
                  </div>
                )}
                
                {Array.isArray(selectedConference.organizers) && selectedConference.organizers.length > 0 && (
                  <div className="text-gray-600">
                    <strong>Organizers:</strong>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedConference.organizers.map((org, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#2E5979] text-white text-sm rounded-full">{org}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedConference.description && (
                  <div className="text-gray-700">
                    <strong>Description:</strong>
                    <p className="mt-2">{selectedConference.description}</p>
                  </div>
                )}
                
                
                
                <div className="flex space-x-4 pt-4">
                  {selectedConference.registrationLink && (
                    <a
                      href={selectedConference.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-[#2E5979] text-white rounded-lg hover:bg-[#1e3a4f] transition-colors"
                    >
                      <FiExternalLink className="mr-2" />
                      Register Now
                    </a>
                  )}
                  
                  {selectedConference.website && (
                    <a
                      href={selectedConference.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-[#2E5979] text-[#2E5979] rounded-lg hover:bg-[#2E5979] hover:text-white transition-colors"
                    >
                      <FiExternalLink className="mr-2" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {previewImageUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImageUrl(null)}
              className="absolute -top-3 -right-3 bg-white rounded-full w-10 h-10 shadow flex items-center justify-center text-gray-700 hover:bg-gray-100"
              aria-label="Close image preview"
            >
              ×
            </button>
            <img
              src={previewImageUrl}
              alt="Conference"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Conference;
