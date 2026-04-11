import React from "react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>Every great app started as an idea someone was brave enough to prototype.</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 12 }}>
          <a href="https://ko-fi.com/steve31" target="_blank" rel="noopener" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 14px", borderRadius: 8,
            background: "rgba(255,95,95,0.1)", border: "1px solid rgba(255,95,95,0.2)",
            color: "#FF5F5F", fontSize: 13, fontWeight: 600, textDecoration: "none",
          }}>
            ☕ Support on Ko-fi
          </a>
        </div>
        <p className="footer-sub">&copy; {new Date().getFullYear()} Appdex</p>
      </div>
    </footer>
  );
}
