import React from "react";

const upcomingConferences = [
  {
    title: "International Symposium on Planetary Geology",
    date: "July 15-17, 2024",
    location: "San Francisco, CA",
    description:
      "Join us for the annual symposium focusing on geological aspects of planets and celestial bodies.",
  },
  {
    title: "Astrobiology and the Search for Life",
    date: "August 22-24, 2024",
    location: "London, UK",
    description:
      "Delve into the latest research on life beyond Earth, including biosignatures and habitability of other worlds.",
  },
];

const pastConferences = [
  {
    title: "2023 Symposium on Exoplanetary Systems",
    description:
      "Photos, videos, and summary PDFs from our 2023 symposium on exoplanetary systems.",
  },
  {
    title: "2022 Conference on Space Weather and Climate",
    description:
      "Explore media gallery and resources from our 2022 conference on space weather and climate.",
  },
];

const Conference = () => {
  return (
    <div className=" pt-24 min-h-screen bg-white font-sans text-[#1f3b53] px-6 py-12 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-2 tracking-wide">Conferences & Events</h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          Join the brightest minds in space science. Explore upcoming and past conferences.
        </p>
      </header>

      {/* Upcoming */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold mb-6 border-b border-[#E69D4A] pb-2 inline-block text-[#E69D4A]">
          Upcoming Conferences
        </h2>
        <ul className="space-y-6">
          {upcomingConferences.map((conf, i) => (
            <li
              key={i}
              className="border border-gray-300 rounded-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
              title={conf.description}
            >
              <h3 className="text-lg font-semibold">{conf.title}</h3>
              <p className="text-xs text-gray-500">
                {conf.date} &mdash; {conf.location}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Past */}
      <section>
        <h2 className="text-xl font-semibold mb-6 border-b border-[#1f3b53] pb-2 inline-block text-[#1f3b53]">
          Past Conferences Archive
        </h2>
        <ul className="space-y-4 text-sm text-gray-700">
          {pastConferences.map((conf, i) => (
            <li key={i} className="hover:underline cursor-pointer" title={conf.description}>
              {conf.title}
            </li>
          ))}
        </ul>
      </section>

      {/* Call for Papers */}
      <section className="mt-16 bg-[#1f3b53] text-white rounded-md py-8 px-6 text-center">
        <h2 className="text-lg font-bold mb-3">Call for Papers</h2>
        <p className="max-w-lg mx-auto mb-4 text-sm leading-relaxed">
          We invite researchers to submit papers for upcoming conferences. Abstract submission deadline: June 1, 2024.
        </p>
        <button className="bg-[#E69D4A] text-[#1f3b53] font-semibold px-6 py-2 rounded hover:bg-[#cf8e3a] transition">
          Submission Guidelines
        </button>
      </section>
    </div>
  );
};

export default Conference;
