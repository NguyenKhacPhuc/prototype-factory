import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { join } from "path";

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: #0a0a0a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  .glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    top: -100px;
    left: -100px;
  }
  .glow2 {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%);
    bottom: -100px;
    right: 0;
  }
  .grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
    border-radius: 100px;
    color: #a5b4fc;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .title {
    font-size: 96px;
    font-weight: 800;
    letter-spacing: -4px;
    background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  .subtitle {
    font-size: 26px;
    color: rgba(255,255,255,0.5);
    font-weight: 400;
    max-width: 600px;
    line-height: 1.4;
  }
  .pills {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }
  .pill {
    padding: 6px 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    color: rgba(255,255,255,0.6);
    font-size: 14px;
  }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="glow2"></div>
  <div class="content">
    <div class="badge">✦ AI-Powered</div>
    <div class="title">Appdex</div>
    <div class="subtitle">Discover AI-generated app ideas with interactive previews and design specs</div>
    <div class="pills">
      <span class="pill">App Gallery</span>
      <span class="pill">Prototypes</span>
      <span class="pill">Design Specs</span>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: "networkidle0" });

const outputPath = join(import.meta.dir, "../public/og-image.png");
await page.screenshot({ path: outputPath, type: "png" });
await browser.close();

console.log(`OG image saved to ${outputPath}`);
