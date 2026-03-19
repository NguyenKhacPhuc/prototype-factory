import React, { useState, useEffect } from "react";

interface HeaderProps {
  navigate: (to: string) => void;
  currentPath: string;
}

function AuthModal({ mode, onClose, onSwitch }: { mode: "signin" | "signup"; onClose: () => void; onSwitch: () => void }) {
  const isSignUp = mode === "signup";

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>&times;</button>
        <div className="auth-header">
          <h2>{isSignUp ? "Create your account" : "Welcome back"}</h2>
          <p>{isSignUp ? "Join Appdex to save and create prototypes" : "Sign in to your Appdex account"}</p>
        </div>

        <div className="auth-social">
          <button className="auth-social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button className="auth-social-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {isSignUp && (
            <div className="auth-field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" placeholder={isSignUp ? "Create a password" : "Enter your password"} />
          </div>
          {!isSignUp && (
            <button type="button" className="auth-forgot">Forgot password?</button>
          )}
          <button type="submit" className="auth-submit">
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          {" "}
          <button type="button" onClick={onSwitch}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export function Header({ navigate, currentPath }: HeaderProps) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });
  const [authModal, setAuthModal] = useState<"signin" | "signup" | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

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
    <>
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
            {link("/create", "Create")}
            {link("/about", "About")}
          </nav>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
            <button className="btn-signin" onClick={() => setAuthModal("signin")}>Sign In</button>
            <button className="btn-signup" onClick={() => setAuthModal("signup")}>Sign Up</button>
          </div>
        </div>
      </header>
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitch={() => setAuthModal(authModal === "signin" ? "signup" : "signin")}
        />
      )}
    </>
  );
}
