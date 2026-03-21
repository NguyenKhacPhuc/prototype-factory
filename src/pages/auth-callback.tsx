import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Props {
  navigate: (to: string) => void;
}

export function AuthCallback({ navigate }: Props) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;

    // Check for error in hash
    if (hash && hash.includes("error")) {
      const params = new URLSearchParams(hash.substring(1));
      setError(params.get("error_description") || "Authentication failed");
      return;
    }

    // Let Supabase process the hash tokens, then redirect with a full reload
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setError(error.message);
        return;
      }
      if (data.session) {
        // Full page redirect to ensure clean state
        window.location.replace("/");
        return;
      }
      // If no session yet, try setting it from hash
      if (hash && hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        if (accessToken && refreshToken) {
          supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
            .then(({ error }) => {
              if (error) setError(error.message);
              else window.location.replace("/");
            });
          return;
        }
      }
      // Fallback
      setTimeout(() => window.location.replace("/"), 2000);
    });
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div className={error ? "error-state" : "loading"}>
        {error || "Completing sign in..."}
      </div>
    </div>
  );
}
