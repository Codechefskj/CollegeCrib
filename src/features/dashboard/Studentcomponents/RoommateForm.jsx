import DashboardLayout from "../Sidebar/DashboardLayout";
import { studentLinks } from "../Sidebar/SidebarLinks";
import axios from "../../../services/axiosInstance";
import { useState } from "react";

// Each question maps to the same backend key, but now has a real question + real options
const sections = [
  {
    title: "🌙 Sleep & Schedule",
    color: "#6366f1",
    fields: [
      {
        key: "sleepTime",
        question: "When do you usually go to sleep?",
        options: ["Before 10 PM", "10 PM – Midnight", "Midnight – 2 AM", "After 2 AM"],
      },
      {
        key: "wakeUp",
        question: "When do you usually wake up?",
        options: ["Before 6 AM", "6 AM – 8 AM", "8 AM – 10 AM", "After 10 AM"],
      },
      {
        key: "study",
        question: "When do you prefer to study?",
        options: ["Early morning", "Daytime", "Evening", "Late night"],
      },
      {
        key: "workType",
        question: "What are you primarily focused on?",
        options: ["Full-time student", "Part-time job + college", "Full-time job", "Freelance / own work"],
      },
    ],
  },
  {
    title: "🍽️ Food & Kitchen",
    color: "#f59e0b",
    fields: [
      {
        key: "food",
        question: "What is your diet preference?",
        options: ["Strictly vegetarian", "Mostly vegetarian", "Non-vegetarian", "Vegan"],
      },
      {
        key: "cooking",
        question: "How often do you cook at home?",
        options: ["Never – I order/eat out", "Rarely", "A few times a week", "Daily"],
      },
      {
        key: "kitchenSharing",
        question: "Are you okay sharing the kitchen?",
        options: ["Prefer my own kitchen", "Okay occasionally", "Fine with sharing", "Happy to cook together"],
      },
    ],
  },
  {
    title: "🚬 Habits",
    color: "#ef4444",
    fields: [
      {
        key: "smoking",
        question: "Do you smoke?",
        options: ["No, and prefer smoke-free home", "No, but okay if outside", "Occasionally", "Yes, regularly"],
      },
      {
        key: "drinking",
        question: "Do you drink alcohol?",
        options: ["Never", "Rarely / social only", "Occasionally at home", "Regularly"],
      },
      {
        key: "substance",
        question: "Are you okay with substance use in the flat?",
        options: ["Absolutely not", "Only if outside", "Okay occasionally", "No preference"],
      },
    ],
  },
  {
    title: "🧹 Cleanliness",
    color: "#10b981",
    fields: [
      {
        key: "cleanliness",
        question: "How clean do you keep shared spaces?",
        options: ["Very relaxed", "Fairly tidy", "Quite clean", "Spotless at all times"],
      },
      {
        key: "cleaningFreq",
        question: "How often should the flat be cleaned?",
        options: ["Monthly is fine", "Every 2 weeks", "Weekly", "Multiple times a week"],
      },
      {
        key: "organization",
        question: "How organized are you?",
        options: ["I like organized chaos", "Somewhat organized", "Pretty organized", "Extremely organized"],
      },
    ],
  },
  {
    title: "🎉 Social Life",
    color: "#8b5cf6",
    fields: [
      {
        key: "guests",
        question: "How often do you have guests over?",
        options: ["Rarely or never", "Once in a while", "A few times a week", "Almost every day"],
      },
      {
        key: "partying",
        question: "Do you host parties or social gatherings?",
        options: ["Never", "Occasionally on weekends", "Fairly often", "All the time"],
      },
      {
        key: "noise",
        question: "What noise level are you comfortable with at home?",
        options: ["Very quiet please", "Low background noise okay", "Moderate noise is fine", "Lively and loud is fine"],
      },
    ],
  },
  {
    title: "❤️ Personal & Privacy",
    color: "#ec4899",
    fields: [
      {
        key: "relationship",
        question: "Will your partner/significant other visit often?",
        options: ["No partner / never", "Rarely visits", "Sometimes stays over", "Stays over frequently"],
      },
      {
        key: "genderPref",
        question: "Do you have a gender preference for roommates?",
        options: ["Same gender only", "Prefer same gender", "No preference", "Any gender is fine"],
      },
      {
        key: "privacy",
        question: "How much personal privacy do you need?",
        options: ["Very private – minimal interaction", "Somewhat private", "Happy to hang out sometimes", "Love socializing with roommates"],
      },
    ],
  },
  {
    title: "🐶 Pets",
    color: "#f97316",
    fields: [
      {
        key: "petsAllowed",
        question: "Are you okay with pets in the flat?",
        options: ["No pets at all", "Small pets only (fish, hamster)", "Cats are okay", "Any pets are fine"],
      },
      {
        key: "petOwner",
        question: "Do you own or plan to get a pet?",
        options: ["No, never", "Not now but maybe later", "I have a small pet", "I have a dog/cat"],
      },
    ],
  },
  {
    title: "🌡️ Room Environment",
    color: "#06b6d4",
    fields: [
      {
        key: "ac",
        question: "How do you feel about using AC?",
        options: ["Prefer no AC / windows open", "AC occasionally", "AC often", "AC on almost always"],
      },
      {
        key: "temperature",
        question: "What room temperature do you prefer?",
        options: ["Cool (below 20°C)", "Mild (20–23°C)", "Warm (23–26°C)", "Hot (above 26°C)"],
      },
    ],
  },
  {
    title: "📱 Daily Habits",
    color: "#3b82f6",
    fields: [
      {
        key: "music",
        question: "Do you play music/audio out loud at home?",
        options: ["Never – always headphones", "Rarely", "Sometimes", "Often / always"],
      },
      {
        key: "screenTime",
        question: "How much time do you spend on screens at home?",
        options: ["Minimal", "A few hours", "Most of the day", "Almost all day"],
      },
      {
        key: "studyDiscipline",
        question: "How strict are you about a quiet study environment?",
        options: ["Don't need silence at all", "A little quiet helps", "Need reasonable quiet", "Need complete silence"],
      },
    ],
  },
];

function RoommateForm() {
  const [form, setForm] = useState(
    Object.fromEntries(
      sections.flatMap((s) => s.fields.map((f) => [f.key, 0]))
    )
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSelect = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await axios.post("/roommate", { answers: form });
      setSuccess("Preferences saved! We'll find your best matches.");
    } catch (err) {
      setError("Failed to save preferences. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout links={studentLinks}>
      <div style={{ maxWidth: 700 }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>
            Matching
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            Roommate Preferences
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", marginTop: 8 }}>
            Answer honestly — we use this to find your most compatible roommates.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {sections.map(({ title, color, fields }) => (
            <div
              key={title}
              style={{
                background: "linear-gradient(135deg, #111827, #0f1923)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "24px 28px",
              }}
            >
              {/* Section Title */}
              <p style={{
                fontSize: 13, fontWeight: 700, color, marginBottom: 20,
                letterSpacing: 0.3,
              }}>
                {title}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {fields.map(({ key, question, options }) => (
                  <div key={key}>
                    {/* Question */}
                    <p style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500, marginBottom: 10 }}>
                      {question}
                    </p>

                    {/* Options as pill buttons */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {options.map((label, idx) => {
                        const selected = form[key] === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelect(key, idx)}
                            style={{
                              padding: "7px 14px",
                              borderRadius: 999,
                              fontSize: 13,
                              fontWeight: 500,
                              border: selected
                                ? `1.5px solid ${color}`
                                : "1.5px solid rgba(255,255,255,0.1)",
                              background: selected
                                ? `${color}22`
                                : "rgba(255,255,255,0.03)",
                              color: selected ? color : "#94a3b8",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!selected) {
                                e.currentTarget.style.borderColor = `${color}66`;
                                e.currentTarget.style.color = "#cbd5e1";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!selected) {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.color = "#94a3b8";
                              }
                            }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Messages */}
          {error && (
            <div style={{
              padding: "10px 14px", borderRadius: 8,
              background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171", fontSize: 13,
            }}>{error}</div>
          )}
          {success && (
            <div style={{
              padding: "10px 14px", borderRadius: 8,
              background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
              color: "#34d399", fontSize: 13,
            }}>{success}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "13px", borderRadius: 10, fontSize: 14, fontWeight: 600,
              color: "white",
              background: loading ? "#1e3a5f" : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {loading && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                style={{ animation: "spin 0.7s linear infinite" }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
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