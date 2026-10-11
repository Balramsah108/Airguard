import React from "react";

const STATS = [
  { value: "140M+", label: "people in India breathe hazardous air daily", icon: "🫁" },
  { value: "847",   label: "days Delhi AQI was in Poor or worse in 2023", icon: "📊" },
  { value: "3.5Cr", label: "school children have no air quality alerts", icon: "🏫" },
  { value: "2M",    label: "deaths per year in India due to air pollution (WHO)", icon: "⚠️" }
];

const FEATURED_CITIES = [
  { name: "Delhi",      reason: "National Capital", emoji: "🏛️" },
  { name: "Mumbai",     reason: "Financial Capital", emoji: "🏙️" },
  { name: "Kolkata",    reason: "Cultural Capital", emoji: "🎭" },
  { name: "Bangalore",  reason: "Tech Hub", emoji: "💻" },
  { name: "Chennai",    reason: "Gateway to South", emoji: "🌴" },
  { name: "Hyderabad",  reason: "Pearl City", emoji: "💎" }
];

export default function EmptyState({ onCitySelect }) {
  return (
    <div className="fade-in" style={{ marginTop: "40px", textAlign: "center" }}>
      {/* Hero */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌬️</div>
        <h2 style={{
          fontSize:    "28px",
          fontWeight:  "800",
          color:       "var(--text-primary)",
          marginBottom: "12px",
          lineHeight:  "1.3"
        }}>
          Should I send my child to school today?
        </h2>
        <p style={{
          fontSize:   "16px",
          color:      "var(--text-muted)",
          maxWidth:   "520px",
          margin:     "0 auto 20px",
          lineHeight: "1.7"
        }}>
          Every morning in Delhi, Mumbai, Kolkata — parents ask this question when AQI crosses 250.
          <br />
          <strong style={{ color: "var(--text-primary)" }}>AirGuard answers it.</strong>
        </p>
        <div style={{
          background:   "rgba(16,185,129,0.08)",
          border:       "1px solid rgba(16,185,129,0.2)",
          borderRadius: "8px",
          padding:      "12px 20px",
          maxWidth:     "500px",
          margin:       "0 auto",
          fontSize:     "14px",
          color:        "var(--text-primary)",
          lineHeight:   "1.6"
        }}>
          Real-time AQI + <strong style={{ color: "#a78bfa" }}>AI-powered health advice</strong> (Amazon Bedrock) + Email alerts when air quality drops — personalized for children, elderly, asthma patients.
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap:                 "16px",
        maxWidth:            "600px",
        margin:              "0 auto 40px",
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            background:   "var(--bg-secondary)",
            border:       "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding:      "20px 16px",
            transition:   "transform 0.2s, border-color 0.2s",
            cursor:       "default"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.borderColor = "#ef4444";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{s.icon}</div>
            <p style={{
              fontSize:    "32px",
              fontWeight:  "900",
              color:       "#ef4444",
              marginBottom: "6px"
            }}>
              {s.value}
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* AWS badge */}
      <div style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "8px",
        background:     "var(--bg-secondary)",
        border:         "1px solid var(--border)",
        borderRadius:   "8px",
        padding:        "8px 16px",
        fontSize:       "12px",
        color:          "var(--text-muted)",
        marginBottom:   "32px"
      }}>
        <span style={{ color: "#ff9900", fontWeight: "700" }}>AWS</span>
        Powered by Lambda · API Gateway · DynamoDB · Bedrock · SNS · Amplify
      </div>

      {/* Featured Indian Cities */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{
          fontSize:    "18px",
          fontWeight:  "700",
          color:       "var(--text-primary)",
          marginBottom: "16px",
          textAlign:   "center"
        }}>
          🇮🇳 Check Air Quality in Major Indian Cities
        </h3>
        <p style={{
          fontSize:     "13px",
          color:        "var(--text-muted)",
          marginBottom: "16px",
          textAlign:    "center"
        }}>
          Click any city to get instant AQI, AI health advice, and alert signup
        </p>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap:                 "10px",
          maxWidth:            "700px",
          margin:              "0 auto"
        }}>
          {FEATURED_CITIES.map((city, i) => (
            <div
              key={i}
              onClick={() => onCitySelect && onCitySelect(city.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onCitySelect && onCitySelect(city.name);
                }
              }}
              style={{
                background:   "var(--bg-secondary)",
                border:       "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding:      "14px 12px",
                textAlign:    "center",
                cursor:       "pointer",
                transition:   "all 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.borderColor = "var(--accent-green)";
                e.currentTarget.style.background = "rgba(16,185,129,0.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-secondary)";
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "4px" }}>{city.emoji}</div>
              <p style={{
                fontSize:   "15px",
                fontWeight: "600",
                color:      "var(--text-primary)",
                marginBottom: "2px"
              }}>
                {city.name}
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                {city.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
