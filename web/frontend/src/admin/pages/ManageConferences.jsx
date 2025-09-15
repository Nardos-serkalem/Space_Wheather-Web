import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiMapPin, FiImage, FiExternalLink } from "react-icons/fi";

const ManageConferences = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ type: null, text: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingConference, setEditingConference] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    type: "upcoming",
    image: null,
    registrationLink: "",
    website: "",
    organizers: []
  });

  useEffect(() => {
    fetchConferences();
  }, []);

  const fetchConferences = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/conferences');
      if (!response.ok) throw new Error('Failed to fetch conferences');
      const data = await response.json();
      setConferences(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'organizers') {
          formDataToSend.append('organizers', JSON.stringify(formData.organizers));
        } else if (key !== 'image') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const url = editingConference 
        ? `http://localhost:5000/api/conferences/${editingConference._id}`
        : 'http://localhost:5000/api/conferences';
      
      const method = editingConference ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to save conference');
      await fetchConferences();
      setMessage({ type: 'success', text: editingConference ? 'Conference updated successfully!' : 'Conference created successfully!' });
      resetForm();
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      setError(null);
      setMessage({ type: 'error', text: err?.message || 'Failed to save conference. Please try again.' });
      setTimeout(() => setMessage({ type: null, text: '' }), 5000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this conference?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/conferences/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete conference');
      await fetchConferences();
      setMessage({ type: 'success', text: 'Conference deleted successfully!' });
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      setError(null);
      setMessage({ type: 'error', text: err?.message || 'Failed to delete conference. Please try again.' });
      setTimeout(() => setMessage({ type: null, text: '' }), 5000);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewImageUrl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      endDate: "",
      location: "",
      type: "upcoming",
      image: null,
      registrationLink: "",
      website: "",
      organizers: []
    });
    setEditingConference(null);
    setShowForm(false);
  };

  const handleEdit = (conference) => {
    setFormData({
      title: conference.title,
      description: conference.description,
      date: conference.date ? new Date(conference.date).toISOString().split('T')[0] : "",
      endDate: conference.endDate ? new Date(conference.endDate).toISOString().split('T')[0] : "",
      location: conference.location,
      type: conference.type,
      image: null,
      registrationLink: conference.registrationLink || "",
      website: conference.website || "",
      organizers: conference.organizers || (conference.organizer ? [conference.organizer] : [])
    });
    setEditingConference(conference);
    setShowForm(true);
  };

  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E5979]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Conferences</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#2E5979] text-white px-4 py-2 rounded-lg hover:bg-[#1e3a4f] transition-colors flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Conference
        </button>
      </div>

      {(message.text || error) && (
        <div className={`px-4 py-3 rounded mb-4 border ${message?.type === 'success' ? 'bg-green-100 border-green-400 text-green-800' : message?.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
          {message.text || error}
        </div>
      )}

      {/* Conference Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingConference ? 'Edit Conference' : 'Add New Conference'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Link
                    </label>
                    <input
                      type="url"
                      value={formData.registrationLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, registrationLink: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organizers
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.organizers.map((org, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#2E5979] text-white text-sm rounded-full flex items-center">
                        {org}
                        <button
                          type="button"
                          className="ml-2 text-white hover:text-red-200"
                          onClick={() => setFormData(prev => ({ ...prev, organizers: prev.organizers.filter((_, i) => i !== idx) }))}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add organizer"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = e.currentTarget.value.trim();
                          if (value) {
                            setFormData(prev => ({ ...prev, organizers: [...prev.organizers, value] }));
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-[#2E5979] text-white rounded-lg"
                      onClick={() => {
                        const input = document.querySelector('#add-organizer-input');
                      }}
                      style={{ display: 'none' }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conference Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E5979] focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#2E5979] text-white rounded-lg hover:bg-[#1e3a4f]"
                  >
                    {editingConference ? 'Update' : 'Create'} Conference
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Conferences List */}
      <div className="space-y-4">
        {conferences.map((conference) => (
          <motion.div
            key={conference._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {conference.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    conference.type === 'upcoming' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {conference.type}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 text-sm space-x-4 mb-2">
                  <div className="flex items-center">
                    <FiCalendar className="mr-1" />
                    {new Date(conference.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-1" />
                    {conference.location}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm line-clamp-2">
                  {conference.description}
                </p>
                
                {conference.image && (
                  <div className="mt-2">
                    <img
                      src={`http://localhost:5000${conference.image}`}
                      alt={conference.title}
                      onClick={() => setPreviewImageUrl(`http://localhost:5000${conference.image}`)}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                      title="Click to preview"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(conference)}
                  className="p-2 text-[#2E5979] hover:bg-[#2E5979] hover:text-white rounded-lg transition-colors"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(conference._id)}
                  className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {conferences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No conferences found.</p>
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

export default ManageConferences;
