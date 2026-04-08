import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const userName = storedUser?.name || "Abhinav Saxena";
  const userEmail = storedUser?.email || "abhinav@example.com";

  const [isEditing, setIsEditing] = useState(false);

  const [userProfile, setUserProfile] = useState({
    fullName: userName,
    email: userEmail,
    phone: "+91 98765 43210",
    college: "Lakshmi Narain College of Technology, Bhopal",
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    year: "3rd Year",
    city: "Bhopal, India",
    joinedOn: "06 April 2026",
    enrolledWorkshops: 4,
    completedWorkshops: 1,
    certificatesEarned: 1,
    overallProgress: 64,
    github: "github.com/abhinav",
    linkedin: "linkedin.com/in/abhinav",
    bio: "Passionate AI/ML student focused on building practical skills through hands-on workshops, projects, and real-world learning experiences.",
    interests: ["Python", "Machine Learning", "Data Science", "OpenFOAM", "Scilab", "Arduino"],
    badges: ["Fast Learner", "Workshop Explorer", "1 Certificate Earned", "Active Participant"],
    recentActivities: [
      "Completed 87% of Introduction to Scilab",
      "Downloaded certificate for OpenFOAM for Beginners",
      "Submitted Data Mining report",
      "Joined discussion community for Machine Learning using Python",
    ],
    accountStatus: "Active",
    learningStreak: "12 days",
  });

  const [draftProfile, setDraftProfile] = useState(userProfile);

  const progressColor = useMemo(() => {
    if (userProfile.overallProgress < 25) return "bg-red-500";
    if (userProfile.overallProgress < 65) return "bg-yellow-500";
    return "bg-green-500";
  }, [userProfile.overallProgress]);

  const handleEditClick = () => {
    setDraftProfile(userProfile);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setDraftProfile(userProfile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...draftProfile,
      fullName: draftProfile.fullName.trim() || userProfile.fullName,
      phone: draftProfile.phone.trim(),
      college: draftProfile.college.trim(),
      degree: draftProfile.degree.trim(),
      year: draftProfile.year.trim(),
      city: draftProfile.city.trim(),
      github: draftProfile.github.trim(),
      linkedin: draftProfile.linkedin.trim(),
      bio: draftProfile.bio.trim(),
    };

    setUserProfile(updatedProfile);

    const updatedUserData = {
      ...(storedUser || {}),
      name: updatedProfile.fullName,
      email: updatedProfile.email,
    };

    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    setIsEditing(false);
    toast.success("Profile updated successfully ✨");
  };

  const renderField = (label, name, value, textarea = false, readOnly = false) => {
    if (isEditing && !readOnly) {
      return (
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1">
            {label}
          </p>
          {textarea ? (
            <textarea
              name={name}
              value={draftProfile[name]}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
            />
          ) : (
            <input
              type="text"
              name={name}
              value={draftProfile[name]}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300"
            />
          )}
        </div>
      );
    }

    return (
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">
          {label}
        </p>
        <p className="text-gray-900 dark:text-white font-semibold">{value}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-10 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-orange-200/30 dark:bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-xl p-6 md:p-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 via-pink-500 to-orange-400 text-white text-3xl font-black flex items-center justify-center shadow-lg">
                {userProfile.fullName
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-slate-600 shadow-sm mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {userProfile.accountStatus} Profile
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                  {userProfile.fullName}
                </h1>
                <p className="text-gray-600 dark:text-slate-300 mt-1">{userProfile.degree}</p>
                <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
                  {userProfile.college} • {userProfile.city}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="px-5 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 transition shadow-lg"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/workshops"
                className="px-5 py-3 rounded-2xl font-bold text-gray-800 dark:text-white bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:shadow-md transition"
              >
                Explore Workshops
              </Link>

              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="px-5 py-3 rounded-2xl font-bold text-indigo-700 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition shadow-sm"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-5 py-3 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-5 py-3 rounded-2xl font-bold text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:bg-gray-200 dark:hover:bg-slate-600 transition shadow-sm"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-5">
            <p className="text-sm text-gray-500 dark:text-slate-400">Enrolled</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {userProfile.enrolledWorkshops}
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-5">
            <p className="text-sm text-gray-500 dark:text-slate-400">Completed</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {userProfile.completedWorkshops}
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-5">
            <p className="text-sm text-gray-500 dark:text-slate-400">Certificates</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {userProfile.certificatesEarned}
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-5">
            <p className="text-sm text-gray-500 dark:text-slate-400">Learning Streak</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {userProfile.learningStreak}
            </h2>
          </div>

          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-5 col-span-2 lg:col-span-1">
            <p className="text-sm text-gray-500 dark:text-slate-400">Overall Progress</p>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
              {userProfile.overallProgress}%
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">About</h2>
              {renderField("Bio", "bio", userProfile.bio, true)}

              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
                  Overall Learning Progress
                </p>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${progressColor} transition-all duration-500`}
                    style={{ width: `${userProfile.overallProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  {renderField("Full Name", "fullName", userProfile.fullName)}
                  {renderField("Email", "email", userProfile.email, false, true)}
                  {renderField("Phone", "phone", userProfile.phone)}
                  {renderField("Location", "city", userProfile.city)}
                  {renderField("Joined On", "joinedOn", userProfile.joinedOn, false, true)}
                </div>
              </div>

              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                  Academic Information
                </h2>
                <div className="space-y-4">
                  {renderField("College", "college", userProfile.college)}
                  {renderField("Degree", "degree", userProfile.degree)}
                  {renderField("Year", "year", userProfile.year)}
                  {renderField("GitHub", "github", userProfile.github)}
                  {renderField("LinkedIn", "linkedin", userProfile.linkedin)}
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                Skills & Interests
              </h2>
              <div className="flex flex-wrap gap-3">
                {userProfile.interests.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-indigo-900/30 dark:to-pink-900/30 border border-indigo-100 dark:border-slate-600 text-gray-800 dark:text-white font-semibold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {userProfile.recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 rounded-2xl p-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 font-medium">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Achievement Badges
              </h2>
              <div className="space-y-3">
                {userProfile.badges.map((badge) => (
                  <div
                    key={badge}
                    className="rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-100 dark:border-yellow-800/40 p-4 flex items-center gap-3"
                  >
                    <div className="text-2xl">🏅</div>
                    <p className="font-semibold text-gray-800 dark:text-white">{badge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Account & Security
              </h2>
              <div className="space-y-4">
                <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">
                    Account Status
                  </p>
                  <p className="font-semibold text-green-600 dark:text-green-400 mt-1">
                    {userProfile.accountStatus}
                  </p>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">
                    Login Method
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white mt-1">
                    Email & Password
                  </p>
                </div>

                <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-400">
                    Primary Email
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white mt-1">
                    {userProfile.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Quick Links
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/dashboard"
                  className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 p-4 text-center hover:shadow-md transition"
                >
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    Dashboard
                  </div>
                </Link>

                <Link
                  to="/workshops"
                  className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 p-4 text-center hover:shadow-md transition"
                >
                  <div className="text-2xl mb-2">🎓</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    Workshops
                  </div>
                </Link>

                <Link
                  to="/dashboard"
                  className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 p-4 text-center hover:shadow-md transition"
                >
                  <div className="text-2xl mb-2">📁</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    Assignments
                  </div>
                </Link>

                <Link
                  to="/dashboard"
                  className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 p-4 text-center hover:shadow-md transition"
                >
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    Certificates
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700 shadow-lg p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                Contact Summary
              </h2>
              <p className="text-gray-700 dark:text-slate-300">
                <span className="font-semibold">Email:</span> {userProfile.email}
              </p>
              <p className="text-gray-700 dark:text-slate-300 mt-2">
                <span className="font-semibold">Phone:</span> {userProfile.phone}
              </p>
              <p className="text-gray-700 dark:text-slate-300 mt-2">
                <span className="font-semibold">City:</span> {userProfile.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;