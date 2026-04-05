import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import DashboardLayout from "../dashboard/Sidebar/DashboardLayout";
import { studentLinks } from "../dashboard/Sidebar/SidebarLinks";

function StudentDashboard() {
  const [pgs, setPgs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    Promise.all([fetchPGs(), fetchNotifications()]).finally(() => setFetchLoading(false));
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const fetchPGs = async () => {
    try { const res = await axios.get("/property"); setPgs(res.data); }
    catch (err) { console.log(err); }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/bookings/student");
      setNotifications(res.data.filter(b => b.notification && b.notification !== ""));
    } catch (err) { console.log(err); }
  };

  const dismissNotification = (id) => setNotifications(prev => prev.filter(n => n._id !== id));

  const handleBook = async (id) => {
    setBookingId(id);
    try {
      await axios.post("/bookings", { propertyId: id });
      showToast("Booking request sent to owner", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Booking failed", "error");
    } finally {
      setBookingId(null);
    }
  };

  return (
    <DashboardLayout links={studentLinks}>
      <div style={{ maxWidth: 1200, position: "relative" }}>

        {/* UI-only: toast notification */}
        {toast.show && (
          <div style={{
            position: "fixed", top: 24, right: 24, zIndex: 100,
            padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500,
            background: toast.type === "success" ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
            border: `1px solid ${toast.type === "success" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
            color: toast.type === "success" ? "#34d399" : "#f87171",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
          }}>
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
            Welcome back
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            Student Dashboard
          </h1>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>
              Notifications
            </p>
            {notifications.map((n) => (
              <div key={n._id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 20px", borderRadius: 12,
                background: n.status === "accepted" ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
                border: `1px solid ${n.status === "accepted" ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: n.status === "accepted" ? "#10b981" : "#ef4444",
                    flexShrink: 0
                  }} />
                  <span style={{ fontSize: 14, color: "#e2e8f0" }}>{n.notification}</span>
                </div>
                <button
                  onClick={() => dismissNotification(n._id)}
                  style={{
                    padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                    color: "#64748b", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PG listings label */}
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#64748b", textTransform: "uppercase", marginBottom: 20 }}>
          Available PGs
        </p>

        {/* UI-only: skeleton while loading */}
        {fetchLoading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                height: 300, borderRadius: 16,
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: "1px solid rgba(255,255,255,0.07)",
                animation: "pulse 1.5s ease-in-out infinite"
              }}>
                <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
              </div>
            ))}
          </div>
        )}

        {!fetchLoading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {pgs.map((pg) => (
              <div key={pg._id} style={{
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, overflow: "hidden", transition: "transform 0.2s, border-color 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div style={{ position: "relative", height: 180 }}>
                  {pg.image ? (
                    <img src={pg.image} alt="pg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "100%", background: "#1a2332", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", fontSize: 13 }}>
                      No Image
                    </div>
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,18,0.85) 0%, transparent 60%)" }} />
                  <div style={{
                    position: "absolute", bottom: 12, left: 14,
                    background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)",
                    borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600, color: "#10b981"
                  }}>
                    ₹{pg.price?.toLocaleString()}/mo
                  </div>
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: "rgba(0,0,0,0.5)", borderRadius: 6, padding: "2px 8px",
                    fontSize: 11, color: "#94a3b8"
                  }}>
                    {pg.rooms} rooms left
                  </div>
                </div>

                <div style={{ padding: "18px 18px 20px" }}>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9", marginBottom: 4 }}>{pg.name}</h2>
                  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{pg.location}</p>
                  <button
                    onClick={() => handleBook(pg._id)}
                    disabled={bookingId === pg._id}
                    style={{
                      width: "100%", padding: "10px", borderRadius: 8, fontSize: 13,
                      fontWeight: 600, color: "white", cursor: bookingId === pg._id ? "not-allowed" : "pointer",
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      border: "none", transition: "opacity 0.2s",
                      opacity: bookingId === pg._id ? 0.7 : 1,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                    }}
                    onMouseEnter={e => { if (bookingId !== pg._id) e.currentTarget.style.opacity = "0.85"; }}
                    onMouseLeave={e => e.currentTarget.style.opacity = bookingId === pg._id ? "0.7" : "1"}
                  >
                    {bookingId === pg._id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                        style={{ animation: "spin 0.7s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                      </svg>
                    )}
                    {bookingId === pg._id ? "Booking..." : "Book Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;