import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Card from "../components/Card";
import { fetchResearchList, fetchEventsList } from "../utils/api";

const Dashboard = () => {
  const [researchList, setResearchList] = useState([]);
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    fetchResearchList().then((data) => setResearchList(data.slice(0, 5)));
    fetchEventsList().then((data) => setEventsList(data.slice(0, 5)));
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar title="Admin Dashboard" />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#E69D4A]/10 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Research</h3>
              <p className="text-2xl font-bold">{researchList.length}</p>
            </div>
            <div className="bg-[#2E5979]/10 p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Events</h3>
              <p className="text-2xl font-bold">{eventsList.length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-xl font-bold mb-4">Recent Research</h3>
              {researchList.length === 0 ? (
                <p>No research data found.</p>
              ) : (
                researchList.map((item) => (
                  <Card
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    actions={
                      <>
                        <button className="bg-blue-600 px-2 py-1 rounded text-white hover:bg-blue-700">Edit</button>
                        <button className="bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700">Delete</button>
                      </>
                    }
                  />
                ))
              )}
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">Recent Events</h3>
              {eventsList.length === 0 ? (
                <p>No event data found.</p>
              ) : (
                eventsList.map((item) => (
                  <Card
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    actions={
                      <>
                        <button className="bg-blue-600 px-2 py-1 rounded text-white hover:bg-blue-700">Edit</button>
                        <button className="bg-red-600 px-2 py-1 rounded text-white hover:bg-red-700">Delete</button>
                      </>
                    }
                  />
                ))
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
