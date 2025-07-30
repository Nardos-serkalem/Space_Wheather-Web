import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import NewsEvents from "../components/NewsEvents";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const aboutCards = [
  {
    title: "Our Mission",
    desc: "Drive space science forward with innovative technology and collaborative research in planetary and solar studies.",
    icon: <FaBullseye className="text-[#E69D4A] text-4xl mb-6 mx-auto" />,
  },
  {
    title: "Our Vision",
    desc: "Establish ourselves as a leading African center for space weather and planetary science.",
    icon: <FaEye className="text-[#E69D4A] text-4xl mb-6 mx-auto" />,
  },
  {
    title: "Our Impact",
    desc: "Leverage space-based knowledge to support sustainable national development and scientific literacy.",
    icon: <FaGlobe className="text-[#E69D4A] text-4xl mb-6 mx-auto" />,
  },
];

const Home = () => {
  return (
    <div className="relative w-full bg-white font-[Poppins] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* ABOUT Section */}
      <motion.section
        id="about"
        className="relative max-w-7xl mx-auto py-28 px-6 sm:px-12 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        {/* Animated Background layered circles */}
        <motion.div
          className="absolute -top-40 -right-36 w-[28rem] h-[28rem] bg-[#E69D4A]/20 rounded-full filter blur-3xl -z-10"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-36 -left-32 w-[24rem] h-[24rem] bg-[#2E5979]/20 rounded-full filter blur-3xl -z-10"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
        />

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-[#2E5979] relative inline-block mb-6">
            About Our Institute
            <motion.span
              layoutId="underline"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-[#E69D4A] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
            The Institute for Space Science and Planetary Research advances knowledge of the cosmos through cutting-edge research and space weather monitoring. We foster innovation and inspire the next generation of scientists and explorers.
          </p>
        </div>

        {/* Floating glass cards with icons */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {aboutCards.map(({ title, desc, icon }, idx) => (
            <motion.article
              key={idx}
              className="bg-white bg-opacity-60 backdrop-blur-md border border-[#E69D4A]/30 rounded-xl p-8 shadow-xl cursor-default hover:scale-[1.05] hover:shadow-[0_0_20px_5px_rgba(230,157,74,0.3)] transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.15 }}
            >
              {icon}
              <h3 className="text-2xl font-semibold text-[#2E5979] mb-3 text-center">{title}</h3>
              <p className="text-gray-800 leading-relaxed text-center">{desc}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* RESEARCH Section with darker navy gradient */}
      <motion.section
        id="research-section"
        className="relative py-24 px-6 sm:px-12 lg:px-20"
        style={{
          background: "linear-gradient(135deg, #0E1B3D 0%, #0E1B3D 100%)",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <h2 className="relative z-10 text-5xl font-extrabold text-[white] text-center mb-16 drop-shadow-lg">
          Our Research Highlights
          <span className="block w-24 h-1 bg-[#0E1B3D] rounded-full mx-auto mt-6 shadow-md"></span>
        </h2>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "Solar Physics",
              desc: "Understanding solar activity and its impact on Earth.",
            },
            {
              title: "Planetary Atmospheres",
              desc: "Studying the atmospheres of planets in our solar system.",
            },
            {
              title: "Space Weather",
              desc: "Monitoring space weather for Earth safety.",
            },
          ].map(({ title, desc }, idx) => (
            <motion.div
              key={idx}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 cursor-pointer hover:shadow-[0_0_12px_3px_rgba(230,157,74,0.8)] transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-[#E69D4A] mb-4">{title}</h3>
              <p className="text-white text-opacity-85 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

       {/* Optional: See all research button */}
<div className="mt-12 text-center">
  <Link to="/research">
    <button className="bg-[#E69D4A] text-[#1F3B57] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#cf893b] transition-colors duration-300">
      See All Research
    </button>
  </Link>
</div>
      </motion.section>

      {/* NEWS & EVENTS Section */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 space-y-32">
        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <NewsEvents />
        </motion.section>
      </main>
    </div>
  );
};

export default Home;
