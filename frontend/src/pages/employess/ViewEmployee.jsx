import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Loader2,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Calendar,
  IndianRupee,
  User,
} from "lucide-react";

import { getEmployee } from "../../api/employee.api";

export default function ViewEmployee() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchEmployee();

  }, []);

  const fetchEmployee = async () => {

    try {

      const data = await getEmployee(id);

      setEmployee(data);

    } catch (error) {

      console.log(error);

      alert("Unable to load employee.");

    } finally {

      setLoading(false);

    }

  };

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

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">

          Employee Details

        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/employees")}
            className="border px-4 py-2 rounded-lg flex items-center gap-2"
          >

            <ArrowLeft size={18} />

            Back

          </button>

          <button
            onClick={() => navigate(`/employees/edit/${employee.id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >

            <Pencil size={18} />

            Edit

          </button>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">

            {employee.first_name.charAt(0)}

          </div>

          <div>

            <h2 className="text-3xl font-bold">

              {employee.first_name} {employee.last_name}

            </h2>

            <p className="text-gray-500">

              {employee.designation}

            </p>

            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                employee.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {employee.status ? "Active" : "Inactive"}
            </span>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div className="flex items-center gap-3">

            <User />

            <div>

              <p className="text-gray-500">

                Employee ID

              </p>

              <h4>{employee.employee_id}</h4>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Mail />

            <div>

              <p className="text-gray-500">

                Email

              </p>

              <h4>{employee.email}</h4>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Phone />

            <div>

              <p className="text-gray-500">

                Phone

              </p>

              <h4>{employee.phone}</h4>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Building2 />

            <div>

              <p className="text-gray-500">

                Department

              </p>

              <h4>{employee.department}</h4>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Briefcase />

            <div>

              <p className="text-gray-500">

                Designation

              </p>

              <h4>{employee.designation}</h4>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <IndianRupee />

            <div>

              <p className="text-gray-500">

                Salary

              </p>

              <h4>₹ {employee.salary}</h4>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Calendar />

            <div>

              <p className="text-gray-500">

                Joining Date

              </p>

              <h4>{employee.joining_date}</h4>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}