import React from "react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>Every great app started as an idea someone was brave enough to prototype.</p>
        <p className="footer-sub">&copy; {new Date().getFullYear()} Appdex</p>
      </div>
    </footer>
  );
}
