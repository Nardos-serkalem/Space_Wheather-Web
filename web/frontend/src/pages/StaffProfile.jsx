import React, { useState } from "react";

const StaffProfile = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Dr. Amanuel Bekele",
      position: "Senior Astrophysicist",
      bio: "Dr. Amanuel specializes in stellar evolution and galaxy formation with over 15 years of research experience.",
      image:
        "",
    },
    {
      name: "Dr. Tsehay Alemu",
      position: "Planetary Geologist",
      bio: "Expert in Martian surface studies and planetary tectonics, leading multiple field missions in Ethiopia.",
      image:
        "",
    },
    {
      name: "Dr. Mekdes Gebremariam",
      position: "Astrobiologist",
      bio: "Focused on extremophiles and the search for life beyond Earth, Mekdes leads astrobiology outreach programs.",
      image:
        "",
    },
    {
      name: "Dr. Samuel Tesfaye",
      position: "Spacecraft Engineer",
      bio: "Designs and tests spacecraft instrumentation with experience at international space agencies.",
      image:
        "",
    },
    {
      name: "Dr. Selamawit Haile",
      position: "Cosmochemist",
      bio: "Researches cosmic dust and meteorite composition to better understand the origins of the solar system.",
      image:
        "",
    },
  ];

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 relative w-full bg-white text-gray-900 font-poppins min-h-screen">
      <main className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">Meet Our Team</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Brilliant minds dedicated to unraveling the mysteries of space and planetary science.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by name or position..."
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E69D4A]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredTeamMembers.map((member, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMember(member)}
              className="group bg-gray-50 rounded-2xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow focus:outline-none"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#2E5979] group-hover:border-[#E69D4A] transition-colors mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#2E5979] mb-1">{member.name}</h3>
              <p className="text-[#E69D4A] font-medium">{member.position}</p>
            </button>
          ))}
        </div>

        {/* Modal */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-white rounded-xl max-w-lg w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 focus:outline-none text-2xl font-bold"
                aria-label="Close profile modal"
              >
                &times;
              </button>

              <div className="flex flex-col items-center">
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#2E5979] mb-6">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-3xl font-bold text-[#2E5979] mb-2">{selectedMember.name}</h3>
                <p className="text-[#E69D4A] text-xl font-semibold mb-6">{selectedMember.position}</p>
                <p className="text-gray-700 leading-relaxed text-center">{selectedMember.bio}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StaffProfile;
