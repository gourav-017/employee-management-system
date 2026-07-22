import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

import {
  getEmployee,
  updateEmployee,
} from "../../api/employee.api";

export default function EditEmployee() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const data = await getEmployee(id);

      setFormData({
        employee_id: data.employee_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        department: data.department,
        designation: data.designation,
        salary: data.salary,
        joining_date: data.joining_date,
        status: data.status,
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateEmployee(id, formData);

      alert("Employee Updated Successfully.");

      navigate("/employees");

    } catch (error) {

      console.error(error);

      alert("Update Failed.");

    } finally {

      setSaving(false);

    }

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Edit Employee
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
        className="bg-white shadow rounded-xl p-6"
      >

        <div className="grid grid-cols-2 gap-5">

          <div>
            <label>Employee ID</label>

            <input
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>First Name</label>

            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Last Name</label>

            <input
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Department</label>

            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border rounded-lg w-full p-3 mt-1"
            />
          </div>

          <div>
            <label>Designation</label>

            <input
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
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <Save size={18} />

            {saving ? "Updating..." : "Update Employee"}

          </button>

        </div>

      </form>

    </div>
  );
}