import React from "react";

const ResearchCards = ({ darkMode, glassEffect }) => {
  const researchData = [
    {
      title: "Solar Dynamics",
      desc: "Investigating the Sun's activity and its impact on Earth.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ7zYbrRtc4ldXBOI_hEveaqYjkZA10d5qCn2415RE48RG8w8Ga798yJb-3fXfl6zvcdr0UiYmwAEWsOyXIzcQIOWtyGUveClxDp3X0tcPsJh4AMrUd0g86B-w-QVmYGlRfDmpmw0UbWdPzz3VdmsPsfHoygpNvHcKdjt8Ah-3vFV-HgJ8UBokC63e051MAmlxBZQ2r785LdY2u4rUHzlyezL4p1qsfsXh1oN5IGQ8bwaoh_bq31t1wcMStQzA0mCUankM-u613eo",
    },
    {
      title: "Planetary Systems",
      desc: "Exploring the formation and evolution of planetary systems.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_vWvE8AAg8w3PD-qgEXj6x43fyl2mWHDCXLK92z_yNEv1XJrJhaTIiZ3OKGsxPdzQynECW3ls1HUZmNVUE7DWbrk4cicQK8lYUSLJfRtg48ksT-oDudpBEgkDESstccqHeNQpySz_-9rRWxYJ45J9OvgMxxkoyLQLUixM7DuUYqQxzXnQIlmOv2pkPY1r7EHo44vL3mtTXdK2Gb_W0GvmSgHyijmiXDV91hlq_lamBWhdgKCIjisbCismF0Tdfj1jnSrym7Hf6xQ",
    },
    {
      title: "Space Weather Monitoring",
      desc: "Tracking and predicting space weather events.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl0R0GK8H1-U-cOLkSjvxkzPH_VrxE9r-Q8TNIdw0rRadxcDOmgpCIyIyhSzZ0T-y6Nsek5fz76ji1fpCZwsVwTloOXWrl65CLtf9C_T42Zf3dwfmSVvdE4gSbs-dSAMyme69Xl4rBLvKJ57qjf1TRNu8UY4i3UnaLk0W_exLJJ0WwwOtJV10FzwjePgEnMt-A80q6Aq6EwGvo71XziKA-qbLXY6TIT95JhbKu7eeY6OLRPzWGF_U3OzggvGy7wmlX9Lwnv6YYVb8",
    },
  ];

  return (
    <section className={`mb-24 w-full`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {researchData.map(({ title, desc, img }) => (
          <div
            key={title}
            className={`
              overflow-hidden shadow-lg transform transition-transform duration-300
              hover:-translate-y-3
              ${glassEffect ? "bg-white/10 backdrop-blur-md border border-white/20 rounded-md" : darkMode ? "bg-[#24394E] border border-[#3a5068] rounded-md" : "bg-white rounded-lg border border-gray-200"}
            `}
          >
            <img className="w-full h-56 object-cover" src={img} alt={title} />
            <div className="p-6">
              <h3 className={`text-xl font-semibold mb-2 ${darkMode || glassEffect ? "text-white" : "text-gray-800"}`}>{title}</h3>
              <p className={`leading-relaxed ${darkMode || glassEffect ? "text-gray-300" : "text-gray-600"}`}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResearchCards;
