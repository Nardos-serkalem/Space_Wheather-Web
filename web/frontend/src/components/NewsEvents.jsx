import React from "react";
import { Link } from "react-router-dom";

const NewsEvents = () => {
  return (
    <section className="mb-24 w-full" id="news">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">News & Events</h2>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg md:flex border border-gray-200">
        <div className="md:w-1/2">
          <img
            className="h-64 w-full object-cover md:h-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSIcOoaDhUg34FtUPd6mRsgluNkwJjW-z-UM-dn-VjlU1iOWY8JptCul1t3bWQrgaaylKvXN0aji38m5D0VH9OdLMmdReqSvDzTLOscj4NMKePqDt6RcU-WlWf5gpsGngg9pVg-DQ4gNdruu57KtkdkpbnqLlIFHcca7Fk9ALd1R9XsQP2Xw5mm2goYcVq2b0jKhxq0YRLNQTClqbSu0_ZvjxJjJhuTnpsZ09iaGi1eaatysjtW1axCNOPvYmRkNMsACLl0A0IPZ8"
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
