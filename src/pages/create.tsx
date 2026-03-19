import React, { useState } from "react";

interface Props {
  navigate: (to: string) => void;
}

const EXAMPLES = [
  "A meditation app with calming visuals and daily streaks",
  "A recipe sharing platform with step-by-step cooking mode",
  "A habit tracker that gamifies daily routines",
  "A local events discovery app with map view",
  "A personal finance dashboard with spending insights",
];

export function Create({ navigate }: Props) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 3000);
  };

  const handleReset = () => {
    setPrompt("");
    setDone(false);
    setGenerating(false);
  };

  return (
    <div className="create-page">
      {!generating && !done ? (
        <>
          <div className="create-hero">
            <span className="create-badge">Beta</span>
            <h1 className="create-title">
              Describe your app,
              <br />
              <span className="create-highlight">AI builds it.</span>
            </h1>
            <p className="create-subtitle">
              Type a description of your app idea and our AI will generate
              a full interactive prototype with design system and screens.
            </p>
          </div>

          <div className="create-input-wrap">
            <textarea
              className="create-input"
              placeholder="Describe your app idea in a few sentences..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
            <div className="create-input-footer">
              <span className="create-char-count">{prompt.length}/500</span>
              <button
                className="create-submit"
                onClick={handleGenerate}
                disabled={!prompt.trim()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Prototype
              </button>
            </div>
          </div>

          <div className="create-examples">
            <p className="create-examples-label">Try an example:</p>
            <div className="create-examples-list">
              {EXAMPLES.map((ex, i) => (
                <button key={i} className="create-example" onClick={() => setPrompt(ex)}>
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="create-steps">
            {[
              { num: "1", title: "Describe", desc: "Tell us your app idea in natural language" },
              { num: "2", title: "Generate", desc: "AI creates a full prototype with design system" },
              { num: "3", title: "Preview", desc: "Interact with your prototype in the browser" },
            ].map((step) => (
              <div key={step.num} className="create-step">
                <span className="create-step-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : generating ? (
        <div className="create-generating">
          <div className="create-spinner" />
          <h2>Generating your prototype...</h2>
          <p>AI is designing screens, picking colors, and writing code.</p>
          <div className="create-progress">
            <div className="create-progress-bar" />
          </div>
          <div className="create-progress-steps">
            <span className="active">Ideation</span>
            <span>Design System</span>
            <span>Screens</span>
            <span>Code</span>
          </div>
        </div>
      ) : (
        <div className="create-done">
          <div className="create-done-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2>Prototype ready!</h2>
          <p className="create-done-desc">Your app idea has been turned into an interactive prototype.</p>
          <div className="create-done-preview">
            <div className="create-done-mockup">
              <div className="create-mockup-bar">
                <span /><span /><span />
              </div>
              <div className="create-mockup-content">
                <div className="create-mockup-block wide" />
                <div className="create-mockup-block" />
                <div className="create-mockup-row">
                  <div className="create-mockup-block small" />
                  <div className="create-mockup-block small" />
                </div>
                <div className="create-mockup-block tall" />
              </div>
            </div>
          </div>
          <div className="create-done-prompt">
            <strong>Your prompt:</strong> {prompt}
          </div>
          <div className="create-done-actions">
            <button className="btn-primary" onClick={() => navigate("/gallery")}>
              View in Gallery
            </button>
            <button className="btn-outline" onClick={handleReset}>
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
