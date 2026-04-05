import { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../Sidebar/DashboardLayout";
import { ownerLinks } from "../Sidebar/SidebarLinks";

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings/owner");
      setBookings(res.data);
    } catch (err) { console.log(err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}`, { status });
      fetchBookings();
    } catch (err) { console.log(err); }
  };

  const statusColor = { accepted: "#10b981", rejected: "#ef4444", pending: "#f59e0b" };
  const statusBg = { accepted: "rgba(16,185,129,0.1)", rejected: "rgba(239,68,68,0.1)", pending: "rgba(245,158,11,0.1)" };

  return (
    <DashboardLayout links={ownerLinks}>
      <div style={{ maxWidth: 800 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
            Manage
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            Booking Requests
          </h1>
        </div>

        {bookings.length === 0 ? (
          <div style={{
            padding: "60px 40px", textAlign: "center",
            background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 16, color: "#475569"
          }}>
            <p style={{ fontSize: 15, fontWeight: 500 }}>No booking requests yet</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {bookings.filter(b => b.propertyId && b.studentId).map((b) => (
              <div key={b._id} style={{
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: `1px solid ${b.status === "pending" ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 14, padding: "24px 28px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: 20
              }}>
                {/* Left */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9" }}>
                      {b.propertyId?.name ?? "Deleted Property"}
                    </h2>
                    <span style={{
                      padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: 0.5,
                      color: statusColor[b.status], background: statusBg[b.status]
                    }}>
                      {b.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    <div>
                      <p style={{ fontSize: 11, color: "#475569", fontWeight: 500, marginBottom: 2 }}>LOCATION</p>
                      <p style={{ fontSize: 13, color: "#94a3b8" }}>{b.propertyId?.location ?? "N/A"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: "#475569", fontWeight: 500, marginBottom: 2 }}>STUDENT</p>
                      <p style={{ fontSize: 13, color: "#94a3b8" }}>{b.studentId?.name ?? "Deleted User"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: "#475569", fontWeight: 500, marginBottom: 2 }}>EMAIL</p>
                      <p style={{ fontSize: 13, color: "#94a3b8" }}>{b.studentId?.email ?? "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                {b.status === "pending" && (
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => updateStatus(b._id, "accepted")}
                      style={{
                        padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                        color: "#10b981", background: "rgba(16,185,129,0.1)",
                        border: "1px solid rgba(16,185,129,0.3)", cursor: "pointer", transition: "all 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.2)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.1)"}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(b._id, "rejected")}
                      style={{
                        padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                        color: "#ef4444", background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.3)", cursor: "pointer", transition: "all 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default OwnerBookings;