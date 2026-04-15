import StudentSidebar from "./StudentSidebar";

function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <StudentSidebar />

      {/* Content */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}

export default StudentLayout;