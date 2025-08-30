import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
// import { fetchEventsList, deleteEvent } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ManageEvents = () => {
  const [eventsList, setEventsList] = useState([]);
  const navigate = useNavigate();

  const loadEvents = async () => {
    const data = await fetchEventsList();
    setEventsList(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      loadEvents(); // refresh list
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
          <button
            onClick={() => navigate("/admin/add-event")}
            className="px-4 py-2 bg-[#2E5979] text-white rounded hover:bg-[#194270] transition"
          >
            + Add Event
          </button>
        </div>

        {eventsList.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#0E1B3D] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Location</th>
                  <th className="px-6 py-3 text-center text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {eventsList.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{event.title}</td>
                    <td className="px-6 py-4">{event.date}</td>
                    <td className="px-6 py-4">{event.location || "N/A"}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageEvents;
