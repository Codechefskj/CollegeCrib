import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";

import ProtectedRoute from "../routes/ProtectedRoute";

import StudentDashboard from "../features/dashboard/StudentDashboard";
import OwnerDashboard from "../features/dashboard/OwnerDashboard";
import OwnerProperties from "../features/dashboard/ownercomponents/OwnerProperties";

import AddProperty from "../features/dashboard/ownercomponents/AddProperty";

import RoommateForm from "../features/dashboard/Studentcomponents/RoommateForm";
import RoommateMatches from "../features/dashboard/Studentcomponents/RoommateMatches";

import FindPG from "../features/dashboard/Studentcomponents/FindPG";

import OwnerBookings from "../features/dashboard/ownercomponents/OwnerBookings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* STUDENT ROUTES */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/roommate"
            element={
              <ProtectedRoute>
                <RoommateForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/matches"
            element={
              <ProtectedRoute>
                <RoommateMatches />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/find-pg"
            element={
              <ProtectedRoute>
                <FindPG />
              </ProtectedRoute>
            }
          />

          {/* OWNER ROUTES */}
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/add-property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/properties"
            element={
              <ProtectedRoute>
                <OwnerProperties />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/bookings"
            element={
              <ProtectedRoute>
                <OwnerBookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;