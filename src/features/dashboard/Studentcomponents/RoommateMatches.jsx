import { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../Sidebar/DashboardLayout";
import { studentLinks } from "../Sidebar/SidebarLinks";

function RoommateMatches() {
  const [matches, setMatches] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => { fetchMatches(); }, []);

  const fetchMatches = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get("/roommate/matches");
      setMatches(res.data);
    } catch (err) { console.log(err); }
    finally { setFetchLoading(false); }
  };

  return (
    <DashboardLayout links={studentLinks}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
            Matching
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            Top Roommate Matches
          </h2>
        </div>

        {/* UI-only: skeleton while loading */}
        {fetchLoading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: 120, borderRadius: 14,
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: "1px solid rgba(255,255,255,0.07)",
                animation: "pulse 1.5s ease-in-out infinite"
              }}>
                <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
              </div>
            ))}
          </div>
        )}

        {/* UI-only: empty state */}
        {!fetchLoading && matches.length === 0 && (
          <div style={{
            padding: "60px 40px", textAlign: "center",
            background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 16, color: "#475569"
          }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>No matches found yet</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Fill in your roommate preferences first</p>
          </div>
        )}

        {/* Match cards */}
        {!fetchLoading && matches.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {matches.map((m, i) => (
              <div
                key={i}
                style={{
                  background: "linear-gradient(135deg, #111827, #0f1923)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14, padding: "24px 28px",
                  transition: "transform 0.2s, border-color 0.2s"
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                {/* Top Section */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {/* Avatar + Rank */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: i === 0 ? "linear-gradient(135deg, #f59e0b, #d97706)"
                        : i === 1 ? "linear-gradient(135deg, #94a3b8, #64748b)"
                        : "linear-gradient(135deg, #b45309, #92400e)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, fontWeight: 700, color: "white", flexShrink: 0
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9", marginBottom: 2 }}>
                        {m.name || `Match #${i + 1}`}
                      </p>
                      <p style={{ fontSize: 13, color: "#64748b" }}>Compatible Roommate</p>
                    </div>
                  </div>

                  {/* Match % */}
                  <div style={{
                    fontSize: 22, fontWeight: 700,
                    color: m.match >= 80 ? "#10b981" : m.match >= 60 ? "#f59e0b" : "#ef4444"
                  }}>
                    {m.match}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 8 }}>
                    <div style={{
                      height: 8, borderRadius: 99,
                      background: m.match >= 80
                        ? "linear-gradient(90deg, #10b981, #34d399)"
                        : m.match >= 60
                        ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                        : "linear-gradient(90deg, #ef4444, #f87171)",
                      width: `${m.match}%`,
                      transition: "width 0.6s ease"
                    }} />
                  </div>
                </div>

                {/* Extra Info */}
                <div style={{ marginTop: 12, fontSize: 13, color: "#475569" }}>
                  Based on lifestyle, habits & preferences match
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default RoommateMatches;