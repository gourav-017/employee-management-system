import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(formData);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          error?.response?.data?.non_field_errors?.[0] ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to Employee Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}

          <div>
            <label className="text-sm font-medium text-slate-700">
              Username
            </label>

            <div className="relative mt-2">
              <User
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-600"
                required
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border rounded-xl py-3 pl-11 pr-11 outline-none focus:border-blue-600"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}