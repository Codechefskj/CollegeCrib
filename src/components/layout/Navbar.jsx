import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 32px", height: 60,
      background: "rgba(8,11,18,0.95)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 50
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22" fill="none" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        <span style={{
          fontSize: 16, fontWeight: 700, letterSpacing: "-0.3px",
          background: "linear-gradient(135deg, #fff, #94a3b8)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          CollegeCrib
        </span>
      </div>

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate("/"); }}
        style={{
          padding: "7px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
          color: "#ef4444", background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer",
          transition: "all 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.16)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Navbar;