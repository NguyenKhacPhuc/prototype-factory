import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { User, AuthError } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

let cachedUser: User | null = null;
let initialized = false;
const listeners = new Set<(user: User | null) => void>();

function notifyAll(user: User | null) {
  cachedUser = user;
  for (const fn of listeners) fn(user);
}

// Initialize auth listener once — onAuthStateChange must be set up first
// so it catches the SIGNED_IN event from URL hash detection
if (!initialized) {
  initialized = true;
  supabase.auth.onAuthStateChange((_event, session) => {
    notifyAll(session?.user ?? null);
  });
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: cachedUser,
    loading: !initialized || cachedUser === null && !initialized,
    error: null,
  });

  useEffect(() => {
    const handler = (user: User | null) => {
      setState({ user, loading: false, error: null });
    };
    listeners.add(handler);
    // Sync with current cached value
    if (cachedUser !== state.user) {
      setState((s) => ({ ...s, user: cachedUser, loading: false }));
    }
    return () => { listeners.delete(handler); };
  }, []);

  const setError = (err: AuthError | null) => {
    if (err) setState((s) => ({ ...s, error: err.message, loading: false }));
  };

  const signIn = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error);
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (error) setError(error);
  }, []);

  const signInWithOAuth = useCallback(async (provider: "google" | "github") => {
    setState((s) => ({ ...s, error: null }));
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setError(error);
    } else if (data?.url) {
      window.location.href = data.url;
    } else {
      const name = provider.charAt(0).toUpperCase() + provider.slice(1);
      setState((s) => ({ ...s, loading: false, error: `${name} sign-in is not configured yet. Please use email/password.` }));
    }
  }, []);

  const signOut = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { error } = await supabase.auth.signOut();
    if (error) setError(error);
  }, []);

  const updateProfile = useCallback(async (data: { display_name?: string }) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { error } = await supabase.auth.updateUser({ data });
    if (error) setError(error);
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return { ...state, signIn, signUp, signInWithOAuth, signOut, updateProfile, clearError };
}
