import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  getEmployees,
  deleteEmployee,
} from "../../api/employee.api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==============================
  // Fetch Employees
  // ==============================

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();

      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ==============================
  // Search
  // ==============================

  useEffect(() => {
    const value = search.toLowerCase();

    const filtered = employees.filter((employee) => {
      return (
        employee.employee_id.toLowerCase().includes(value) ||
        employee.first_name.toLowerCase().includes(value) ||
        employee.last_name.toLowerCase().includes(value) ||
        employee.email.toLowerCase().includes(value) ||
        employee.department.toLowerCase().includes(value)
      );
    });

    setFilteredEmployees(filtered);
  }, [search, employees]);

  // ==============================
  // Delete Employee
  // ==============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      fetchEmployees();

      alert("Employee deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  };

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2
          className="animate-spin text-blue-600"
          size={40}
        />
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Employees
          </h1>

          <p className="text-gray-500">
            Manage all employees
          </p>

        </div>

        <Link
          to="/employees/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Employee
        </Link>

      </div>

      {/* Search */}

      <div className="relative mb-5">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg w-full pl-10 py-3 outline-none focus:border-blue-500"
        />

      </div>

      {/* Empty */}

      {filteredEmployees.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-10 text-center">

          <h2 className="text-xl font-semibold">
            No Employees Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first employee.
          </p>

        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left">Employee ID</th>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Department</th>

                <th className="p-4 text-left">Designation</th>

                <th className="p-4 text-left">Salary</th>

                <th className="p-4 text-center">Status</th>

                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.map((employee) => (

                <tr
                  key={employee.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-4">
                    {employee.employee_id}
                  </td>

                  <td className="p-4 font-medium">
                    {employee.first_name} {employee.last_name}
                  </td>

                  <td className="p-4">
                    {employee.email}
                  </td>

                  <td className="p-4">
                    {employee.department}
                  </td>

                  <td className="p-4">
                    {employee.designation}
                  </td>

                  <td className="p-4">
                    ₹ {employee.salary}
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${employee.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {employee.status ? "Active" : "Inactive"}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/employees/view/${employee.id}`}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        to={`/employees/edit/${employee.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}