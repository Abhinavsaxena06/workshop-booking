import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import allWorkshops from "./workshopss";

function BookWorkshop() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const workshop = allWorkshops.find((w) => w.id === Number(id));

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            Workshop not found
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-4">
            The workshop you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/workshops")}
            className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 transition shadow-lg"
          >
            Back to Workshops
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const alreadyBooked = bookings.find((item) => item.id === workshop.id);

    if (alreadyBooked) {
      toast.error("You already booked this workshop ⚠️");
      return;
    }

    const newBooking = {
      id: workshop.id,
      title: workshop.title,
      instructor: workshop.instructor,
      date: workshop.date,
      location: workshop.location,
      category: workshop.category,
      level: workshop.level,
      duration: workshop.duration,
      description: workshop.description,
      seatsLeft: workshop.seatsLeft,
      bookedAt: new Date().toLocaleString(),
      progress: 0,
      professor: workshop.instructor,
      professorEmail: `${workshop.instructor
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .trim()
        .replace(/\s+/g, ".")}@example.edu`,
      assignment: "Workshop booking confirmed. Await further instructions.",
      submissionStatus: "Pending",
      statusColor:
        "text-red-600 bg-red-50 dark:text-red-300 dark:bg-red-900/30",
      nextClass: workshop.date,
      deadline: workshop.date,
    };

    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));
    window.dispatchEvent(new Event("bookingUpdated"));

    toast.success("Workshop booked successfully 🎉");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const learningPoints = [
    `Understand the core concepts of ${workshop.category}.`,
    `Learn directly from ${workshop.instructor}.`,
    `Build practical knowledge through guided examples and real-world workflows.`,
    `Gain confidence in ${workshop.title.toLowerCase()}.`,
  ];

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/60 dark:border-slate-700">
          <div className="flex flex-col gap-3">
            <span className="w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-slate-600">
              {workshop.category} • {workshop.level}
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
              {workshop.title}
            </h1>

            <p className="text-gray-600 dark:text-slate-300">
              {workshop.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/60 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">Date</p>
            <p className="font-bold text-gray-900 dark:text-white mt-1">
              {workshop.date}
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/60 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">Location</p>
            <p className="font-bold text-gray-900 dark:text-white mt-1">
              {workshop.location}
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/60 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">Duration</p>
            <p className="font-bold text-gray-900 dark:text-white mt-1">
              {workshop.duration}
            </p>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/60 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-slate-400">Seats Left</p>
            <p className="font-bold text-indigo-600 dark:text-indigo-300 mt-1">
              {workshop.seatsLeft}
            </p>
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/60 dark:border-slate-700">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
            About the Instructor 👨‍🏫
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            {workshop.instructor} will lead this workshop and guide students through
            key concepts, practical understanding, and applied learning in{" "}
            {workshop.category}. This session is designed to help learners gain
            confidence through expert instruction and structured practice.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/60 dark:border-slate-700">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
            About this Workshop 📘
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
            {workshop.description}
          </p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/60 dark:border-slate-700">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
            What Students Will Learn 🚀
          </h2>

          <div className="space-y-3">
            {learningPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 text-gray-700 dark:text-slate-300 font-medium"
              >
                ✅ {point}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/60 dark:border-slate-700 text-center">
          <p className="text-gray-600 dark:text-slate-300 mb-4">
            You are booking a seat for <span className="font-bold">{workshop.title}</span>.
          </p>

          <button
            onClick={handleBooking}
            disabled={workshop.seatsLeft <= 0}
            className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {workshop.seatsLeft <= 0 ? "No Seats Available" : "Confirm Booking 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookWorkshop;