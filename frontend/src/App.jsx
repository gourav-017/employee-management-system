import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";

import AddEmployee from "./pages/employess/AddEmployee";
import EditEmployee from "./pages/employess/EditEmployee";
import ViewEmployee from "./pages/employess/ViewEmployee";
import EmployeeList from "./pages/employess/EmployeeList";
import ProtectedRoute from "./middleware/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>} />

          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
        </ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute>
            <EmployeeList />
        </ProtectedRoute>} />
          <Route path="/employees/add" element={ <ProtectedRoute>
            <AddEmployee />
        </ProtectedRoute>} />
          <Route path="/employees/edit/:id" element={ <ProtectedRoute>
            <EditEmployee />
        </ProtectedRoute>} />
          <Route path="/employees/view/:id" element={ <ProtectedRoute>
            <ViewEmployee />
        </ProtectedRoute>} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;