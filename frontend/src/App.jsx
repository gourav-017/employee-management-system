import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;