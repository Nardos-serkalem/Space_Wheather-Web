import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiUser, FiExternalLink } from "react-icons/fi";

function Publications() {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/research/publications');
        if (!response.ok) {
          throw new Error('Failed to fetch publications');
        }
        const data = await response.json();
        setPublications(data);
        setFilteredPublications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Filter publications based on search term and year
  useEffect(() => {
    let filtered = publications;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(pub => {
        if (pub.date) {
          const pubYear = new Date(pub.date).getFullYear().toString();
          return pubYear === selectedYear;
        }
        return false;
      });
    }

    setFilteredPublications(filtered);
  }, [publications, searchTerm, selectedYear]);

  // Get unique years from publications
  const getUniqueYears = () => {
    const years = publications
      .filter(pub => pub.date)
      .map(pub => new Date(pub.date).getFullYear().toString());
    return [...new Set(years)].sort((a, b) => b - a);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2E5979] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading publications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg">Error loading publications: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#2E5979] to-[#1e3a4f] text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <h1 className="text-5xl font-bold mb-6">Research Publications</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Explore our comprehensive collection of research findings, scientific papers, and academic contributions in space weather and related disciplines.
          </p>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search publications by title, authors, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
              />
            </div>

            {/* Year Filter */}
            <div className="md:w-48">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
              >
                <option value="all">All Years</option>
                {getUniqueYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing {filteredPublications.length} of {publications.length} publications
          </div>
        </motion.div>

        {/* Publications Grid */}
        {filteredPublications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 text-lg">No publications found matching your criteria.</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPublications.map((publication, index) => (
              <motion.div
                key={publication._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Publication Type Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2E5979] text-white">
                      Publication
                    </span>
                    {publication.date && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCalendar className="mr-1" />
                        {new Date(publication.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </div>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {publication.title}
                  </h3>
                  
                  {/* Authors */}
                  {publication.authors && (
                    <div className="flex items-start mb-3">
                      <FiUser className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">
                        {publication.authors}
                      </p>
                    </div>
                  )}
                  
                  {/* Description */}
                  {publication.description && (
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {publication.description}
                    </p>
                  )}
                  
                  {/* View Publication Link */}
                  {publication.link && (
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#2E5979] hover:text-[#1e3a4f] font-semibold transition-colors duration-200"
                    >
                      <FiExternalLink className="mr-2" />
                      View Publication
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Publications;
