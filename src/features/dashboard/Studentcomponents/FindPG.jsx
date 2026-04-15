import { useEffect, useState, useCallback } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../Sidebar/DashboardLayout";
import { studentLinks } from "../Sidebar/SidebarLinks";

function FindPG() {
  const [pgs, setPgs] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });
  const [fetchLoading, setFetchLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const fetchPGs = useCallback(async () => {
    setFetchLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`/property?${query}`);
      setPgs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetchLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPGs();
  }, [fetchPGs]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

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
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 13,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#f1f5f9",
    outline: "none",
    minWidth: 160
  };

  return (
    <DashboardLayout links={studentLinks}>
      <div style={{ maxWidth: 1100, position: "relative" }}>

        {/* Toast */}
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
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6" }}>
            Browse
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9" }}>
            Find PG
          </h1>
        </div>

        {/* Filters */}
        <div style={{
          background: "linear-gradient(135deg, #111827, #0f1923)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14,
          padding: "20px 24px",
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 32
        }}>
          <input name="location" placeholder="Location" value={filters.location} onChange={handleChange} style={inputStyle} />
          <input name="minPrice" type="number" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} style={inputStyle} />
          <input name="maxPrice" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} style={inputStyle} />

          <button onClick={fetchPGs} style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "#3b82f6",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}>
            Search
          </button>
        </div>

        {/* Loading */}
        {fetchLoading && <p style={{ color: "white" }}>Loading...</p>}

        {/* Empty */}
        {!fetchLoading && pgs.length === 0 && (
          <p style={{ color: "#aaa" }}>No PGs found</p>
        )}

        {/* Cards */}
        {!fetchLoading && pgs.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
            {pgs.map(pg => (
              <div key={pg._id} style={{
                background: "#111827",
                padding: 16,
                borderRadius: 10
              }}>
                <h3 style={{ color: "white" }}>{pg.name}</h3>
                <p style={{ color: "#aaa" }}>{pg.location}</p>
                <p style={{ color: "#10b981" }}>₹{pg.price}</p>

                <button
                  onClick={() => handleBook(pg._id)}
                  disabled={bookingId === pg._id}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    padding: 8,
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: 6
                  }}
                >
                  {bookingId === pg._id ? "Booking..." : "Book"}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

export default FindPG;