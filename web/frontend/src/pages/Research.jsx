import React, { useState } from "react";
import { motion } from "framer-motion";

const Research = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      title: "Solar Flare Monitoring",
      description: "Real-time tracking and analysis of solar flares to predict geomagnetic storms.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Solar_flare_image.jpg",
      category: "Solar Physics",
    },
    {
      title: "Planetary Surface Mapping",
      description: "Using satellite data to map the geological features of Mars and Moon.",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Mars_surface.jpg",
      category: "Planetary Systems",
    },
    {
      title: "Space Weather Forecasting",
      description: "Developing predictive models for space weather and its effects on Earth.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Coronal_mass_ejection.gif",
      category: "Space Weather",
    },
  ];

  const publications = [
    {
      title: "Impact of Solar Flares on Satellite Communication",
      authors: "Dr. A. Solomon, Y. Bushra",
      date: "2024-03-20",
      description: "A comprehensive study on the effects of solar activity on modern communication satellites.",
    },
    {
      title: "Lunar Crater Depth Analysis Using LIDAR",
      authors: "Dr. B. Daniel, H. Aklilu",
      date: "2023-11-14",
      description: "Analysis of lunar surface morphology using advanced remote sensing techniques.",
    },
  ];

  const filters = ["All", "Solar Physics", "Space Weather", "Planetary Systems"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const filteredPublications = publications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full font-[Poppins] text-gray-800 bg-white">
      {/* Hero Header with #0E1B3D background and pulse effect */}
      <div className="relative w-full bg-gradient-to-br from-[#194270] via-[#0E1B3D] to-[#194270] py-40 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0E1B3D]/10 rounded-full blur-3xl animate-pulse -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            Research
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Discover how our team explores the Sun, planetary surfaces, and space weather to unravel the mysteries of the universe.
          </p>
        </motion.div>
        {/* Decorative SVG Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
          <svg
            className="relative block w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path d="M1200 0L0 0 598.97 114.72 1200 0z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      <main className="container mx-auto px-6 sm:px-12 py-16">
        {/* Project Filters */}
        <section className="mb-24">
          <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-[#2E5979]">Projects</h2>
            <div className="flex gap-3 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-md font-semibold transition duration-300 border-2 ${
                    activeFilter === filter
                      ? "bg-[#2E5979] border-[#2E5979] text-white shadow-md"
                      : "bg-transparent border-gray-400 text-[#2E5979] hover:bg-[#2E5979] hover:text-white hover:border-[#2E5979]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <div
                  className="w-full aspect-video bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase text-[#E69D4A]">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 text-base mt-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-t-2 border-[#E69D4A] opacity-30 mb-16" />

        {/* Publications Section */}
        <section id="publications">
          <h2 className="text-3xl font-bold mb-8 text-[#2E5979] text-center">
            Publications
          </h2>

          {/* Search Bar */}
          <div className="mb-10 max-w-xl mx-auto">
            <input
              className="form-input w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E69D4A] border border-gray-300 bg-white h-12 placeholder:text-gray-400 px-5 text-base font-normal"
              placeholder="Search publications by title, author, or keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Publication Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm max-w-5xl mx-auto">
            <table className="w-full text-left table-auto">
              <thead className="bg-[#2E5979]/20">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Title</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Authors</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-right text-gray-900">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="px-6 py-4 max-w-sm">
                        <p className="font-semibold truncate text-gray-900">{pub.title}</p>
                        <p className="text-sm text-gray-600">{pub.description}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{pub.authors}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{pub.date}</td>
                      <td className="px-6 py-4 text-right">
                        <a href="#" className="text-sm font-semibold text-[#E69D4A] hover:underline" target="_blank" rel="noreferrer">
                          DOI
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500 italic">
                      No publications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-[#E69D4A] text-black rounded-md px-6 py-3 font-semibold hover:bg-opacity-90 transition duration-200 shadow-md">
              View all publications
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Research;
