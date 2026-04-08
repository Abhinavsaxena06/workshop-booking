import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from "../components/AnimatedBackground";
import StatCard from "../components/StatCard";
import { workshopCategories } from "./Workshops";

const featuredWorkshops = [
  {
    id: 1,
    title: 'Machine Learning using Python',
    instructor: 'Prof. Ganesh Ramakrishnan',
    date: 'April 16, 2025',
    location: 'IIT Bombay',
    seats: 35,
    seatsLeft: 10,
    category: 'Python',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    id: 2,
    title: 'Data Mining using Python',
    instructor: 'Prof. Soumen Chakrabarti',
    date: 'April 27, 2025',
    location: 'IIT Bombay',
    seats: 40,
    seatsLeft: 15,
    category: 'Python',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    id: 3,
    title: 'Thermal Sciences and CFD applications',
    instructor: 'Prof. Sameern Khandekar',
    date: 'April 30, 2025',
    location: 'IIT Kanpur',
    seats: 20,
    seatsLeft: 3,
    category: 'OpenFOAM',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  },
  {
    id: 4,
    title: 'Introduction to Scilab',
    instructor: 'Prof. Kannan M. Moudgalya',
    date: 'May 2, 2025',
    location: 'IIT Bombay',
    seats: 50,
    seatsLeft: 21,
    category: 'Scilab',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  },
];

const statsData = [
  {
    title: 'Total Workshops',
    value: 1240,
    icon: '🎓',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300',
  },
  {
    title: 'Students Trained',
    value: 49325,
    icon: '👨‍🎓',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300',
  },
  {
    title: 'Expert Instructors',
    value: 338,
    icon: '👨‍🏫',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300',
  },
  {
    title: 'Locations Served',
    value: 145,
    icon: '🏙️',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300',
  },
];

function WorkshopCard({ workshop }) {
  const fillPercent = ((workshop.seats - workshop.seatsLeft) / workshop.seats) * 100;
  const barColor =
    workshop.seatsLeft < 5 ? 'bg-red-500' :
    workshop.seatsLeft < 15 ? 'bg-yellow-500' :
    'bg-green-500';
  const urgent = workshop.seatsLeft < 5;

  return (
    <div className="bg-white/85 dark:bg-slate-800/80 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600"></div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full w-fit mb-3 ${workshop.categoryColor}`}>
          {workshop.category}
        </span>

        <h3 className="font-bold text-gray-800 dark:text-white text-base sm:text-lg leading-tight mb-2">
          {workshop.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-slate-300 mb-1 flex items-center gap-1">
          <span>👨‍🏫</span>{workshop.instructor}
        </p>

        <p className="text-sm text-gray-500 dark:text-slate-300 mb-1 flex items-center gap-1">
          <span>📅</span>{workshop.date}
        </p>

        <p className="text-sm text-gray-500 dark:text-slate-300 mb-4 flex items-center gap-1">
          <span>📍</span>{workshop.location}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1 gap-2">
            <span>Seats available</span>
            <span className={urgent ? 'text-red-600 dark:text-red-400 font-semibold text-right' : 'text-gray-600 dark:text-slate-300 text-right'}>
              {urgent ? `⚠️ Only ${workshop.seatsLeft} left!` : `${workshop.seatsLeft} seats left`}
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
              style={{ width: `${fillPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1"></div>

        <Link
          to={`/book/${workshop.id}`}
          className="block text-center bg-blue-700 text-white font-medium py-3 rounded-2xl hover:bg-blue-800 transition-colors duration-200"
        >
          Book Now →
        </Link>
      </div>
    </div>
  );
}

function Home() {
  const phrases = [
    'Learn Python 🐍',
    'Master Scilab 📊',
    'Simulate with OpenFOAM 💨',
    'Build with Arduino 🤖',
    'Grow with FOSSEE 🎓',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const current = phrases[phraseIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, phraseIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 border"
            style={{
              backgroundColor: '#6366f110',
              borderColor: '#6366f130',
              color: '#4f46e5',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Registrations are open for 2025
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-4">
            Free Workshops to
          </h1>

          <div
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 min-h-[1.2em]"
            style={{
              background: 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {displayed}
            <span className="animate-pulse" style={{ WebkitTextFillColor: '#6366f1' }}>|</span>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Hands-on workshops by IIT professors — completely free for
            all students across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to="/workshops"
              className="group relative inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-white text-base sm:text-lg text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{ background: "linear-gradient(135deg, #6A5AE0, #FF4D8D)" }}
            >
              <span
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"
                style={{ background: "linear-gradient(135deg, #6A5AE0, #FF4D8D)" }}
              ></span>
              <span className="relative z-10">Explore Workshops 🚀</span>
            </Link>

            {!isLoggedIn && (
              <Link
                to="/register"
                className="group relative inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-white text-base sm:text-lg text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:scale-95"
                style={{ background: "linear-gradient(135deg, #FF7A18, #FFB347)" }}
              >
                <span
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl"
                  style={{ background: "linear-gradient(135deg, #FF7A18, #FFB347)" }}
                ></span>
                <span className="relative z-10">Register Free →</span>
              </Link>
            )}
          </div>

          <div className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-gray-400 dark:text-slate-400">
            <span className="text-[10px] sm:text-xs tracking-widest uppercase">Scroll to explore</span>
            <div className="w-5 h-8 border-2 border-gray-300 dark:border-slate-600 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-gray-300 dark:bg-slate-500 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span
            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 sm:px-4 py-2 rounded-full"
            style={{
              background: '#EEF2FF',
              border: '2px solid #6366f1',
              color: '#6366f1',
            }}
          >
            Our Impact
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-4 mb-2">
            Numbers that speak
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-slate-300 mb-10 sm:mb-12">
            A decade of free education across India
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {statsData.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
            What will you learn?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-300">
            Pick a topic and find the right workshop
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {workshopCategories.map((cat, i) => (
            <Link
              to={`/workshops?category=${encodeURIComponent(cat.name)}`}
              key={i}
              className="rounded-2xl p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer dark:bg-slate-800/40"
              style={{
                backgroundColor: cat.color + '08',
                border: `2px solid ${cat.color}40`,
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0"
                style={{ backgroundColor: cat.color + '20' }}
              >
                {cat.icon}
              </div>

              <div>
                <div className="font-bold text-gray-800 dark:text-white text-sm sm:text-base">{cat.name}</div>
                <div className="text-sm font-medium" style={{ color: cat.color }}>
                  {cat.count} workshops
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED WORKSHOPS SECTION */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-1">
                Upcoming workshops
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-slate-300">Seats filling up fast</p>
            </div>
            <Link to="/workshops" className="text-sm font-bold hidden sm:block" style={{ color: '#6366f1' }}>
              See all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredWorkshops.map(w => <WorkshopCard key={w.id} workshop={w} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
            Book in 3 steps
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-300 mb-10 sm:mb-12">
            From browsing to attending in minutes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '🔍', title: 'Browse', desc: 'Find workshops by topic, location or date.', color: '#6366f1' },
              { n: '02', icon: '📝', title: 'Book', desc: 'Fill your details and confirm your seat.', color: '#10b981' },
              { n: '03', icon: '🎓', title: 'Learn', desc: 'Attend the workshop and build real skills.', color: '#f59e0b' },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-3xl p-6 sm:p-8 text-center dark:bg-slate-800/50"
                style={{
                  backgroundColor: step.color + '10',
                  border: `2px solid ${step.color}35`,
                }}
              >
                <div className="text-5xl sm:text-6xl md:text-7xl font-black mb-4" style={{ color: step.color, opacity: 0.15 }}>
                  {step.n}
                </div>

                <div
                  className="text-3xl sm:text-4xl mb-3 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ backgroundColor: step.color + '20' }}
                >
                  {step.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-gray-800 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="rounded-3xl p-6 sm:p-10 md:p-16 bg-white/90 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700"
            style={{
              boxShadow: '0 20px 60px #6366f110',
            }}
          >
            <div className="text-4xl sm:text-5xl mb-4">🚀</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
              Ready to level up?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-slate-300 mb-8">
              Join 48,500+ students already learning with FOSSEE. It's free.
            </p>

            {!isLoggedIn && (
              <Link
                to="/register"
                className="inline-block w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-2xl font-black text-white text-base sm:text-lg hover:scale-105 transition-transform duration-200"
                style={{
                  background: 'linear-gradient(135deg, #6A5AE0, #FF4D8D)',
                  boxShadow: '0 0 40px #6A5AE030',
                }}
              >
                Get Started — It's Free ✨
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;