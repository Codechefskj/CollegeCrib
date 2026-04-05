import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function Sidebar({ links }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen flex flex-col" style={{
      background: "linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%)",
      borderRight: "1px solid rgba(255,255,255,0.06)"
    }}>
      {/* Logo */}
      <div className="px-8 py-8">
        <div className="flex items-center gap-2">
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <span style={{
            fontSize: 18, fontWeight: 700, letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #fff, #94a3b8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            CollegeCrib
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 24px" }} />

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((item, index) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px", borderRadius: 10,
                fontSize: 14, fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "#64748b",
                background: active ? "rgba(59,130,246,0.15)" : "transparent",
                borderLeft: active ? "2px solid #3b82f6" : "2px solid transparent",
                textDecoration: "none", transition: "all 0.2s ease"
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "transparent"; } }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-8">
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 16 }} />
        <button
          onClick={handleLogout}
          style={{
            width: "100%", padding: "10px 16px", borderRadius: 10,
            fontSize: 14, fontWeight: 500, color: "#ef4444",
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
            cursor: "pointer", textAlign: "left", transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;