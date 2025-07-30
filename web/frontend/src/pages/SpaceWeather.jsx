import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Placeholder metric cards for future real-time data
const metrics = [
  {
    title: "Kp Index",
    value: "--",
    description: "Geomagnetic activity level (0-9)",
  },
  {
    title: "Solar Wind Speed",
    value: "-- km/s",
    description: "Speed of solar wind impacting Earth",
  },
  {
    title: "Geomagnetic Storm Level",
    value: "--",
    description: "NOAA G-scale (G1–G5)",
  },
  {
    title: "Solar Flare Class",
    value: "--",
    description: "Current solar flare intensity (A, B, C, M, X)",
  },
];

const glossary = [
  {
    term: "Kp Index",
    definition:
      "A scale (0-9) measuring geomagnetic activity. Higher values indicate stronger geomagnetic storms.",
  },
  {
    term: "Solar Wind",
    definition:
      "A stream of charged particles released from the Sun's upper atmosphere, affecting Earth's magnetosphere.",
  },
  {
    term: "Geomagnetic Storm",
    definition:
      "A disturbance in Earth's magnetic field caused by solar wind and solar flares, which can impact satellites and power grids.",
  },
  {
    term: "Solar Flare",
    definition:
      "A sudden flash of increased brightness on the Sun, often associated with sunspots and capable of affecting radio communications on Earth.",
  },
];

const faqs = [
  {
    question: "Why does space weather matter?",
    answer:
      "Space weather can disrupt communication systems, GPS, power grids, and satellite operations. Monitoring it helps protect technology and infrastructure.",
  },
  {
    question: "How often do geomagnetic storms occur?",
    answer:
      "Minor storms are common, but severe storms are rare. Their frequency depends on solar activity cycles.",
  },
];

function SpaceWeather() {
  // Collapsible state for educational cards
  const [openCard, setOpenCard] = useState(null);
  const eduCards = [
    {
      key: 'solar',
      title: 'Solar Flares',
      summary: 'Sudden bursts of energy from the Sun that can disrupt radio communications and navigation systems on Earth.',
      details: 'Solar flares are intense bursts of radiation caused by the release of magnetic energy from sunspots. They can affect satellite operations, radio signals, and even power grids on Earth. Flares are classified by their strength: A, B, C, M, and X, with X being the most intense.',
      image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      accent: 'from-yellow-200 via-yellow-50 to-white',
    },
    {
      key: 'geomagnetic',
      title: 'Geomagnetic Storms',
      summary: 'Disturbances in Earth’s magnetic field caused by solar wind and flares, potentially impacting satellites and power grids.',
      details: 'Geomagnetic storms are caused by solar wind and coronal mass ejections interacting with Earth’s magnetosphere. They can create beautiful auroras but also disrupt navigation, communications, and power systems. The Kp index is used to measure storm strength.',
      image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      accent: 'from-blue-200 via-blue-50 to-white',
    },
    {
      key: 'ionosphere',
      title: 'Ionospheric Disturbances',
      summary: 'Changes in the ionosphere that can affect GPS accuracy and radio signal propagation.',
      details: 'The ionosphere is a layer of Earth’s atmosphere ionized by solar radiation. Disturbances can degrade GPS accuracy, affect radio communications, and impact satellite signals. Monitoring these changes is crucial for modern technology.',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      accent: 'from-purple-200 via-purple-50 to-white',
    }
  ];
  // Glossary definitions for tooltips
  const glossaryShort = {
    'Kp Index': 'A scale (0-9) measuring geomagnetic activity. Higher = stronger storms.',
    'Solar Wind Speed': 'Speed of charged particles from the Sun impacting Earth.',
    'Geomagnetic Storm Level': 'NOAA G-scale (G1–G5) for storm severity.',
    'Solar Flare Class': 'Solar flare intensity: A, B, C, M, X (X is strongest).'
  };
  // Fact rotator state
  const facts = [
    "The Sun's magnetic field flips every 11 years during the solar cycle.",
    "Auroras are caused by charged particles from the Sun colliding with Earth's atmosphere.",
    "A single solar flare can release as much energy as a billion megatons of TNT.",
    "Geomagnetic storms can disrupt GPS, radio, and power grids on Earth.",
    "Space weather forecasting helps protect satellites and astronauts in space.",
    "The Kp Index is used to measure the severity of geomagnetic storms.",
    "Solar wind travels at speeds up to 800 km/s (1.8 million mph)."
  ];
  const [factIdx, setFactIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIdx((prev) => (prev + 1) % facts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [facts.length]);

  const metricIcons = {
    'Kp Index': (
      <span className="text-3xl">🧲</span>
    ),
    'Solar Wind Speed': (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#E69D4A" opacity="0.15"/><path d="M8 20c2-2 6-2 8 0s6 2 8 0" stroke="#2E5979" strokeWidth="2" strokeLinecap="round"/><path d="M10 14c1-1 3-1 4 0s3 1 4 0" stroke="#2E5979" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    'Geomagnetic Storm Level': (
      <span className="text-3xl">⚡</span>
    ),
    'Solar Flare Class': (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#FFD600" opacity="0.15"/><path d="M16 8v4M16 20v4M8 16h4M20 16h4M11.3 11.3l2.8 2.8M20.7 20.7l-2.8-2.8M11.3 20.7l2.8-2.8M20.7 11.3l-2.8 2.8" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  };

  return (
    <>
      {/* Space Weather Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#194270] via-[#0E1B3D] to-[#194270]">
          <img
            src="https://www.nasa.gov/wp-content/uploads/2021/12/helio_teams_bkgrd_5_3.jpg"
            alt="NASA Space Weather Background"
            className="w-full h-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          {/* Decorative space elements */}
          <div className="absolute top-10 left-10 text-white/20 text-6xl animate-pulse">🌞</div>
          <div className="absolute top-20 right-20 text-white/20 text-4xl animate-bounce">⭐</div>
          <div className="absolute bottom-20 left-20 text-white/20 text-5xl animate-spin">🌍</div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6">
              Space Weather Monitoring
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-gray-100 max-w-3xl leading-relaxed">
              Real-time insights into solar activity, geomagnetic storms, and their impact on Earth. Stay informed and explore the science behind space weather events.
            </p>
          
            </div>
          </div>

      </section>

      {/* Space Weather Event Ticker */}

      <div className="w-full font-[Poppins] text-gray-800 bg-white min-h-screen flex flex-col mt-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        <main className="container mx-auto px-6 sm:px-12 flex-1">
          {/* Alert Banner (UI only) */}
          <div className="mb-4">
            <div className="bg-[#E69D4A]/20 border-l-4 border-[#E69D4A] p-5 rounded-md flex items-center gap-4 shadow">
              {/* Placeholder for alert icon */}
              <span className="text-2xl text-[#E69D4A]">⚠️</span>
              <span className="text-gray-800 font-semibold">No current space weather alerts.</span>
              {/* In the future, dynamically update this banner based on real-time data */}
            </div>
          </div>

          {/* Quick Impact Summary Bar */}
          <div className="mb-10">
            <div className="bg-[#e6f4fa] border-l-4 border-[#2E5979] p-4 rounded-md flex items-center gap-3 shadow-sm">
              <span className="text-2xl text-[#2E5979]">✅</span>
              <span className="text-[#194270] font-semibold">No disruptions to GPS, Power, or Communications at this time.</span>
              {/* In the future, update this message based on real-time impact data */}
            </div>
          </div>

          {/* Metrics/Visualization Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#2E5979] mb-8">Current Space Weather Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {metrics.map((metric) => (
                <div
                  key={metric.title}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 relative group"
                >
                  {/* Colorful icon area */}
                  <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6f4fa] via-[#E69D4A]/20 to-[#2E5979]/10 text-2xl">
                    {metricIcons[metric.title] || '--'}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 flex items-center justify-center">
                    {metric.title}
                    <span
                      tabIndex={0}
                      className="ml-2 text-[#2E5979] cursor-pointer relative focus:outline-none"
                      aria-label={`Definition: ${glossaryShort[metric.title]}`}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2E5979" opacity="0.15"/><text x="12" y="17" textAnchor="middle" fontSize="14" fill="#2E5979" fontWeight="bold">?</text></svg>
                      <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white text-gray-800 text-xs rounded shadow-lg px-3 py-2 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-200">
                        {glossaryShort[metric.title]}
                      </span>
                    </span>
                  </h3>
                  <div className="text-2xl font-bold text-[#2E5979] mb-1">{metric.value}</div>
                  <p className="text-gray-700 text-sm">{metric.description}</p>
                </div>
              ))}
              {/* Mini Aurora Forecast Map Widget */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 mb-3 flex items-center justify-center bg-[#2E5979]/10 rounded-full text-2xl text-[#2E5979]">
                  🌌
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Aurora Forecast</h3>
                <div className="text-2xl font-bold text-[#2E5979] mb-1">High</div>
                <p className="text-gray-700 text-sm">Northern latitudes tonight</p>
                {/* Mini aurora map visualization */}
                <div className="mt-3 w-full h-16 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 rounded-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-1 left-1 text-xs text-white font-bold">Aurora Zone</div>
                </div>
              </div>
              {/* Animated Solar Activity Widget */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 mb-3 flex items-center justify-center bg-yellow-100 rounded-full">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="10" fill="#FFD600">
                      <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <g>
                      <line x1="20" y1="2" x2="20" y2="8" stroke="#FFD600" strokeWidth="2">
                        <animate attributeName="y2" values="8;4;8" dur="2s" repeatCount="indefinite" />
                      </line>
                      <line x1="20" y1="32" x2="20" y2="38" stroke="#FFD600" strokeWidth="2">
                        <animate attributeName="y2" values="38;36;38" dur="2s" repeatCount="indefinite" />
                      </line>
                      <line x1="2" y1="20" x2="8" y2="20" stroke="#FFD600" strokeWidth="2">
                        <animate attributeName="x2" values="8;4;8" dur="2s" repeatCount="indefinite" />
                      </line>
                      <line x1="32" y1="20" x2="38" y2="20" stroke="#FFD600" strokeWidth="2">
                        <animate attributeName="x2" values="38;36;38" dur="2s" repeatCount="indefinite" />
                      </line>
                    </g>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Solar Activity</h3>
                <div className="text-2xl font-bold text-[#2E5979] mb-1">Active</div>
                <p className="text-gray-700 text-sm">Solar wind and flare activity ongoing</p>
              </div>
            </div>
            {/* In the future, replace placeholders with live charts/graphs and real data */}
          </section>

          {/* Did You Know? Fact Rotator */}
          <div className="mb-12 flex justify-center">
            <div className="bg-[#2E5979] text-white rounded-lg shadow-lg px-8 py-6 max-w-xl w-full text-center text-lg font-medium relative overflow-hidden animate-fade-in">
              <span className="block text-sm uppercase tracking-wider text-[#E69D4A] mb-2">Did You Know?</span>
              <span className="transition-opacity duration-500 ease-in-out">{facts[factIdx]}</span>
            </div>
          </div>

          {/* Grafana-style Chart Panels*/}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-[#2E5979] mb-8">Space Weather Trends (Data)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Line Chart Panel */}
              <div className="bg-[#23272e] rounded-xl shadow-lg p-6 border border-[#23272e]">
                <h3 className="text-lg font-semibold text-white mb-4">Kp Index (Last 24 Hours)</h3>
                <Line
                  data={{
                    labels: [
                      "00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"
                    ],
                    datasets: [
                      {
                        label: "Kp Index",
                        data: [2, 3, 2, 4, 5, 3, 2, 3, 4, 3, 2, 2],
                        borderColor: "#E69D4A",
                        backgroundColor: "rgba(230,157,74,0.2)",
                        tension: 0.4,
                        pointRadius: 3,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    animation: {
                      duration: 1200,
                      easing: 'easeInOutQuart',
                    },
                    plugins: {
                      legend: {
                        labels: { color: "#fff" },
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#fff" },
                        grid: { color: "#444" },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: { color: "#fff" },
                        grid: { color: "#444" },
                      },
                    },
                  }}
                />
              </div>
              {/* Bar Chart Panel */}
              <div className="bg-[#23272e] rounded-xl shadow-lg p-6 border border-[#23272e]">
                <h3 className="text-lg font-semibold text-white mb-4">Solar Wind Speed (km/s)</h3>
                <Bar
                  data={{
                    labels: [
                      "00:00","04:00","08:00","12:00","16:00","20:00"
                    ],
                    datasets: [
                      {
                        label: "Solar Wind Speed",
                        data: [350, 420, 390, 410, 430, 400],
                        backgroundColor: "#2E5979",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    animation: {
                      duration: 1200,
                      easing: 'easeInOutQuart',
                    },
                    plugins: {
                      legend: {
                        labels: { color: "#fff" },
                      },
                      title: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#fff" },
                        grid: { color: "#444" },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: { color: "#fff" },
                        grid: { color: "#444" },
                      },
                    },
                  }}
                />
              </div>
            </div>
            {/* In the future, replace mock data with real API data or Grafana panel embeds */}
          </section>

          {/* Educational Content */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#2E5979] mb-8">What is Space Weather?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {eduCards.map(card => (
                <div
                  key={card.key}
                  className={`bg-gradient-to-br ${card.accent} rounded-xl p-6 shadow-lg flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in`}
                >
                  <div className="relative mb-4 w-full h-48 overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                      {card.title}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[#194270]">{card.title}</h3>
                  <p className="text-gray-700 text-base text-center">{card.summary}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-[#2E5979] text-white rounded-lg font-semibold shadow hover:bg-[#194270] transition-colors duration-200 focus:outline-none"
                    onClick={() => setOpenCard(openCard === card.key ? null : card.key)}
                    aria-expanded={openCard === card.key}
                  >
                    {openCard === card.key ? 'Hide Details' : 'Learn More'}
                  </button>
                  {openCard === card.key && (
                    <div className="mt-3 text-gray-800 text-sm bg-white/90 rounded p-3 border border-[#2E5979]/20 w-full animate-fade-in">
                      {card.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Glossary/FAQ Section */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-[#2E5979] mb-8">Glossary & FAQs</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Glossary */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#194270]">Glossary</h3>
                <div className="grid gap-4">
                  {glossary.map((item) => (
                    <div key={item.term} className="bg-white rounded-lg shadow border-l-4 border-[#2E5979] p-4 flex items-start gap-3">
                      <span className="text-2xl text-[#2E5979]">📖</span>
                      <div>
                        <span className="font-bold text-[#2E5979] text-base">{item.term}</span>
                        <div className="text-gray-700 text-sm mt-1">{item.definition}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* FAQs */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#194270]">FAQs</h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-lg shadow border-l-4 border-[#E69D4A] p-4">
                      <button
                        className="flex items-center gap-2 text-[#2E5979] font-semibold focus:outline-none mb-2"
                        onClick={() => setOpenCard(openCard === `faq${idx}` ? null : `faq${idx}`)}
                        aria-expanded={openCard === `faq${idx}`}
                      >
                        <span>Q: {faq.question}</span>
                        <svg className={`ml-auto transition-transform ${openCard === `faq${idx}` ? 'rotate-180' : ''}`} width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#2E5979" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      {openCard === `faq${idx}` && (
                        <div className="text-gray-700 text-sm pl-7">A: {faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
    </div>
    </>
  );
}

export default SpaceWeather; 