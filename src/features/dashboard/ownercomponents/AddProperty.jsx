import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OwnerSidebar from "./OwnerSidebar";

function AddProperty() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("rooms", rooms);
    formData.append("price", price);
    if (image) formData.append("image", image);
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://collegecrib-backend.onrender.com/api/property", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      setSuccess("Property Added Successfully");
      navigate("/owner/properties");
    } catch (error) {
      setError(error.response?.data?.message || "Error uploading property");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10, fontSize: 14,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
    color: "#f1f5f9", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s"
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080b12", color: "white" }}>
      <OwnerSidebar />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{
          width: "100%", maxWidth: 520,
          background: "linear-gradient(135deg, #111827, #0f1923)",
          border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 40
        }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
              New Listing
            </p>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
              Add Property
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#94a3b8", marginBottom: 8, letterSpacing: 0.5 }}>
                PROPERTY IMAGE
              </label>
              <label
                style={{
                  display: "block", borderRadius: 12, overflow: "hidden", cursor: "pointer",
                  border: `1px dashed ${dragOver ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.12)"}`,
                  background: dragOver ? "rgba(59,130,246,0.04)" : "transparent",
                  transition: "border-color 0.2s, background 0.2s"
                }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }
                }}
              >
                {preview ? (
                  <img src={preview} alt="preview" style={{ width: "100%", height: 160, objectFit: "cover" }} />
                ) : (
                  <div style={{
                    height: 120, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 8,
                    color: dragOver ? "#3b82f6" : "#475569", background: "rgba(255,255,255,0.02)"
                  }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span style={{ fontSize: 13 }}>{dragOver ? "Drop image here" : "Click to upload image"}</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </label>
            </div>

            {/* Fields */}
            {[
              { label: "PROPERTY NAME", value: name, setter: setName, type: "text", placeholder: "e.g. Sunrise PG Dwarka" },
              { label: "LOCATION", value: location, setter: setLocation, type: "text", placeholder: "e.g. Dwarka, New Delhi" },
              { label: "AVAILABLE ROOMS", value: rooms, setter: setRooms, type: "number", placeholder: "e.g. 5" },
              { label: "MONTHLY RENT (₹)", value: price, setter: setPrice, type: "number", placeholder: "e.g. 8000" },
            ].map((field) => (
              <div key={field.label} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#64748b", marginBottom: 8, letterSpacing: 1 }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  placeholder={field.placeholder}
                  style={inputStyle}
                  onChange={(e) => field.setter(e.target.value)}
                  onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                  required
                />
              </div>
            ))}

            {/* UI-only: replaces alert() */}
            {error && (
              <div style={{
                marginBottom: 16, padding: "10px 14px", borderRadius: 8,
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171", fontSize: 13
              }}>{error}</div>
            )}
            {success && (
              <div style={{
                marginBottom: 16, padding: "10px 14px", borderRadius: 8,
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                color: "#34d399", fontSize: 13
              }}>{success}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px", borderRadius: 10, fontSize: 14,
                fontWeight: 600, color: "white", cursor: loading ? "not-allowed" : "pointer",
                background: loading ? "#1e3a5f" : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                border: "none", marginTop: 8, transition: "opacity 0.2s", opacity: loading ? 0.7 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}
            >
              {loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                  style={{ animation: "spin 0.7s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </svg>
              )}
              {loading ? "Uploading..." : "Upload Property"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;