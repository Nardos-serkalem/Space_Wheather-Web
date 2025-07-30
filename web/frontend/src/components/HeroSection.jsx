import React from "react";

const HeroSection = () => {
  const scrollToContent = () => {
    const section = document.getElementById("about");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="sun-space.jpg" 
          alt="Sun space"
          className="w-full h-full object-cover brightness-75"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Space and Planetary Science
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-2xl">
          Empowering scientific discovery in planetary, solar, and space weather research.
        </p>
        <button
          onClick={scrollToContent}
          className="mt-8 px-6 py-3 bg-[#E69D4A] text-white font-semibold rounded-xl shadow hover:bg-[#d28b3e] transition"
        >
          Learn More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
