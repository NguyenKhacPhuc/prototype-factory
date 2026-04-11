import React from "react";

interface Props {
  navigate: (to: string) => void;
}

export function Pricing({ navigate }: Props) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 600, letterSpacing: -1 }}>
          Simple pricing
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)", marginTop: 12 }}>
          Start free. Pay only when you need more.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Free */}
        <div style={{
          padding: 32, borderRadius: 20,
          background: "var(--bg-elevated)", border: "1px solid var(--border)",
          display: "flex", flexDirection: "column",
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Free</span>
          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 42, fontWeight: 800 }}>$0</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>For exploring what's possible</p>

          <div style={{ flex: 1 }}>
            {[
              "Unlimited prototype previews",
              "3 app builds",
              "Download source code",
              "Test with Expo Go",
              "67 design styles",
            ].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{f}</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/create")} style={{
            marginTop: 24, padding: 14, borderRadius: 12, width: "100%",
            border: "1px solid var(--border)", background: "none",
            color: "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Get Started</button>
        </div>

        {/* Pay Per Build */}
        <div style={{
          padding: 32, borderRadius: 20,
          background: "var(--bg-elevated)",
          border: "2px solid var(--accent)",
          display: "flex", flexDirection: "column",
          position: "relative",
        }}>
          <span style={{
            position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
            padding: "4px 14px", borderRadius: 50, fontSize: 11, fontWeight: 700,
            background: "var(--accent)", color: "#fff",
          }}>Most Popular</span>

          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Per Build</span>
          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 42, fontWeight: 800 }}>$2.99</span>
            <span style={{ fontSize: 14, color: "var(--text-muted)", marginLeft: 4 }}>/ app</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>After free builds are used</p>

          <div style={{ flex: 1 }}>
            {[
              "Everything in Free",
              "Unlimited app builds",
              "Full source code (iOS + Android)",
              "Store listing + screenshots",
              "Landing page + privacy policy",
              "Priority build queue",
            ].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{f}</span>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/gallery")} style={{
            marginTop: 24, padding: 14, borderRadius: 12, width: "100%",
            border: "none", background: "var(--accent)",
            color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>Browse & Build</button>
        </div>

        {/* Coming Soon */}
        <div style={{
          padding: 32, borderRadius: 20,
          background: "var(--bg-elevated)", border: "1px solid var(--border)",
          display: "flex", flexDirection: "column",
          opacity: 0.7,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Pro</span>
          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 42, fontWeight: 800 }}>$19</span>
            <span style={{ fontSize: 14, color: "var(--text-muted)", marginLeft: 4 }}>/ month</span>
          </div>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>For teams & power users</p>

          <div style={{ flex: 1 }}>
            {[
              "Everything in Per Build",
              "Unlimited builds included",
              "Team collaboration (5 seats)",
              "Custom branding",
              "API access",
              "Priority support",
            ].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: 13, color: "var(--text-dim)" }}>{f}</span>
              </div>
            ))}
          </div>

          <button disabled style={{
            marginTop: 24, padding: 14, borderRadius: 12, width: "100%",
            border: "1px solid var(--border)", background: "none",
            color: "var(--text-dim)", fontSize: 14, fontWeight: 600, cursor: "not-allowed",
          }}>Coming Soon</button>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 64, maxWidth: 600, margin: "64px auto 0" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 600, textAlign: "center", marginBottom: 32 }}>FAQ</h2>
        {[
          { q: "What do I get with a free build?", a: "Full React Native source code, ready to run with Expo Go on your phone. Includes iOS + Android support." },
          { q: "Do I need to know how to code?", a: "No. Describe your app idea, AI builds it. You get downloadable source code that runs out of the box." },
          { q: "How long does a build take?", a: "About 3 minutes. You can watch the progress in real-time." },
          { q: "Can I publish to App Store / Play Store?", a: "Yes. The source code is yours. You can publish it with an Apple Developer ($99/yr) or Google Play ($25 one-time) account." },
          { q: "What framework is used?", a: "React Native with Expo. Works on both iOS and Android from one codebase." },
        ].map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 20, padding: "16px 20px", borderRadius: 12, background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{q}</h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
