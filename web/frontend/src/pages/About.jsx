import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  const researchAreas = [
    {
      title: "Astrophysics",
      description: "Study of celestial objects and phenomena.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Planetary Science",
      description: "Investigation of planets and their systems.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3.055 11H5a2..." strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Robotics & Exploration",
      description: "Development of robotic systems for space exploration.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M11.049 2.927..." strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: "Astrobiology",
      description: "Search for life beyond Earth.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M20.618 5.982..." />
        </svg>
      ),
    },
  ];

  const timelineEvents = [
    { year: "1985", title: "Founding of the Institute" },
    { year: "1992", title: "First Planetary Mission" },
    { year: "2005", title: "Establishment of the Research Center" },
    { year: "2020", title: "Recent Breakthroughs" },
  ];

  const partners = [];

  return (
    <div className="text-[#121212] font-[Poppins] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex flex-col justify-center items-center text-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-75"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1470&q=80')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="relative max-w-4xl text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Space and Planetary Science Institute
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 drop-shadow-md">
            Exploring the mysteries of our solar system and beyond through cutting-edge research and innovation.
          </p>
          <a
            href="#mission"
            className="inline-block bg-[#E69D4A] hover:bg-yellow-600 text-black font-semibold rounded-full px-8 py-3 shadow-lg transition"
          >
            Learn More
          </a>
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <svg
            className="w-6 h-6 text-white opacity-75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#E69D4A]">Mission & Vision</h2>
              <p className="text-[#444]">
                Our mission is to deepen humanity's understanding of space and planetary sciences through rigorous research, education, and collaboration.
              </p>
            </div>
            <div>
              <img
                alt="Scientist working"
                className="rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our History</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#2E5979]" />
            <div className="space-y-16">
              {timelineEvents.map((event, i) => (
                <div
                  key={event.year}
                  className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} w-full items-center`}
                >
                  <div className={`w-1/2 flex ${i % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"}`}>
                    <div className="bg-white border border-[#ddd] p-6 rounded-lg shadow-lg max-w-sm">
                      <p className="text-[#E69D4A] font-bold">{event.year}</p>
                      <h3 className="font-semibold text-xl mt-2">{event.title}</h3>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E69D4A] border-4 border-white rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Areas */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Research Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {researchAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white border border-[#ddd] p-6 rounded-lg text-center shadow-md transform hover:scale-105 transition-transform"
              >
                <div className="text-[#E69D4A] p-4 bg-[#f5f5f5] rounded-full inline-block mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                <p className="text-[#444] text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Our Partners & Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.length > 0 ? (
              partners.map((partner, i) => (
                <div key={i} className="flex justify-center">
                  <img
                    src={partner}
                    alt="Partner logo"
                    className="h-12 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition duration-300"
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic col-span-full">No partners added yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
