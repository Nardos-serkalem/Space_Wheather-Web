import React from "react";
import { Link } from "react-router-dom";

const NewsEvents = () => {
  return (
    <section className="mb-24 w-full" id="news">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">News & Conferences</h2>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg md:flex border border-gray-200">
        <div className="md:w-1/2">
          <img
            className="h-64 w-full object-cover md:h-full"
            src="news&events.png"
            alt="Conference"
          />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-3 text-gray-800">
            Upcoming Conference on Space Exploration
          </h3>
          <p className="text-gray-600 mb-4">
            Join us for our annual conference featuring leading experts in space exploration. Discover the latest findings and network with peers.
          </p>
          <Link to="/conference" className="text-[#E69D4A] font-bold hover:underline">
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
