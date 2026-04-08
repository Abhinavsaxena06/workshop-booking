import React from "react";
import { Link } from "react-router-dom";

function WorkshopCard({ w }) {
  if (!w) return null;

  const fillPercent = ((w.seats - w.seatsLeft) / w.seats) * 100;

  const barColor =
    fillPercent > 85 ? "bg-red-500" :
    fillPercent > 50 ? "bg-yellow-500" :
    "bg-green-500";

  const urgent = w.seatsLeft < 5;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100
                    hover:shadow-lg hover:-translate-y-1 transition-all
                    duration-300 overflow-hidden flex flex-col">

      <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600"></div>

      <div className="p-5 flex flex-col flex-1">

        <span className={`text-xs font-semibold px-2 py-1 rounded-full
                          w-fit mb-3 ${w.categoryColor}`}>
          {w.category}
        </span>

        <h3 className="font-bold text-gray-800 text-lg mb-2">
          {w.title}
        </h3>

        <p className="text-sm text-gray-500 mb-1">👨‍🏫 {w.instructor}</p>
        <p className="text-sm text-gray-500 mb-1">📅 {w.date}</p>
        <p className="text-sm text-gray-500 mb-4">📍 {w.location}</p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Seats</span>
            <span className={urgent ? "text-red-600 font-semibold" : ""}>
              {urgent
                ? `Only ${w.seatsLeft} left! ⚠️`
                : `${w.seatsLeft} seats left`}
            </span>
          </div>

          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className={`h-2 rounded-full ${barColor}`}
              style={{ width: `${fillPercent}%` }}
            ></div>
          </div>
        </div>

        <Link
          to={`/book/${w.id}`}
          className="block text-center bg-blue-700 text-white py-3 rounded-2xl"
        >
          Book Now →
        </Link>

      </div>
    </div>
  );
}

export default WorkshopCard;