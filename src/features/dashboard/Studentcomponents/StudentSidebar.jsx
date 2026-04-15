import { Link } from "react-router-dom";

function StudentSidebar() {
  return (
    <div className="w-64 bg-[#020617] p-6 min-h-screen">

      <h2 className="text-2xl text-blue-400 font-bold mb-10">
        PG Finder
      </h2>

      <nav className="space-y-6">

        <Link to="/student/dashboard" className="block text-gray-300 hover:text-white">
          Dashboard
        </Link>

        <Link to="/student/roommate" className="block text-gray-300 hover:text-white">
          Roommate Form
        </Link>

        <Link to="/student/matches" className="block text-gray-300 hover:text-white">
          Matches
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="text-red-400"
        >
          Logout
        </button>

      </nav>

    </div>
  );
}

export default StudentSidebar;