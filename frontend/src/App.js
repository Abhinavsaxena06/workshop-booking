import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import SkeletonLoader from './components/SkeletonLoader';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Workshops = lazy(() => import('./pages/Workshops')); 
const BookWorkshop = lazy(() => import('./pages/BookWorkshop'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar />

        <main className="pb-28 min-h-screen">
          <Suspense fallback={<SkeletonLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/book/:id" element={<BookWorkshop />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;