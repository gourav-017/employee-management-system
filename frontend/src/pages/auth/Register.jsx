import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

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

      await register(formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Register to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">
                First Name
              </label>

              <div className="relative mt-2">
                <User
                  className="absolute left-4 top-3.5 text-slate-400"
                  size={18}
                />

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full border rounded-xl py-3 pl-11 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Last Name
              </label>

              <div className="relative mt-2">
                <User
                  className="absolute left-4 top-3.5 text-slate-400"
                  size={18}
                />

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full border rounded-xl py-3 pl-11 outline-none focus:border-blue-600"
                />
              </div>
            </div>

          </div>

          <div>
            <label className="text-sm font-medium">
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
                placeholder="Username"
                required
                className="w-full border rounded-xl py-3 pl-11 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <div className="relative mt-2">
              <Mail
                className="absolute left-4 top-3.5 text-slate-400"
                size={18}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border rounded-xl py-3 pl-11 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
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
                placeholder="Password"
                required
                className="w-full border rounded-xl py-3 pl-11 pr-10 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                className="absolute right-4 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-1"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}