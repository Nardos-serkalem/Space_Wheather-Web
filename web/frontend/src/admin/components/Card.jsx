import React from "react";

const Card = ({ title, description, date, actions }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition mb-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-700 text-sm mb-2">{description}</p>
    {date && <p className="text-gray-500 text-xs mb-2">Date: {date}</p>}
    <div className="flex gap-2">{actions}</div>
  </div>
);

export default Card;
