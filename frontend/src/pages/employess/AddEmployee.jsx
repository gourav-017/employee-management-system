import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { createEmployee } from "../../api/employee.api";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joining_date: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.employee_id ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.designation ||
      !formData.salary ||
      !formData.joining_date
    ) {
      return alert("Please fill all required fields.");
    }

    try {
      setLoading(true);

      await createEmployee(formData);

      alert("Employee Added Successfully.");

      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("Unable to create employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Add Employee
        </h1>

        <button
          onClick={() => navigate("/employees")}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6"
      >

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label>Employee ID</label>

            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>First Name</label>

            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Last Name</label>

            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Department</label>

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Designation</label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Salary</label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Joining Date</label>

            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div className="flex items-center gap-3 mt-8">

            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />

            <label>Active Employee</label>

          </div>

        </div>

        <div className="mt-8">

          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Save size={18} />

            {loading ? "Saving..." : "Save Employee"}
          </button>

        </div>

      </form>

    </div>
  );
}