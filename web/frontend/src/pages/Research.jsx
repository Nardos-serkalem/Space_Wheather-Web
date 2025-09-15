import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Research = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPublicationDate = (dateString) => {
    if (!dateString) return "";
    const value = String(dateString);
    // YYYY
    if (/^\d{4}$/.test(value)) return value;
    // YYYY-MM
    const ym = value.match(/^(\d{4})-(\d{2})$/);
    if (ym) {
      const year = ym[1];
      const monthIndex = parseInt(ym[2], 10) - 1;
      const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      return `${monthNames[monthIndex] || ym[2]} ${year}`;
    }
    // ISO or YYYY-MM-DD (with optional time)
    const iso = value.match(/^(\d{4})-(\d{2})-\d{2}/);
    if (iso) {
      const year = iso[1];
      const monthIndex = parseInt(iso[2], 10) - 1;
      const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      return `${monthNames[monthIndex] || iso[2]} ${year}`;
    }
    return value;
  };

  const filters = ["All", "Ionospheric", "Space Weather", "Planetary Science", "Geomagnetism"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projData, pubData] = await Promise.all([
          fetch('http://localhost:5000/api/research/projects'),
          fetch('http://localhost:5000/api/research/publications'),
        ]);
        
        const projects = await projData.json();
        const publications = await pubData.json();
        
        setProjects(projects);
        setPublications(publications);
      } catch (err) {
        console.error("Error fetching research data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const filteredPublications = publications.filter(
    (pub) =>
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pub.authors && pub.authors.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const parsePublicationDate = (value) => {
    if (!value) return 0;
    const str = String(value);
    if (/^\d{4}$/.test(str)) {
      return new Date(parseInt(str, 10), 0, 1).getTime();
    }
    const ym = str.match(/^(\d{4})-(\d{2})$/);
    if (ym) {
      const y = parseInt(ym[1], 10);
      const m = parseInt(ym[2], 10) - 1;
      return new Date(y, m, 1).getTime();
    }
    const iso = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) {
      const y = parseInt(iso[1], 10);
      const m = parseInt(iso[2], 10) - 1;
      const d = parseInt(iso[3], 10);
      return new Date(y, m, d).getTime();
    }
    const t = Date.parse(str);
    return Number.isNaN(t) ? 0 : t;
  };

  const displayedPublications = [...publications]
    .sort((a, b) => parsePublicationDate(b.date) - parsePublicationDate(a.date))
    .slice(0, 5)
    .filter(
      (pub) =>
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pub.authors && pub.authors.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  if (loading) return <p className="text-center py-10">Loading research...</p>;

  return (
    <div className="w-full font-[Poppins] text-gray-800 bg-white">
      {/* Hero Header */}
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
            Discover how our team explores the Sun, planetary surfaces, and space
            weather to unravel the mysteries of the universe.
          </p>
        </motion.div>
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
        {/* Research Domains Teaser */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-[#2E5979]">Research Domains</h2>
            <Link to="/research/domains">
              <button className="bg-[#E69D4A] text-black rounded-md px-5 py-2 font-semibold hover:bg-opacity-90 transition">View All Domains</button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/research/domains#ionospheric-studies" className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
              <img src="/r.domains/ionospheric%20studies.gif" alt="Ionospheric Studies" className="w-full h-28 object-cover object-center rounded-md mb-4" loading="lazy" />
              <h3 className="text-xl font-semibold text-[#2E5979] mb-2">Ionospheric Studies</h3>
              <p className="text-gray-700">Investigating ionospheric dynamics, TEC modeling, TIDs, and forecasting.</p>
              <span className="inline-block mt-4 text-sm font-semibold text-[#E69D4A] group-hover:underline">Learn more →</span>
            </Link>
            <Link to="/research/domains#geomagnetism" className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
              <img src="/r.domains/Geomagnetism.jpg" alt="Geomagnetism" className="w-full h-28 object-cover object-center rounded-md mb-4" loading="lazy" />
              <h3 className="text-xl font-semibold text-[#2E5979] mb-2">Geomagnetism</h3>
              <p className="text-gray-700">Monitoring variations, storm-time responses, and global modeling.</p>
              <span className="inline-block mt-4 text-sm font-semibold text-[#E69D4A] group-hover:underline">Learn more →</span>
            </Link>
            <Link to="/research/domains#space-weather" className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
              <img src="/r.domains/space%20weather.jpg" alt="Space Weather" className="w-full h-28 object-cover object-center rounded-md mb-4" loading="lazy" />
              <h3 className="text-xl font-semibold text-[#2E5979] mb-2">Space Weather</h3>
              <p className="text-gray-700">Solar drivers, early-warning systems, and resilience of infrastructure.</p>
              <span className="inline-block mt-4 text-sm font-semibold text-[#E69D4A] group-hover:underline">Learn more →</span>
            </Link>
          </div>
        </section>
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
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project._id || index}
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg">
                  {activeFilter === "All" 
                    ? "No projects available at the moment." 
                    : `No projects found in the "${activeFilter}" category.`}
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  Check back later or try a different category filter.
                </div>
              </div>
            )}
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
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
                    Title
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
                    Authors
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-right text-gray-900">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedPublications.length > 0 ? (
                  displayedPublications.map((pub, index) => (
                    <tr key={pub._id || index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="px-6 py-4 max-w-sm">
                        <p className="font-semibold truncate text-gray-900">{pub.title}</p>
                        <p className="text-sm text-gray-600">{pub.description}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{pub.authors}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatPublicationDate(pub.date)}</td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={pub.link || "#"}
                          className="text-sm font-semibold text-[#E69D4A] hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
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
            <Link to="/publications">
              <button className="bg-[#E69D4A] text-black rounded-md px-6 py-3 font-semibold hover:bg-opacity-90 transition duration-200 shadow-md">
                View All Publications
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Research;
