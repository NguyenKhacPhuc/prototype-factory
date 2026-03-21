import React, { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { useFavorites } from "../hooks/use-favorites";
import { usePrototypes } from "../hooks/use-prototypes";
import { PrototypeCard } from "../components/prototype-card";

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
