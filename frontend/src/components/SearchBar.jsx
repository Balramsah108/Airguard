import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, Loader, MapPin } from "lucide-react";
import { searchStations } from "../utils/api";

// Common Indian cities for quick access
const QUICK_CITIES = [
  "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore",
  "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
];

export default function SearchBar({ onSearch, loading, currentLocation }) {
  const [query,       setQuery]       = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [sugLoading,  setSugLoading]  = useState(false);
  const [showSug,     setShowSug]     = useState(false);
  const debounceRef = useRef(null);
  const inputRef    = useRef(null);
  const containerRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSug(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const fetchSuggestions = useCallback(async (q) => {
    if (q.length < 2) { setSuggestions([]); return; }
    setSugLoading(true);
    try {
      const results = await searchStations(q);
      setSuggestions(results.slice(0, 6));
    } catch {
      setSuggestions([]);
    } finally {
      setSugLoading(false);
    }
  }, []);

  function handleInput(e) {
    const val = e.target.value;
    setQuery(val);
    setShowSug(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 350);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const loc = query.trim();
    if (!loc) return;
    setShowSug(false);
    onSearch(loc);
  }

  function handleSelect(name) {
    setQuery(name);
    setShowSug(false);
    onSearch(name);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") { setShowSug(false); inputRef.current?.blur(); }
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Search form */}
      <form onSubmit={handleSubmit} ref={containerRef} style={{ position: "relative" }}>
        <div style={{
          display:      "flex",
          alignItems:   "center",
          background:   "var(--bg-secondary)",
          border:       "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding:      "4px 4px 4px 16px",
          gap:          "8px",
          boxShadow:    "var(--shadow)",
          transition:   "border-color 0.2s"
        }}
          onFocus={() => query.length >= 2 && setShowSug(true)}
        >
          <Search size={18} color="var(--text-muted)" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setShowSug(true)}
            placeholder="Search any city or area in India…"
            aria-label="Search for a location"
            autoComplete="off"
            style={{
              flex:        1,
              background:  "transparent",
              border:      "none",
              outline:     "none",
              color:       "var(--text-primary)",
              fontSize:    "16px",
              padding:     "8px 0"
            }}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            aria-label="Search"
            style={{
              background:    loading ? "var(--border)" : "var(--accent-green)",
              border:        "none",
              borderRadius:  "8px",
              padding:       "10px 20px",
              color:         "#ffffff",
              fontSize:      "14px",
              fontWeight:    "600",
              display:       "flex",
              alignItems:    "center",
              gap:           "6px",
              opacity:       (!query.trim() && !loading) ? 0.5 : 1,
              cursor:        loading || !query.trim() ? "not-allowed" : "pointer",
              transition:    "background 0.2s, opacity 0.2s",
              minWidth:      "100px",
              justifyContent: "center"
            }}
          >
            {loading
              ? <><Loader size={14} className="spinning" /> Fetching…</>
              : <>Check AQI</>
            }
          </button>
        </div>

        {/* Autocomplete dropdown */}
        {showSug && (suggestions.length > 0 || sugLoading) && (
          <div
            role="listbox"
            aria-label="Station suggestions"
            style={{
              position:     "absolute",
              top:          "calc(100% + 4px)",
              left:         0,
              right:        0,
              background:   "var(--bg-secondary)",
              border:       "1px solid var(--border)",
              borderRadius: "var(--radius)",
              overflow:     "hidden",
              zIndex:       50,
              boxShadow:    "var(--shadow)"
            }}
          >
            {sugLoading && (
              <div style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "13px" }}>
                Searching stations…
              </div>
            )}
            {suggestions.map((s, i) => (
              <button
                key={s.uid || i}
                role="option"
                onClick={() => handleSelect(s.name)}
                style={{
                  width:          "100%",
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "10px",
                  padding:        "11px 16px",
                  background:     "transparent",
                  border:         "none",
                  borderBottom:   i < suggestions.length - 1 ? "1px solid var(--border)" : "none",
                  color:          "var(--text-primary)",
                  fontSize:       "14px",
                  textAlign:      "left",
                  cursor:         "pointer"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <MapPin size={13} color="var(--text-muted)" />
                <span style={{ flex: 1 }}>{s.name}</span>
                {s.aqi && (
                  <span style={{
                    fontSize: "12px",
                    color:    s.aqi <= 100 ? "#10b981" : s.aqi <= 200 ? "#f59e0b" : "#ef4444",
                    fontWeight: "600"
                  }}>
                    AQI {s.aqi}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Quick city buttons */}
      {!currentLocation && (
        <div style={{ marginTop: "14px" }}>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
            Quick select:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {QUICK_CITIES.map(city => (
              <button
                key={city}
                onClick={() => { setQuery(city); onSearch(city); }}
                style={{
                  background:   "var(--bg-secondary)",
                  border:       "1px solid var(--border)",
                  borderRadius: "20px",
                  padding:      "5px 14px",
                  color:        "var(--text-muted)",
                  fontSize:     "13px",
                  cursor:       "pointer",
                  transition:   "all 0.15s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--accent-green)";
                  e.currentTarget.style.color = "var(--accent-green)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
