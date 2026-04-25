import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApiKeys from "./pages/Dashboard/ApiKeys";
import Usage from "./pages/Dashboard/Usage";
import Billing from "./pages/Dashboard/Billing";
import Success from "./pages/Success";
import ApiPlayground from "./pages/ApiPlayground";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/playground" element={<ApiPlayground />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/keys"
          element={
            <ProtectedRoute>
              <ApiKeys />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usage"
          element={
            <ProtectedRoute>
              <Usage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;