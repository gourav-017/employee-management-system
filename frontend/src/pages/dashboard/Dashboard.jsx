export default function Dashboard() {

  return (

    <div>

      <h1 className="text-3xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="text-slate-500 mt-2">
        Employee Management Dashboard
      </p>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500">

            Employees

          </h2>

          <h1 className="text-4xl font-bold mt-3">

            0

          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500">

            Departments

          </h2>

          <h1 className="text-4xl font-bold mt-3">

            0

          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500">

            Attendance

          </h2>

          <h1 className="text-4xl font-bold mt-3">

            0

          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-gray-500">

            Leaves

          </h2>

          <h1 className="text-4xl font-bold mt-3">

            0

          </h1>

        </div>

      </div>

    </div>

  );

}