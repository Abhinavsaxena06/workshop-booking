import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const userName = storedUser?.name || "Abhinav Saxena";
  const userEmail = storedUser?.email || "abhinav@example.com";
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const baseEnrolledCourses = [
    {
      id: 1,
      title: "Machine Learning using Python",
      professor: "Prof. Ganesh Ramakrishnan",
      professorEmail: "ganesh@example.edu",
      progress: 18,
      deadline: "2026-04-12",
      assignment: "Submit mini-project proposal",
      submissionStatus: "Pending",
      statusColor:
        "text-red-600 bg-red-50 dark:text-red-300 dark:bg-red-900/30",
      nextClass: "2026-04-09",
    },
    {
      id: 2,
      title: "Data Mining using Python",
      professor: "Prof. Soumen Chakrabarti",
      professorEmail: "soumen@example.edu",
      progress: 52,
      deadline: "2026-04-15",
      assignment: "Upload clustering analysis report",
      submissionStatus: "In Review",
      statusColor:
        "text-yellow-700 bg-yellow-50 dark:text-yellow-300 dark:bg-yellow-900/30",
      nextClass: "2026-04-10",
    },
    {
      id: 3,
      title: "Introduction to Scilab",
      professor: "Prof. Kannan M. Moudgalya",
      professorEmail: "kannan@example.edu",
      progress: 87,
      deadline: "2026-04-18",
      assignment: "Complete matrix operations worksheet",
      submissionStatus: "Submitted",
      statusColor:
        "text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-900/30",
      nextClass: "2026-04-11",
    },
    {
      id: 4,
      title: "OpenFOAM for Beginners",
      professor: "Prof. Arvind Pattamatta",
      professorEmail: "arvind@example.edu",
      progress: 100,
      deadline: "2026-04-05",
      assignment: "Final simulation case study",
      submissionStatus: "Completed",
      statusColor:
        "text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-900/30",
      nextClass: "2026-04-07",
    },
  ];

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const updateBookings = () => {
      const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      setBookings(storedBookings);
    };

    updateBookings();

    window.addEventListener("bookingUpdated", updateBookings);
    window.addEventListener("storage", updateBookings);

    return () => {
      window.removeEventListener("bookingUpdated", updateBookings);
      window.removeEventListener("storage", updateBookings);
    };
  }, []);

  const enrolledCourses = useMemo(() => {
    const combined = [...baseEnrolledCourses];

    bookings.forEach((booking) => {
      const exists = combined.some((course) => course.id === booking.id);
      if (!exists) {
        combined.push({
          id: booking.id,
          title: booking.title,
          professor: booking.professor || booking.instructor || "Workshop Instructor",
          professorEmail: booking.professorEmail || "instructor@example.edu",
          progress: booking.progress ?? 0,
          deadline: booking.deadline || booking.date,
          assignment:
            booking.assignment ||
            "Workshop booking confirmed. Await further instructions.",
          submissionStatus: booking.submissionStatus || "Pending",
          statusColor:
            booking.statusColor ||
            "text-red-600 bg-red-50 dark:text-red-300 dark:bg-red-900/30",
          nextClass: booking.nextClass || booking.date,
          location: booking.location,
          category: booking.category,
          level: booking.level,
          duration: booking.duration,
          description: booking.description,
        });
      }
    });

    return combined;
  }, [bookings]);

  const completedCourses = enrolledCourses.filter((course) => course.progress === 100);
  const pendingAssignments = enrolledCourses.filter(
    (course) =>
      course.submissionStatus === "Pending" || course.submissionStatus === "In Review"
  );

  const announcements = [
    {
      id: 1,
      title: "Workshop materials uploaded",
      desc: "Latest lecture slides and practice files are now available.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Deadline extended",
      desc: "The Scilab worksheet deadline has been extended by 2 days.",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Live Q&A session",
      desc: "Join the professor-led doubt session this Friday evening.",
      time: "2 days ago",
    },
  ];

  const communityPosts = [
    {
      id: 1,
      name: "Ritika Sharma",
      text: "Can someone explain the difference between supervised and unsupervised learning?",
      course: "Machine Learning using Python",
    },
    {
      id: 2,
      name: "Aman Verma",
      text: "I shared my Scilab notes in the discussion folder, please check.",
      course: "Introduction to Scilab",
    },
    {
      id: 3,
      name: "Karan Jain",
      text: "Anyone facing mesh generation issues in OpenFOAM?",
      course: "OpenFOAM for Beginners",
    },
  ];

  const quickActions = [
    { label: "Browse Workshops", link: "/workshops", icon: "📚" },
    { label: "View Profile", link: "/profile", icon: "👤" },
    { label: "Book New Workshop", link: "/workshops", icon: "📝" },
    { label: "Community Discussions", link: "#community", icon: "💬" },
  ];

  const upcomingCalendar = [
    { date: "09 Apr", event: "ML Python - Live Session" },
    { date: "10 Apr", event: "Data Mining - Assignment Review" },
    { date: "11 Apr", event: "Scilab - Hands-on Lab" },
    { date: "12 Apr", event: "ML Proposal Deadline" },
    { date: "15 Apr", event: "Data Mining Report Deadline" },
  ];

  const totalProgress = useMemo(() => {
    if (!enrolledCourses.length) return 0;
    const total = enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0);
    return Math.round(total / enrolledCourses.length);
  }, [enrolledCourses]);

  const getProgressBarColor = (progress) => {
    if (progress < 25) return "bg-red-500";
    if (progress < 65) return "bg-yellow-500";
    return "bg-green-500";
  };

  const formatDate = (date) => {
    if (!date) return "TBA";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const downloadCertificate = (courseTitle, progress) => {
    if (progress < 85) {
      toast.error("Certificate unlocks after 85% progress.");
      return;
    }

    const issueDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const certificateId = `FOSSEE-${Date.now().toString().slice(-8)}`;

    const certificateHtml = `
      <html>
        <head>
          <title>Certificate - ${courseTitle}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 24px;
              font-family: "Georgia", "Times New Roman", serif;
              background: linear-gradient(135deg, #eef2ff, #fff7ed);
            }
            .certificate-wrapper {
              max-width: 1200px;
              margin: 0 auto;
              background: white;
              border-radius: 24px;
              padding: 18px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
              background: linear-gradient(135deg, #312e81, #7c3aed, #db2777);
            }
            .certificate {
              position: relative;
              background: linear-gradient(180deg, #fffdf8, #ffffff);
              border-radius: 18px;
              min-height: 820px;
              padding: 64px 72px;
              overflow: hidden;
              border: 10px solid rgba(255,255,255,0.7);
            }
            .corner {
              position: absolute;
              width: 140px;
              height: 140px;
              border: 10px solid #f59e0b;
              opacity: 0.18;
            }
            .corner.tl {
              top: 22px;
              left: 22px;
              border-right: none;
              border-bottom: none;
              border-radius: 24px 0 0 0;
            }
            .corner.tr {
              top: 22px;
              right: 22px;
              border-left: none;
              border-bottom: none;
              border-radius: 0 24px 0 0;
            }
            .corner.bl {
              bottom: 22px;
              left: 22px;
              border-right: none;
              border-top: none;
              border-radius: 0 0 0 24px;
            }
            .corner.br {
              bottom: 22px;
              right: 22px;
              border-left: none;
              border-top: none;
              border-radius: 0 0 24px 0;
            }
            .top-bar {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 48px;
            }
            .brand { font-family: Arial, sans-serif; }
            .brand-title {
              font-size: 18px;
              letter-spacing: 4px;
              text-transform: uppercase;
              color: #6d28d9;
              font-weight: 800;
              margin-bottom: 8px;
            }
            .brand-subtitle {
              font-size: 14px;
              color: #6b7280;
              letter-spacing: 1.2px;
            }
            .cert-id-chip {
              font-family: Arial, sans-serif;
              padding: 10px 18px;
              border-radius: 999px;
              background: linear-gradient(135deg, #ede9fe, #fae8ff);
              color: #6d28d9;
              font-size: 13px;
              font-weight: 700;
              border: 1px solid #ddd6fe;
            }
            .title-small {
              text-align: center;
              color: #6b7280;
              font-size: 22px;
              letter-spacing: 4px;
              text-transform: uppercase;
              margin-bottom: 10px;
            }
            .title-main {
              text-align: center;
              font-size: 68px;
              line-height: 1;
              color: #111827;
              font-weight: 700;
              margin-bottom: 24px;
            }
            .divider {
              width: 180px;
              height: 4px;
              margin: 0 auto 34px;
              border-radius: 999px;
              background: linear-gradient(90deg, #6366f1, #ec4899, #f59e0b);
            }
            .subtitle {
              text-align: center;
              font-size: 24px;
              color: #4b5563;
              margin-bottom: 18px;
            }
            .student-name {
              text-align: center;
              font-size: 54px;
              color: #1f2937;
              font-weight: 700;
              margin: 18px 0 20px;
            }
            .name-line {
              width: 70%;
              margin: 0 auto 34px;
              border-bottom: 2px solid #d1d5db;
            }
            .body-text {
              text-align: center;
              font-size: 24px;
              line-height: 1.8;
              color: #374151;
              max-width: 900px;
              margin: 0 auto;
            }
            .course-title {
              display: inline-block;
              margin-top: 10px;
              font-size: 34px;
              font-weight: 700;
              color: #be185d;
            }
            .seal {
              position: absolute;
              right: 68px;
              top: 300px;
              width: 150px;
              height: 150px;
              border-radius: 50%;
              background: radial-gradient(circle at center, #fff 45%, #fbbf24 46%, #f59e0b 60%, #7c2d12 100%);
              box-shadow: 0 10px 25px rgba(0,0,0,0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: Arial, sans-serif;
              font-size: 22px;
              font-weight: 800;
              color: #7c2d12;
              text-align: center;
              line-height: 1.2;
              padding: 22px;
            }
            .footer {
              margin-top: 90px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 28px;
              align-items: end;
            }
            .footer-box {
              text-align: center;
              font-family: Arial, sans-serif;
            }
            .footer-label {
              font-size: 13px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              margin-bottom: 10px;
            }
            .footer-value {
              font-size: 22px;
              color: #111827;
              font-weight: 700;
            }
            .line {
              width: 100%;
              border-bottom: 2px solid #d1d5db;
              margin-bottom: 12px;
            }
            .signature {
              font-family: "Brush Script MT", cursive;
              font-size: 42px;
              color: #111827;
              margin-bottom: 8px;
            }
            .authority {
              font-size: 18px;
              color: #111827;
              font-weight: 700;
            }
            .authority-sub {
              font-size: 14px;
              color: #6b7280;
              margin-top: 4px;
            }
            .watermark {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              pointer-events: none;
              transform: rotate(-24deg);
              opacity: 0.05;
              font-size: 110px;
              font-weight: 800;
              color: #7c3aed;
              letter-spacing: 8px;
            }
          </style>
        </head>
        <body>
          <div class="certificate-wrapper">
            <div class="certificate">
              <div class="corner tl"></div>
              <div class="corner tr"></div>
              <div class="corner bl"></div>
              <div class="corner br"></div>

              <div class="watermark">FOSSEE</div>

              <div class="top-bar">
                <div class="brand">
                  <div class="brand-title">FOSSEE Workshops</div>
                  <div class="brand-subtitle">Certificate of Learning Achievement</div>
                </div>
                <div class="cert-id-chip">${certificateId}</div>
              </div>

              <div class="title-small">Certificate of</div>
              <div class="title-main">Completion</div>
              <div class="divider"></div>

              <div class="subtitle">This certificate is proudly awarded to</div>
              <div class="student-name">${userName}</div>
              <div class="name-line"></div>

              <div class="body-text">
                for successfully completing the workshop
                <br />
                <span class="course-title">${courseTitle}</span>
                <br /><br />
                and demonstrating dedication, consistency, and practical learning excellence
                through the FOSSEE Workshop Program.
              </div>

              <div class="seal">VERIFIED<br/>ACHIEVEMENT</div>

              <div class="footer">
                <div class="footer-box">
                  <div class="footer-label">Issue Date</div>
                  <div class="line"></div>
                  <div class="footer-value">${issueDate}</div>
                </div>

                <div class="footer-box">
                  <div class="signature">FOSSEE Team</div>
                  <div class="line"></div>
                  <div class="authority">Academic Coordinator</div>
                  <div class="authority-sub">FOSSEE Workshop Program</div>
                </div>

                <div class="footer-box">
                  <div class="footer-label">Certificate ID</div>
                  <div class="line"></div>
                  <div class="footer-value">${certificateId}</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([certificateHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const newWindow = window.open(url, "_blank");
    if (!newWindow) {
      toast.error("Popup blocked. Please allow popups to view the certificate.");
      return;
    }

    toast.success("Certificate opened successfully.");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-10 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-200/30 dark:bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/70 dark:bg-slate-800/70 border border-indigo-100 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Student Dashboard
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
            Welcome back, <span className="text-indigo-600 dark:text-indigo-400">{userName}</span>
          </h1>

          <p className="mt-2 text-gray-600 dark:text-slate-300 text-lg">
            Track your learning, assignments, progress, certificates, and workshop updates in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
            <p className="text-sm text-gray-500 dark:text-slate-400">Enrolled Workshops</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {enrolledCourses.length}
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
            <p className="text-sm text-gray-500 dark:text-slate-400">Completed Workshops</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {completedCourses.length}
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
            <p className="text-sm text-gray-500 dark:text-slate-400">Pending Assignments</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {pendingAssignments.length}
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
            <p className="text-sm text-gray-500 dark:text-slate-400">Overall Progress</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {totalProgress}%
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5">
                Enrolled Workshops
              </h2>

              <div className="space-y-5">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-gray-100 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 p-5 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
                          {course.professor}
                        </p>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                          📧 {course.professorEmail}
                        </p>
                      </div>

                      <button
                        onClick={() => downloadCertificate(course.title, course.progress)}
                        className={`px-4 py-2 rounded-xl font-semibold transition ${
                          course.progress >= 85
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Download Certificate
                      </button>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-slate-300">Progress</span>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {course.progress}%
                        </span>
                      </div>

                      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(
                            course.progress
                          )}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3">
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                          Pending Assignment
                        </p>
                        <p className="font-semibold text-gray-800 dark:text-white mt-1">
                          {course.assignment}
                        </p>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">
                        <p className="text-xs text-gray-500 dark:text-slate-400">Deadline</p>
                        <p className="font-semibold text-gray-800 dark:text-white mt-1">
                          {formatDate(course.deadline)}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3">
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                          Submission Status
                        </p>
                        <span
                          className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${course.statusColor}`}
                        >
                          {course.submissionStatus}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600 dark:text-slate-300">
                      📅 Next session:{" "}
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {formatDate(course.nextClass)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5">
                Completed Workshops
              </h2>

              {completedCourses.length === 0 ? (
                <p className="text-gray-600 dark:text-slate-300">
                  No completed workshops yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl p-4"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
                        {course.professor}
                      </p>
                      <p className="text-sm font-semibold text-green-700 dark:text-green-300 mt-2">
                        Completed: 100%
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5">
                Announcements
              </h2>

              <div className="space-y-4">
                {announcements.map((item) => (
                  <div
                    key={item.id}
                    className="border-l-4 border-indigo-500 bg-white/80 dark:bg-slate-800/80 rounded-xl p-4"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-300 mt-1">{item.desc}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">
                      {item.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="community"
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6"
            >
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5">
                Discussion Community
              </h2>

              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-100 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {post.name}
                      </h3>
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                        {post.course}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-slate-300 mt-2">{post.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.link}
                    className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 p-4 text-center hover:shadow-md transition"
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-white">
                      {action.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Progress Tracker
              </h2>

              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 dark:text-slate-300">{course.title}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getProgressBarColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Pending Work
              </h2>

              <div className="space-y-3">
                {pendingAssignments.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-100 dark:border-slate-700"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {course.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
                      {course.assignment}
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      Deadline: {formatDate(course.deadline)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Calendar View
              </h2>

              <div className="space-y-3">
                {upcomingCalendar.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl p-4 border border-gray-100 dark:border-slate-700"
                  >
                    <div className="min-w-[64px] rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-center py-2">
                      {item.date}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-slate-300 font-medium">
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Student Info
              </h2>
              <p className="text-gray-700 dark:text-white font-semibold">{userName}</p>
              <p className="text-gray-600 dark:text-slate-300 mt-1">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;