import { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../Sidebar/DashboardLayout";
import { studentLinks } from "../Sidebar/SidebarLinks";

function FindPG() {
  const [pgs, setPgs] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });
  const [fetchLoading, setFetchLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => { fetchPGs(); }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const fetchPGs = async () => {
    setFetchLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`/property?${query}`);
      setPgs(res.data);
    } catch (err) { console.log(err); }
    finally { setFetchLoading(false); }
  };

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleBook = async (id) => {
    setBookingId(id);
    try {
      await axios.post("/bookings", { propertyId: id });
      showToast("Booked successfully", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Booking failed", "error");
    } finally {
      setBookingId(null);
    }
  };

  const inputStyle = {
    padding: "10px 14px", borderRadius: 8, fontSize: 13,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    color: "#f1f5f9", outline: "none", minWidth: 160
  };

  return (
    <DashboardLayout links={studentLinks}>
      <div style={{ maxWidth: 1100, position: "relative" }}>

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

        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
            Browse
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            Find PG
          </h1>
        </div>

        {/* Filters */}
        <div style={{
          background: "linear-gradient(135deg, #111827, #0f1923)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14, padding: "20px 24px",
          display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end",
          marginBottom: 32
        }}>
          <div>
            <p style={{ fontSize: 11, color: "#475569", fontWeight: 500, marginBottom: 6, letterSpacing: 0.5 }}>LOCATION</p>
            <input
              type="text" name="location" placeholder="e.g. Dwarka"
              value={filters.location} onChange={handleChange} style={inputStyle}
              onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
            />
          </div>
          <div>
            <p style={{ fontSize: 11, color: "#475569", fontWeight: 500, marginBottom: 6, letterSpacing: 0.5 }}>MIN PRICE</p>
            <input
              type="number" name="minPrice" placeholder="0"
              value={filters.minPrice} onChange={handleChange} style={inputStyle}
              onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
            />
          </div>
          <div>
            <p style={{ fontSize: 11, color: "#475569", fontWeight: 500, marginBottom: 6, letterSpacing: 0.5 }}>MAX PRICE</p>
            <input
              type="number" name="maxPrice" placeholder="50000"
              value={filters.maxPrice} onChange={handleChange} style={inputStyle}
              onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
            />
          </div>
          <button
            onClick={fetchPGs}
            style={{
              padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              color: "white", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
              opacity: fetchLoading ? 0.7 : 1, transition: "opacity 0.2s"
            }}
          >
            {fetchLoading && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                style={{ animation: "spin 0.7s linear infinite" }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </svg>
            )}
            Search
          </button>
        </div>

        {/* UI-only: skeleton while loading */}
        {fetchLoading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
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

        {/* UI-only: empty state */}
        {!fetchLoading && pgs.length === 0 && (
          <div style={{
            padding: "60px 40px", textAlign: "center",
            background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 16, color: "#475569"
          }}>
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px" }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            </svg>
            <p style={{ fontSize: 15, fontWeight: 500 }}>No PGs found</p>
            <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</p>
          </div>
        )}

        {/* Cards */}
        {!fetchLoading && pgs.length > 0 && (
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
                    <div style={{ height: "100%", background: "#1a2332", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569" }}>
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
                </div>

                <div style={{ padding: "18px 18px 20px" }}>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: "#f1f5f9", marginBottom: 4 }}>{pg.name}</h2>
                  <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>{pg.location}</p>
                  <p style={{ fontSize: 12, color: "#475569", marginBottom: 16 }}>{pg.rooms} rooms available</p>
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

export default FindPG;