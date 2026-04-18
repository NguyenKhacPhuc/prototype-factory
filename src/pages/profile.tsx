import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useFavorites } from "../hooks/use-favorites";
import { usePrototypes } from "../hooks/use-prototypes";
import { PrototypeCard } from "../components/prototype-card";
import { supabase } from "../lib/supabase";

interface Props {
  navigate: (to: string) => void;
}

export function Profile({ navigate }: Props) {
  const { user, loading, updateProfile, signOut } = useAuth();
  const { favorites } = useFavorites(user?.id ?? null);
  const { prototypes } = usePrototypes();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [myJobs, setMyJobs] = useState<any[]>([]);

  // Load user's build history
  useEffect(() => {
    if (user) {
      supabase.from('generation_jobs')
        .select('id, type, status, input, result, created_at, estimated_cost_cents')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)
        .then(({ data }) => setMyJobs(data || []));
    }
  }, [user]);

  if (loading) {
    return <div className="profile-page"><div className="loading">Loading...</div></div>;
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <h2>Sign in to view your profile</h2>
          <button className="btn-primary" onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();
  const favoriteProtos = prototypes.filter((p) =>
    favorites.some((f) => f.prototype_folder === p.folder)
  );

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ display_name: name });
    setSaving(false);
    setEditing(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-details">
          {editing ? (
            <div className="profile-edit-row">
              <input
                className="profile-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display name"
                autoFocus
              />
              <button className="btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div className="profile-name-row">
              <h1>{displayName}</h1>
              <button
                className="btn-ghost btn-sm"
                onClick={() => { setName(displayName); setEditing(true); }}
              >
                Edit
              </button>
            </div>
          )}
          <p className="profile-email">{user.email}</p>
        </div>
        <button className="btn-outline btn-sm profile-signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="profile-favorites">
        {/* My Builds */}
        <h2>My Builds ({myJobs.length})</h2>
        {myJobs.length === 0 ? (
          <p className="profile-empty-text">No builds yet. <a href="/create" onClick={e => { e.preventDefault(); navigate("/create"); }}>Create</a> your first prototype.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
            {myJobs.map(j => {
              const statusColor = j.status === 'completed' ? '#22c55e' : j.status === 'failed' ? '#ef4444' : j.status === 'running' ? '#3b82f6' : 'var(--text-dim)';
              const date = new Date(j.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
              const prompt = j.input?.prompt?.slice(0, 50) || 'Untitled';
              return (
                <a
                  key={j.id}
                  href={`/design/${j.id}`}
                  onClick={e => { e.preventDefault(); navigate(`/design/${j.id}`); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", borderRadius: 12,
                    background: "var(--bg-elevated)", border: "1px solid var(--border)",
                    textDecoration: "none", cursor: "pointer",
                  }}
                >
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%", background: statusColor, flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{prompt}</div>
                    <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{j.type} · {date}</div>
                  </div>
                  <span style={{
                    padding: "2px 8px", borderRadius: 50, fontSize: 10, fontWeight: 600,
                    background: `${statusColor}22`, color: statusColor,
                  }}>{j.status}</span>
                </a>
              );
            })}
          </div>
        )}

        <h2>Favorites ({favoriteProtos.length})</h2>
        {favoriteProtos.length === 0 ? (
          <p className="profile-empty-text">
            No favorites yet. Browse the{" "}
            <a href="/gallery" onClick={(e) => { e.preventDefault(); navigate("/gallery"); }}>gallery</a>{" "}
            and heart prototypes you love.
          </p>
        ) : (
          <div className="shots-grid">
            {favoriteProtos.map((p) => (
              <PrototypeCard key={p.folder} prototype={p} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
