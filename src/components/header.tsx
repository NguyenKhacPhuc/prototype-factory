import React from "react";

interface HeaderProps {
  navigate: (to: string) => void;
  currentPath: string;
}

export function Header({ navigate, currentPath }: HeaderProps) {
  const link = (to: string, label: string) => (
    <a
      href={to}
      className={`nav-link ${currentPath === to ? "active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {label}
    </a>
  );

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="/"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <span className="logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="8" height="8" rx="2" />
              <rect x="13" y="3" width="8" height="8" rx="2" opacity="0.6" />
              <rect x="3" y="13" width="8" height="8" rx="2" opacity="0.6" />
              <rect x="13" y="13" width="8" height="8" rx="2" opacity="0.3" />
            </svg>
          </span>
          <span className="logo-text">Appdex</span>
        </a>
        <nav className="nav">
          {link("/", "Discover")}
          {link("/gallery", "Gallery")}
          {link("/about", "About")}
        </nav>
      </div>
    </header>
  );
}
