import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../services/axiosInstance";
import { AuthContext } from "../../context/AuthContext";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", form);
      login(res.data.token);
      const payload = JSON.parse(atob(res.data.token.split(".")[1]));
      if (payload.role === "student") navigate("/student/dashboard");
      else if (payload.role === "owner") navigate("/owner/dashboard");
      else navigate("/admin-dashboard");
    } catch {
      setError("Signup Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    color: "#f1f5f9", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
  };

  const roles = [
    { value: "student", label: "Student", desc: "Looking for a PG" },
    { value: "owner", label: "Owner", desc: "Listing a property" },
  ];

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 80% 20%, #0f1729 0%, #080b12 60%, #000 100%)",
      padding: 24, position: "relative", overflow: "hidden"
    }}>
      {/* Background glows */}
      <div style={{
        position: "absolute", top: "10%", right: "10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "rgba(59,130,246,0.06)", filter: "blur(80px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "5%",
        width: 300, height: 300, borderRadius: "50%",
        background: "rgba(16,185,129,0.04)", filter: "blur(60px)", pointerEvents: "none"
      }} />

      <div style={{
        width: "100%", maxWidth: 460,
        background: "linear-gradient(135deg, rgba(17,24,39,0.95), rgba(15,25,35,0.95))",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20, padding: "44px 40px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <span style={{
            fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px",
            background: "linear-gradient(135deg, #fff, #94a3b8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            CollegeCrib
          </span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px", marginBottom: 6 }}>
            Create account
          </h2>
          <p style={{ fontSize: 14, color: "#64748b" }}>
            Join thousands finding their perfect PG
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Role selector */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
              I am a
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {roles.map((r) => (
                <div
                  key={r.value}
                  onClick={() => {
                    setForm({ ...form, role: r.value });
                    if (error) setError("");
                  }}
                  style={{
                    padding: "12px 16px", borderRadius: 10, cursor: "pointer",
                    border: `1px solid ${form.role === r.value ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.08)"}`,
                    background: form.role === r.value ? "rgba(59,130,246,0.1)" : "rgba(255,255,255,0.03)",
                    transition: "all 0.2s"
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 600, color: form.role === r.value ? "#3b82f6" : "#94a3b8", marginBottom: 2 }}>
                    {r.label}
                  </p>
                  <p style={{ fontSize: 11, color: "#475569" }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fields */}
          {[
            { name: "name", label: "FULL NAME", type: "text", placeholder: "John Doe" },
            { name: "email", label: "EMAIL", type: "email", placeholder: "you@example.com" },
            { name: "password", label: "PASSWORD", type: "password", placeholder: "••••••••" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
            </div>
          ))}

          {/* Error message */}
          {error && (
            <div style={{
              marginBottom: 16, padding: "10px 14px", borderRadius: 8,
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171", fontSize: 13
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "13px", borderRadius: 10, fontSize: 14,
              fontWeight: 600, color: "white", cursor: loading ? "not-allowed" : "pointer",
              background: loading ? "#1e3a5f" : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              border: "none", marginTop: 10, transition: "opacity 0.2s", opacity: loading ? 0.7 : 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {loading && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                style={{ animation: "spin 0.7s linear infinite" }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </svg>
            )}
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "28px 0" }} />

        <p style={{ textAlign: "center", fontSize: 14, color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#3b82f6", fontWeight: 500, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;