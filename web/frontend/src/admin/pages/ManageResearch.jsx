import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchResearchList } from "../utils/api";

const ManageResearch = () => {
  const [researchList, setResearchList] = useState([]);

  useEffect(() => {
    fetchResearchList().then(setResearchList);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Manage Research</h1>
        {researchList.length === 0 ? (
          <p>No research data found.</p>
        ) : (
          <ul className="list-disc pl-5">
            {researchList.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default ManageResearch;
