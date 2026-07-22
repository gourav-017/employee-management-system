import { User, Mail, BadgeInfo } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">

      <div className="flex items-center gap-5">

        <div className="h-24 w-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
          {user?.first_name
            ? user.first_name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {user?.first_name} {user?.last_name}
          </h1>

          <p className="text-slate-500">
            Employee Profile
          </p>
        </div>

      </div>

      <div className="mt-10 space-y-6">

        <div className="flex items-center gap-4 border rounded-xl p-4">

          <User className="text-blue-600" size={22} />

          <div>
            <p className="text-sm text-slate-500">
              Username
            </p>

            <p className="font-semibold text-lg">
              {user?.username}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 border rounded-xl p-4">

          <Mail className="text-blue-600" size={22} />

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="font-semibold text-lg">
              {user?.email}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 border rounded-xl p-4">

          <BadgeInfo className="text-blue-600" size={22} />

          <div>
            <p className="text-sm text-slate-500">
              Full Name
            </p>

            <p className="font-semibold text-lg">
              {user?.first_name} {user?.last_name}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}