import { Link, useLocation } from "react-router-dom";

function OwnerSidebar() {
  const location = useLocation();

  const navLinks = [
    { to: "/owner/dashboard", label: "Dashboard" },
    { to: "/owner/add-property", label: "Add Property" },
    { to: "/owner/properties", label: "My Properties" },
  ];

  return (
    <div className="w-64 bg-[#020617] p-6 border-r border-gray-800 min-h-screen" style={{ display: "flex", flexDirection: "column" }}>
      <h2 className="text-2xl font-bold mb-10 text-blue-400">CollegeCrib</h2>

      <nav className="space-y-6" style={{ flex: 1 }}>
        {navLinks.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: "block", padding: "8px 12px", borderRadius: 8,
                textDecoration: "none", fontSize: 14, fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "#d1d5db",
                background: active ? "rgba(59,130,246,0.15)" : "transparent",
                borderLeft: `2px solid ${active ? "#3b82f6" : "transparent"}`,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = "#d1d5db"; }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="text-red-400 hover:text-red-600"
        style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
      >
        Logout
      </button>
    </div>
  );
}

export default OwnerSidebar;