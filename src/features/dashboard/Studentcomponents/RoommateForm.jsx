import DashboardLayout from "../Sidebar/DashboardLayout";
import { studentLinks } from "../Sidebar/SidebarLinks";
import axios from "../../../services/axiosInstance";
import { useState } from "react";

function RoommateForm() {
  const [form, setForm] = useState({
    sleepTime: 1, wakeUp: 1, study: 1, workType: 1,
    food: 1, cooking: 1, kitchenSharing: 1,
    smoking: 1, drinking: 1, substance: 1,
    cleanliness: 1, cleaningFreq: 1, organization: 1,
    guests: 1, partying: 1, noise: 1,
    relationship: 1, genderPref: 1, privacy: 1,
    petsAllowed: 1, petOwner: 1,
    ac: 1, temperature: 1,
    music: 1, screenTime: 1, studyDiscipline: 1
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: Number(e.target.value) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await axios.post("/roommate", { answers: form });
      setSuccess("Profile Saved");
    } catch (err) {
      setError("Failed to save preferences. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sections = {
    "Lifestyle": ["sleepTime", "wakeUp", "study", "workType"],
    "Food & Kitchen": ["food", "cooking", "kitchenSharing"],
    "Habits": ["smoking", "drinking", "substance"],
    "Cleanliness": ["cleanliness", "cleaningFreq", "organization"],
    "Social Life": ["guests", "partying", "noise"],
    "Personal": ["relationship", "genderPref", "privacy"],
    "Pets": ["petsAllowed", "petOwner"],
    "Room Environment": ["ac", "temperature"],
    "Daily Habits": ["music", "screenTime", "studyDiscipline"]
  };

  const formatLabel = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());

  return (
    <DashboardLayout links={studentLinks}>
      <div style={{ maxWidth: 680 }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
            Matching
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            Roommate Preferences
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>
            Fill out your preferences to find compatible roommates
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(sections).map(([section, fields]) => (
            <div key={section} style={{
              background: "linear-gradient(135deg, #111827, #0f1923)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "24px 28px"
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: "#3b82f6", textTransform: "uppercase", marginBottom: 18 }}>
                {section}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                {fields.map((key) => (
                  <div key={key}>
                    <label style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>
                      {formatLabel(key)}
                    </label>
                    <select
                      name={key}
                      value={form[key]}
                      onChange={handleChange}
                      style={{
                        width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 13,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                        color: "#f1f5f9", outline: "none", cursor: "pointer", transition: "border-color 0.2s"
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(59,130,246,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                    >
                      <option value={0}>Low</option>
                      <option value={1}>Medium</option>
                      <option value={2}>High</option>
                      <option value={3}>Very High</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* UI-only: replaces alert() */}
          {error && (
            <div style={{
              padding: "10px 14px", borderRadius: 8,
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171", fontSize: 13
            }}>{error}</div>
          )}
          {success && (
            <div style={{
              padding: "10px 14px", borderRadius: 8,
              background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
              color: "#34d399", fontSize: 13
            }}>{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              color: "white", background: loading ? "#1e3a5f" : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            {loading && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                style={{ animation: "spin 0.7s linear infinite" }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </svg>
            )}
            {loading ? "Saving..." : "Save Preferences"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default RoommateForm;