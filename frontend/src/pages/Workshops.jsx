import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export const workshopCategories = [
  { name: "Python", icon: "🐍", color: "#3b82f6", count: 12 },
  { name: "Scilab", icon: "📊", color: "#10b981", count: 8 },
  { name: "OpenFOAM", icon: "💨", color: "#f97316", count: 6 },
  { name: "Arduino", icon: "🤖", color: "#8b5cf6", count: 7 },
  { name: "MATLAB", icon: "📈", color: "#ec4899", count: 5 },
  { name: "AI/ML", icon: "🧠", color: "#14b8a6", count: 10 },
];

const allWorkshops = [
  {
    id: 1,
    title: "Machine Learning using Python",
    instructor: "Prof. Ganesh Ramakrishnan",
    date: "2025-04-16",
    location: "IIT Bombay",
    seats: 35,
    seatsLeft: 10,
    category: "Python",
    level: "Intermediate",
    duration: "2 Days",
    description: "Build strong ML foundations with Python, datasets, and practical model training.",
  },
  {
    id: 2,
    title: "Data Mining using Python",
    instructor: "Prof. Soumen Chakrabarti",
    date: "2025-04-27",
    location: "IIT Bombay",
    seats: 40,
    seatsLeft: 15,
    category: "Python",
    level: "Intermediate",
    duration: "1 Day",
    description: "Learn patterns, clustering, classification, and mining workflows using Python.",
  },
  {
    id: 3,
    title: "Thermal Sciences and CFD Applications",
    instructor: "Prof. Sameer Khandekar",
    date: "2025-04-30",
    location: "IIT Kanpur",
    seats: 20,
    seatsLeft: 3,
    category: "OpenFOAM",
    level: "Advanced",
    duration: "2 Days",
    description: "Understand CFD simulation workflows and thermal science use-cases with OpenFOAM.",
  },
  {
    id: 4,
    title: "Introduction to Scilab",
    instructor: "Prof. Kannan M. Moudgalya",
    date: "2025-05-02",
    location: "IIT Bombay",
    seats: 50,
    seatsLeft: 21,
    category: "Scilab",
    level: "Beginner",
    duration: "1 Day",
    description: "Start using Scilab for numerical computing, plotting, and engineering workflows.",
  },
  {
    id: 5,
    title: "Arduino for Beginners",
    instructor: "Prof. R. Venkatesh",
    date: "2025-05-08",
    location: "IIT Madras",
    seats: 45,
    seatsLeft: 12,
    category: "Arduino",
    level: "Beginner",
    duration: "2 Days",
    description: "Learn sensors, LEDs, actuators, and build interactive hardware projects.",
  },
  {
    id: 6,
    title: "Deep Learning Foundations",
    instructor: "Prof. Pushpak Bhattacharyya",
    date: "2025-05-12",
    location: "IIT Bombay",
    seats: 60,
    seatsLeft: 18,
    category: "AI/ML",
    level: "Intermediate",
    duration: "2 Days",
    description: "Explore neural networks, training concepts, and practical deep learning intuition.",
  },
  {
    id: 7,
    title: "MATLAB for Signal Processing",
    instructor: "Prof. Anil Kumar",
    date: "2025-05-18",
    location: "IIT Delhi",
    seats: 30,
    seatsLeft: 9,
    category: "MATLAB",
    level: "Intermediate",
    duration: "1 Day",
    description: "Work with filtering, transforms, and signal analysis in MATLAB.",
  },
  {
    id: 8,
    title: "Computer Vision with Python",
    instructor: "Prof. Debdoot Sheet",
    date: "2025-05-21",
    location: "IIT Kharagpur",
    seats: 38,
    seatsLeft: 7,
    category: "AI/ML",
    level: "Intermediate",
    duration: "2 Days",
    description: "Image processing, OpenCV pipelines, detection basics, and real-world CV tasks.",
  },
  {
    id: 9,
    title: "Numerical Methods using Scilab",
    instructor: "Prof. S. N. Mahesh",
    date: "2025-05-25",
    location: "IIT Hyderabad",
    seats: 42,
    seatsLeft: 16,
    category: "Scilab",
    level: "Beginner",
    duration: "1 Day",
    description: "Solve root-finding, interpolation, integration, and numerical analysis problems.",
  },
  {
    id: 10,
    title: "OpenFOAM for Beginners",
    instructor: "Prof. Arvind Pattamatta",
    date: "2025-05-28",
    location: "IIT Madras",
    seats: 28,
    seatsLeft: 5,
    category: "OpenFOAM",
    level: "Beginner",
    duration: "2 Days",
    description: "Get started with meshing, cases, boundary conditions, and simulation setup.",
  },
  {
    id: 11,
    title: "Python for Scientific Computing",
    instructor: "Prof. Balaram Das",
    date: "2025-06-02",
    location: "IIT Roorkee",
    seats: 55,
    seatsLeft: 20,
    category: "Python",
    level: "Beginner",
    duration: "1 Day",
    description: "Use NumPy, Pandas, Matplotlib, and Jupyter for scientific workflows.",
  },
  {
    id: 12,
    title: "Natural Language Processing Basics",
    instructor: "Prof. Monojit Choudhury",
    date: "2025-06-06",
    location: "IIT Delhi",
    seats: 48,
    seatsLeft: 14,
    category: "AI/ML",
    level: "Intermediate",
    duration: "2 Days",
    description: "Text preprocessing, embeddings, classification, and intro to language models.",
  },
  {
    id: 13,
    title: "Embedded Systems with Arduino",
    instructor: "Prof. K. Raghunandan",
    date: "2025-06-09",
    location: "IIT Guwahati",
    seats: 32,
    seatsLeft: 11,
    category: "Arduino",
    level: "Intermediate",
    duration: "2 Days",
    description: "Design practical embedded projects and interface multiple hardware modules.",
  },
  {
    id: 14,
    title: "Advanced CFD Workflows",
    instructor: "Prof. S. A. Narasimhan",
    date: "2025-06-13",
    location: "IIT Kanpur",
    seats: 22,
    seatsLeft: 2,
    category: "OpenFOAM",
    level: "Advanced",
    duration: "3 Days",
    description: "Dive into advanced CFD strategies, solver settings, and engineering validation.",
  },
  {
    id: 15,
    title: "Data Visualization in Python",
    instructor: "Prof. Chetan Arora",
    date: "2025-06-18",
    location: "IIT Delhi",
    seats: 44,
    seatsLeft: 17,
    category: "Python",
    level: "Beginner",
    duration: "1 Day",
    description: "Create compelling charts, dashboards, and storytelling visuals using Python.",
  },
  {
    id: 16,
    title: "Control Systems in Scilab",
    instructor: "Prof. Deepak Khemani",
    date: "2025-06-22",
    location: "IIT Bombay",
    seats: 36,
    seatsLeft: 8,
    category: "Scilab",
    level: "Intermediate",
    duration: "2 Days",
    description: "Model dynamic systems, responses, and stability using Scilab toolkits.",
  },
  {
    id: 17,
    title: "MATLAB for Image Processing",
    instructor: "Prof. Rajiv Soundararajan",
    date: "2025-06-25",
    location: "IIT Madras",
    seats: 34,
    seatsLeft: 10,
    category: "MATLAB",
    level: "Intermediate",
    duration: "1 Day",
    description: "Explore transforms, filters, segmentation, and image enhancement techniques.",
  },
  {
    id: 18,
    title: "AI for Students: Fast Track Bootcamp",
    instructor: "Prof. Sudeshna Sarkar",
    date: "2025-06-30",
    location: "IIT Kharagpur",
    seats: 70,
    seatsLeft: 26,
    category: "AI/ML",
    level: "Beginner",
    duration: "2 Days",
    description: "A high-energy introduction to modern AI concepts, workflows, and projects.",
  },
];

const categoryStyles = {
  Python: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Scilab: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  OpenFOAM: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Arduino: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  MATLAB: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  "AI/ML": "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function WorkshopCard({ workshop }) {
  const fillPercent = ((workshop.seats - workshop.seatsLeft) / workshop.seats) * 100;
  const urgent = workshop.seatsLeft <= 5;

  const barColor =
    workshop.seatsLeft < 8 ? "bg-red-500" :
    workshop.seatsLeft < 15 ? "bg-yellow-500" :
    "bg-green-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

      <div className="h-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400"></div>

      <div className="p-6 relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              categoryStyles[workshop.category] || "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300"
            }`}
          >
            {workshop.category}
          </span>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600">
            {workshop.level}
          </span>
        </div>

        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 leading-snug">
          {workshop.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
          {workshop.description}
        </p>

        <div className="space-y-2 text-sm text-gray-600 dark:text-slate-300 mb-5">
          <p className="flex items-center gap-2">
            <span>👨‍🏫</span>
            <span>{workshop.instructor}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>📅</span>
            <span>{formatDate(workshop.date)}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>📍</span>
            <span>{workshop.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <span>⏳</span>
            <span>{workshop.duration}</span>
          </p>
        </div>

        <div className="mb-5">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-500 dark:text-slate-400">Seats available</span>
            <span className={urgent ? "text-red-600 dark:text-red-400 font-semibold" : "text-gray-700 dark:text-slate-300 font-medium"}>
              {urgent ? `⚠️ Only ${workshop.seatsLeft} left` : `${workshop.seatsLeft} left`}
            </span>
          </div>

          <div className="h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${barColor} transition-all duration-500`}
              style={{ width: `${fillPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            to={`/book/${workshop.id}`}
            className="block text-center rounded-2xl py-3.5 font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book Now →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Workshops() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    if (
      categoryFromUrl &&
      ["All", ...workshopCategories.map((c) => c.name)].includes(categoryFromUrl)
    ) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryFromUrl]);

  const locations = useMemo(() => {
    return ["All", ...new Set(allWorkshops.map((w) => w.location))];
  }, []);

  const filteredWorkshops = useMemo(() => {
    let result = [...allWorkshops];

    if (selectedCategory !== "All") {
      result = result.filter((w) => w.category === selectedCategory);
    }

    if (selectedLocation !== "All") {
      result = result.filter((w) => w.location === selectedLocation);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.instructor.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q) ||
          w.location.toLowerCase().includes(q)
      );
    }

    if (sortBy === "date") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "seats") {
      result.sort((a, b) => a.seatsLeft - b.seatsLeft);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [search, selectedCategory, selectedLocation, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-200/30 dark:bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>

      <section className="relative z-10 px-4 pt-14 pb-10">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase bg-white/70 dark:bg-slate-800/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-slate-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Explore All Workshops
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
            Learn, Build, and
            <span className="block bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Grow with FOSSEE
            </span>
          </h1>

          <p className="mt-4 text-gray-600 dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover hands-on workshops across Python, AI/ML, Scilab, OpenFOAM,
            Arduino, MATLAB and more — designed for students and built for real learning.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/65 dark:bg-slate-800/70 backdrop-blur-xl border border-white/60 dark:border-slate-700 rounded-3xl shadow-xl p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
                  Search workshops
                </label>
                <input
                  type="text"
                  placeholder="Search by title, category, instructor, location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="All">All Categories</option>
                  {workshopCategories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {["All", ...workshopCategories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="date">Upcoming Date</option>
                  <option value="seats">Seats Filling Fast</option>
                  <option value="title">Title A–Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                Available Workshops
              </h2>
              <p className="text-gray-600 dark:text-slate-300 mt-1">
                {filteredWorkshops.length} workshop{filteredWorkshops.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {filteredWorkshops.length === 0 ? (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/60 dark:border-slate-700 rounded-3xl p-10 text-center shadow-lg">
              <div className="text-5xl mb-3">🔎</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No workshops found</h3>
              <p className="text-gray-600 dark:text-slate-300">
                Try changing your search, category, or location filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

export default Workshops;