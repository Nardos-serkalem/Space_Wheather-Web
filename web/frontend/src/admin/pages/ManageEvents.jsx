import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchEventsList } from "../utils/api";

const ManageEvents = () => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    fetchEventsList().then(setEventsList);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Events</h1>
        {eventsList.length === 0 ? (
          <p>No event data found.</p>
        ) : (
          <ul className="list-disc pl-5">
            {eventsList.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default ManageEvents;
