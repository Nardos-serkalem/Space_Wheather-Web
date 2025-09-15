import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Card from "../components/Card";
import { fetchResearchList, fetchConferencesList } from "../utils/api";

const Dashboard = () => {
  const [researchList, setResearchList] = useState([]);
  const [conferencesList, setConferencesList] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPublications, setTotalPublications] = useState(0);
  const [totalConferences, setTotalConferences] = useState(0);

  useEffect(() => {
    // Fetch all data first to get total counts
    fetchResearchList().then((data) => {
      const projects = data.filter(item => item.type === 'project');
      const publications = data.filter(item => item.type === 'publication');
      setTotalProjects(projects.length);
      setTotalPublications(publications.length);
      
      // Get the most recent project and most recent publication
      const recentProject = projects.length > 0 ? projects[0] : null;
      const recentPublication = publications.length > 0 ? publications[0] : null;
      setResearchList([recentProject, recentPublication].filter(Boolean));
    });
    fetchConferencesList().then((data) => {
      setTotalConferences(data.length);
      // Get upcoming conferences only
      const upcomingConferences = data.filter(conf => 
        conf.type === 'upcoming' && 
        new Date(conf.date) >= new Date() && 
        conf.isActive
      ).sort((a, b) => new Date(a.date) - new Date(b.date));
      setConferencesList(upcomingConferences.slice(0, 1)); // Show only the next upcoming conference
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Admin Dashboard" />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-[#E69D4A]/20 to-[#E69D4A]/10 p-6 rounded-xl shadow-lg border border-[#E69D4A]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Projects</h3>
                  <p className="text-3xl font-bold text-[#E69D4A]">{totalProjects}</p>
                </div>
                <div className="w-12 h-12 bg-[#E69D4A]/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#E69D4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/10 p-6 rounded-xl shadow-lg border border-[#10B981]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Publications</h3>
                  <p className="text-3xl font-bold text-[#10B981]">{totalPublications}</p>
                </div>
                <div className="w-12 h-12 bg-[#10B981]/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#2E5979]/20 to-[#2E5979]/10 p-6 rounded-xl shadow-lg border border-[#2E5979]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Conferences</h3>
                  <p className="text-3xl font-bold text-[#2E5979]">{totalConferences}</p>
                </div>
                <div className="w-12 h-12 bg-[#2E5979]/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#2E5979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">Latest Research</h3>
              </div>
              {researchList.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No research data found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {researchList.map((item) => (
                    <div key={item._id || item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-800 text-base leading-tight pr-2">{item.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          item.type === 'project' 
                            ? 'bg-[#E69D4A]/20 text-[#E69D4A]' 
                            : 'bg-[#10B981]/20 text-[#10B981]'
                        }`}>
                          {item.type === 'project' ? '📁 Project' : '📄 Publication'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                      {item.type === 'publication' && item.authors && (
                        <p className="text-xs text-gray-500 mb-2">👥 {item.authors}</p>
                      )}
                      {item.type === 'project' && item.category && (
                        <p className="text-xs text-gray-500 mb-2">🏷️ {item.category}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">Next Upcoming Conference</h3>
              </div>
              {conferencesList.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No upcoming conferences scheduled.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {conferencesList.map((item) => (
                    <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800 mb-3 text-base leading-tight">{item.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                      {item.date && (
                        <p className="text-xs text-gray-500 mb-2">📅 {new Date(item.date).toLocaleDateString()}</p>
                      )}
                      {item.location && (
                        <p className="text-xs text-gray-500">📍 {item.location}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
