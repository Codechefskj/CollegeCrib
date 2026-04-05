import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import DashboardLayout from "./Sidebar/DashboardLayout";
import { ownerLinks } from "./Sidebar/SidebarLinks";
import OwnerPropertyList from "./ownercomponents/OwnerPropertyList";

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get("/property/my");
      setProperties(res.data);
    } catch (error) {
      console.log("Properties error:", error.response?.data || error.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/bookings/owner");
      setBookings(res.data);
    } catch (error) {
      console.log("Bookings error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    Promise.all([fetchProperties(), fetchBookings()]).finally(() => setFetchLoading(false));
  }, []);

  const revenue = bookings
    .filter((b) => b.status === "accepted")
    .reduce((sum, b) => sum + (b.propertyId?.price || 0), 0);

  const stats = [
    { label: "Total Properties", value: properties.length, color: "#3b82f6", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      </svg>
    )},
    { label: "Total Bookings", value: bookings.length, color: "#8b5cf6", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )},
    { label: "Revenue", value: `₹${revenue.toLocaleString()}`, color: "#10b981", icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    )},
  ];

  return (
    <DashboardLayout links={ownerLinks}>
      <div>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
            Overview
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            Owner Dashboard
          </h1>
        </div>

        {/* UI-only: skeleton stats while loading */}
        {fetchLoading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                height: 120, borderRadius: 16,
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: "1px solid rgba(255,255,255,0.07)",
                animation: "pulse 1.5s ease-in-out infinite"
              }}>
                <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "28px 32px",
                position: "relative", overflow: "hidden",
                transition: "border-color 0.2s, transform 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}44`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  width: 80, height: 80, borderRadius: "50%",
                  background: s.color, opacity: 0.08
                }} />
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${s.color}22`, color: s.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16
                }}>
                  {s.icon}
                </div>
                <p style={{ fontSize: 12, color: "#64748b", fontWeight: 500, marginBottom: 6, letterSpacing: 0.5 }}>
                  {s.label}
                </p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Properties */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, color: "#64748b", textTransform: "uppercase", marginBottom: 20 }}>
            Your Properties
          </p>
          {fetchLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {[1, 2].map(i => (
                <div key={i} style={{
                  height: 280, borderRadius: 16,
                  background: "linear-gradient(135deg, #111827, #0f1923)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animation: "pulse 1.5s ease-in-out infinite"
                }} />
              ))}
            </div>
          ) : (
            <OwnerPropertyList properties={properties} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OwnerDashboard;