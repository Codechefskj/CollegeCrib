import { useState, useEffect } from "react";
import axios from "axios";

function OwnerPropertyList({ properties = [] }) {
  const [propertyList, setPropertyList] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => { setPropertyList(properties); }, [properties]);

  const deleteProperty = async (id) => {
    setDeletingId(id);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`https://collegecrib-backend.onrender.com/api/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message);
      setPropertyList(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      setError("Delete failed");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (propertyList.length === 0) {
    return (
      <div style={{
        padding: "60px 40px", textAlign: "center",
        background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)",
        borderRadius: 16, color: "#475569"
      }}>
        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px" }}>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        </svg>
        <p style={{ fontSize: 15, fontWeight: 500 }}>No properties uploaded yet</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>Add your first property to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* UI-only: inline error instead of alert */}
      {error && (
        <div style={{
          marginBottom: 16, padding: "10px 14px", borderRadius: 8,
          background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          color: "#f87171", fontSize: 13
        }}>{error}</div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {propertyList.map((property) => (
          <div key={property._id} style={{
            background: "linear-gradient(135deg, #111827, #0f1923)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, overflow: "hidden",
            transition: "transform 0.2s, border-color 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <div style={{ position: "relative", height: 180 }}>
              <img
                src={property.image || "https://via.placeholder.com/400x200/111827/475569?text=No+Image"}
                alt={property.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(8,11,18,0.9) 0%, transparent 60%)"
              }} />
              <div style={{
                position: "absolute", bottom: 14, left: 16,
                background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)",
                borderRadius: 6, padding: "3px 10px", fontSize: 13, fontWeight: 600, color: "#10b981"
              }}>
                ₹{property.price?.toLocaleString()}/mo
              </div>
            </div>

            <div style={{ padding: "20px 20px 20px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#f1f5f9", marginBottom: 6 }}>
                {property.name}
              </h3>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                {property.location}
              </p>

              {/* UI-only: confirm UI instead of window.confirm */}
              {confirmId === property._id ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => deleteProperty(property._id)}
                    disabled={deletingId === property._id}
                    style={{
                      flex: 1, padding: "8px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                      color: "white", background: "#ef4444", border: "none",
                      cursor: deletingId === property._id ? "not-allowed" : "pointer",
                      opacity: deletingId === property._id ? 0.7 : 1, transition: "opacity 0.2s"
                    }}
                  >
                    {deletingId === property._id ? "Deleting..." : "Confirm Delete"}
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    style={{
                      flex: 1, padding: "8px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                      color: "#94a3b8", background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(property._id)}
                  style={{
                    padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                    color: "#ef4444", background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", transition: "all 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default OwnerPropertyList;