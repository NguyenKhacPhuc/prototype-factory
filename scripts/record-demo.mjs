#!/usr/bin/env node
/**
 * Appdex Demo Video — Rich transitions, focused flow
 * Hero -> Gallery -> Detail (full scroll to Figma export) -> Style Studio -> Create
 */
import puppeteer from "puppeteer";
import path from "path";

const SITE_URL = "https://appdex-ai.vercel.app";
const OUTPUT = path.join(import.meta.dirname, "..", "demo-walkthrough.webm");
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function smoothScroll(page, distance, duration = 800) {
  await page.evaluate(async (dist, dur) => {
    const start = window.scrollY;
    const t0 = performance.now();
    await new Promise((resolve) => {
      function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo(0, start + dist * ease);
        if (p < 1) requestAnimationFrame(step); else resolve();
      }
      requestAnimationFrame(step);
    });
  }, distance, duration);
}

async function scrollToEnd(page, stepSize = 400, stepDur = 900) {
  let prev = -1;
  while (true) {
    const scrollY = await page.evaluate(() => window.scrollY);
    const max = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    if (scrollY >= max - 5 || scrollY === prev) break;
    prev = scrollY;
    const next = Math.min(stepSize, max - scrollY);
    await smoothScroll(page, next, stepDur);
    await sleep(600);
  }
}

async function moveTo(page, x, y, steps = 25) {
  const from = await page.evaluate(() => ({ x: window.__cx || 720, y: window.__cy || 450 }));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const arc = Math.sin(t * Math.PI) * 20;
    await page.mouse.move(from.x + (x - from.x) * ease, from.y + (y - from.y) * ease - arc);
    await sleep(10);
  }
  await page.mouse.move(x, y);
  await page.evaluate((px, py) => { window.__cx = px; window.__cy = py; }, x, y);
}

async function hoverAndClick(page, selector, { delay = 350, index = 0 } = {}) {
  const box = await page.evaluate((sel, idx) => {
    const el = document.querySelectorAll(sel)[idx];
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, selector, index);
  if (!box) return false;
  await moveTo(page, box.x, box.y);
  await sleep(delay);
  await page.mouse.click(box.x, box.y);
  return true;
}

async function hoverClickByText(page, containerSel, text, { delay = 300 } = {}) {
  const box = await page.evaluate((sel, txt) => {
    for (const el of document.querySelectorAll(sel)) {
      if (el.textContent?.includes(txt)) {
        const r = el.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }
    }
    return null;
  }, containerSel, text);
  if (!box) return false;
  await moveTo(page, box.x, box.y);
  await sleep(delay);
  await page.mouse.click(box.x, box.y);
  return true;
}

async function waveMouse(page, selector, count = 3) {
  for (let i = 0; i < count; i++) {
    const box = await page.evaluate((sel, idx) => {
      const el = document.querySelectorAll(sel)[idx];
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }, selector, i);
    if (box) { await moveTo(page, box.x, box.y, 12); await sleep(120); }
  }
}

// ---- Transition effects ----

async function fadeOut(page, duration = 450) {
  await page.evaluate((dur) => {
    const o = document.getElementById("demo-transition");
    if (o) { o.style.transition = "opacity " + dur + "ms ease-in"; o.style.opacity = "1"; }
  }, duration);
  await sleep(duration + 50);
}

async function fadeIn(page, duration = 450) {
  await page.evaluate((dur) => {
    const o = document.getElementById("demo-transition");
    if (o) { o.style.transition = "opacity " + dur + "ms ease-out"; o.style.opacity = "0"; }
  }, duration);
  await sleep(duration + 50);
}

// Slide-up wipe: overlay slides up to reveal new page
async function slideUpReveal(page, duration = 600) {
  await page.evaluate((dur) => {
    const o = document.getElementById("demo-transition");
    if (!o) return;
    o.style.transition = "none";
    o.style.opacity = "1";
    o.style.transform = "translateY(0)";
    requestAnimationFrame(() => {
      o.style.transition = "transform " + dur + "ms cubic-bezier(0.4,0,0.2,1), opacity " + (dur * 0.4) + "ms ease-out " + (dur * 0.6) + "ms";
      o.style.transform = "translateY(-100%)";
      o.style.opacity = "0";
    });
  }, duration);
  await sleep(duration + 100);
  // Reset transform
  await page.evaluate(() => {
    const o = document.getElementById("demo-transition");
    if (o) { o.style.transition = "none"; o.style.transform = "translateY(0)"; o.style.opacity = "0"; }
  });
}

// Zoom-fade: scale up slightly while fading out overlay
async function zoomFadeIn(page, duration = 500) {
  await page.evaluate((dur) => {
    // Slightly scale the page content for a zoom-in feel
    document.body.style.transition = "transform " + dur + "ms ease-out, opacity " + dur + "ms ease-out";
    document.body.style.transform = "scale(0.97)";
    document.body.style.opacity = "0.5";
    requestAnimationFrame(() => {
      document.body.style.transform = "scale(1)";
      document.body.style.opacity = "1";
    });
    const o = document.getElementById("demo-transition");
    if (o) { o.style.transition = "opacity " + dur + "ms ease-out"; o.style.opacity = "0"; }
  }, duration);
  await sleep(duration + 100);
  await page.evaluate(() => {
    document.body.style.transition = "";
    document.body.style.transform = "";
    document.body.style.opacity = "";
  });
}

// Circle wipe from cursor position
async function circleWipe(page, duration = 700) {
  await page.evaluate((dur) => {
    const o = document.getElementById("demo-transition");
    if (!o) return;
    const cx = window.__cx || 720;
    const cy = window.__cy || 450;
    const maxR = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    o.style.transition = "none";
    o.style.opacity = "1";
    o.style.clipPath = "circle(0px at " + cx + "px " + cy + "px)";
    requestAnimationFrame(() => {
      o.style.transition = "clip-path " + dur + "ms cubic-bezier(0.4,0,0.2,1)";
      o.style.clipPath = "circle(" + maxR + "px at " + cx + "px " + cy + "px)";
    });
  }, duration);
  await sleep(duration + 50);
}

async function circleReveal(page, duration = 700) {
  await page.evaluate((dur) => {
    const o = document.getElementById("demo-transition");
    if (!o) return;
    const cx = window.__cx || 720;
    const cy = window.__cy || 450;
    const maxR = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    o.style.transition = "none";
    o.style.opacity = "1";
    o.style.clipPath = "circle(" + maxR + "px at " + cx + "px " + cy + "px)";
    requestAnimationFrame(() => {
      o.style.transition = "clip-path " + dur + "ms cubic-bezier(0.4,0,0.2,1)";
      o.style.clipPath = "circle(0px at " + cx + "px " + cy + "px)";
    });
  }, duration);
  await sleep(duration + 50);
  // Reset
  await page.evaluate(() => {
    const o = document.getElementById("demo-transition");
    if (o) { o.style.clipPath = "none"; o.style.opacity = "0"; }
  });
}

async function navigateWith(page, url, outFn, inFn) {
  await outFn(page);
  try { await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 }); } catch {}
  await sleep(200);
  await inFn(page);
}

async function main() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: VIEWPORT,
    args: [
      `--window-size=${VIEWPORT.width},${VIEWPORT.height + 100}`,
      "--disable-features=TranslateUI",
      "--hide-scrollbars",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  // Inject cursor, ripple, transition overlay
  await page.evaluateOnNewDocument(() => {
    window.__cx = 720;
    window.__cy = 450;
    document.addEventListener("DOMContentLoaded", () => {
      // Cursor
      const cursor = document.createElement("div");
      cursor.id = "demo-cursor";
      Object.assign(cursor.style, {
        position: "fixed", top: "0", left: "0", zIndex: "999999",
        width: "24px", height: "24px", pointerEvents: "none",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.35))",
      });
      cursor.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 00-.85.35z" fill="white" stroke="black" stroke-width="1.5"/></svg>';
      document.body.appendChild(cursor);

      // Ripple
      const ripple = document.createElement("div");
      ripple.id = "demo-ripple";
      Object.assign(ripple.style, {
        position: "fixed", zIndex: "999998", pointerEvents: "none",
        width: "40px", height: "40px", borderRadius: "50%",
        border: "2.5px solid rgba(99,102,241,0.8)",
        transform: "translate(-50%,-50%) scale(0)", opacity: "0",
      });
      document.body.appendChild(ripple);

      // Transition overlay
      const overlay = document.createElement("div");
      overlay.id = "demo-transition";
      Object.assign(overlay.style, {
        position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
        background: "#000", zIndex: "999990", pointerEvents: "none", opacity: "0",
      });
      document.body.appendChild(overlay);

      document.addEventListener("mousemove", (e) => {
        cursor.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      });
      document.addEventListener("mousedown", (e) => {
        ripple.style.left = e.clientX + "px";
        ripple.style.top = e.clientY + "px";
        ripple.style.transition = "none";
        ripple.style.transform = "translate(-50%,-50%) scale(0)";
        ripple.style.opacity = "1";
        requestAnimationFrame(() => {
          ripple.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out";
          ripple.style.transform = "translate(-50%,-50%) scale(1.5)";
          ripple.style.opacity = "0";
        });
      });
    });
  });

  console.log("Recording...");
  const recorder = await page.screencast({ path: OUTPUT, speed: 1 });

  try {
    // ======== 1. HERO ========
    console.log("1/5 Hero");
    await page.goto(SITE_URL, { waitUntil: "networkidle2", timeout: 20000 });
    await sleep(3800);
    await waveMouse(page, ".hero-card", 5);
    await sleep(1000);

    // ======== 2. GALLERY (circle wipe transition) ========
    console.log("2/5 Gallery");
    await navigateWith(page, `${SITE_URL}/gallery`,
      (p) => circleWipe(p, 600),
      (p) => circleReveal(p, 600)
    );
    await sleep(1200);

    // Simple: scroll down then click an item
    await smoothScroll(page, 500, 1000);
    await sleep(800);
    await hoverAndClick(page, ".shot-card", { delay: 400, index: 2 });

    // ======== 3. DETAIL (zoom-fade transition via app nav) ========
    console.log("3/5 Detail");
    await sleep(3000); // Wait for detail page + iframe load

    // Scroll all the way to the bottom to show Export to Figma
    await scrollToEnd(page, 350, 900);
    await sleep(2000); // Pause at bottom to show Figma export section

    // ======== 4. STYLE STUDIO (slide-up reveal) ========
    console.log("4/5 Style Studio");
    await navigateWith(page, `${SITE_URL}/styles`,
      (p) => fadeOut(p, 400),
      (p) => slideUpReveal(p, 600)
    );
    await sleep(1500);

    // Rapid style switching
    const styles = ["Glassmorphism", "Brutalism", "Dark Mode", "Cyberpunk", "Y2K", "Claymorphism", "Neumorphism", "Aurora UI"];
    for (const name of styles) {
      console.log("  -> " + name);
      const ok = await hoverClickByText(page, ".styles-quick-pick", name, { delay: 200 });
      if (ok) await sleep(900);
    }

    // Scroll to palettes
    await smoothScroll(page, 400, 600);
    await sleep(500);

    // Click palettes
    for (const name of ["Neon Nights", "Berry Bliss", "Midnight Ocean", "Candy Pop"]) {
      console.log("  -> Palette: " + name);
      const ok = await hoverClickByText(page, ".palette-card", name, { delay: 180 });
      if (ok) await sleep(900);
    }

    // Dashboard category
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    await hoverAndClick(page, ".styles-select");
    await sleep(200);
    await page.select(".styles-select", "dashboard");
    await sleep(1000);
    await hoverAndClick(page, ".styles-quick-pick", { delay: 200, index: 0 });
    await sleep(900);
    await hoverAndClick(page, ".styles-quick-pick", { delay: 200, index: 2 });
    await sleep(900);
    await hoverAndClick(page, ".styles-quick-pick", { delay: 200, index: 4 });
    await sleep(1000);

    // ======== 5. CREATE (circle wipe from cursor) ========
    console.log("5/5 Create");
    await navigateWith(page, `${SITE_URL}/create`,
      (p) => circleWipe(p, 600),
      (p) => zoomFadeIn(p, 500)
    );
    await sleep(3000);

    // ======== END: fade to black ========
    await fadeOut(page, 800);
    await sleep(500);

  } finally {
    console.log("Stopping...");
    await recorder.stop();
    await browser.close();
    console.log("Saved: " + OUTPUT);
  }
}

main().catch((err) => { console.error("Failed:", err); process.exit(1); });
