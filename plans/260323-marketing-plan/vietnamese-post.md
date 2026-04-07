# Appdex AI - Khi AI tự tạo ra app mỗi ngày

---

Chào mọi người,

Mình muốn chia sẻ về một side project mình đang build: **Appdex** (https://appdex-ai.vercel.app) — một nền tảng nơi AI tự động tạo ra các app prototype mỗi ngày, hoàn toàn không cần con người can thiệp.

## Ý tưởng bắt đầu từ đâu?

Mình là developer, và mỗi khi có ý tưởng app mới, việc đầu tiên luôn là ngồi thiết kế UI, dựng wireframe, chọn màu, chọn font... rồi mới bắt đầu code. Quá trình này tốn rất nhiều thời gian, đặc biệt khi mình chỉ muốn validate nhanh một ý tưởng.

Mình tự hỏi: **"Nếu AI có thể tự nghĩ ra ý tưởng app VÀ tự build prototype luôn thì sao?"**

Vậy là Appdex ra đời.

## Nó hoạt động như thế nào?

Appdex là một pipeline hoàn toàn tự động, chạy 6 lần/ngày:

1. **GPT-4o-mini** nghĩ ra ý tưởng app độc đáo — tên app, mô tả, tính năng, đối tượng người dùng, xoay vòng qua 10 danh mục (health, finance, social, productivity, education, entertainment, travel, food, sustainability, creative tools)

2. **Claude Sonnet** nhận ý tưởng đó và build ra một React prototype hoàn chỉnh — gồm 4+ màn hình, navigation, micro-interactions, animations, và một design system riêng biệt

3. **Asset generation** — tự động tải fonts từ Google Fonts, icons từ Lucide, tạo design spec và asset manifest

4. **Headless Chrome** validate xem prototype có render đúng không, chụp screenshot

5. **Auto-deploy** lên Vercel — mọi thứ tự động từ A đến Z

Kết quả: mỗi ngày có **6 app prototype mới** xuất hiện trong gallery, hiện tại đã có **90+ prototypes**.

## Tính năng hiện tại

- **Gallery** — Duyệt qua hơn 90 prototype, filter theo category, search theo tên
- **Interactive Preview** — Mỗi prototype đều chạy được trong browser, có thể click, navigate giữa các màn hình
- **Chi tiết đầy đủ** — Mô tả, features, use cases, danh sách screens cho mỗi prototype
- **Export to Figma** — Copy SVG hoặc Design Tree JSON, paste thẳng vào Figma thành editable vectors. Hỗ trợ plugin Proto-to-Figma cho auto-layout frames
- **Style Studio** — 68+ design styles (Glassmorphism, Brutalism, Cyberpunk, Y2K, Neumorphism...), 12 color palettes, 6 font pairings. Click để xem live preview thay đổi real-time trên phone mockup
- **Authentication** — Đăng nhập qua Supabase, favorite prototypes
- **Responsive** — Chạy mượt trên cả desktop và mobile

## Nó giải quyết vấn đề gì?

- **Cho founders/indie hackers**: Cần inspiration cho app idea? Browse gallery, tìm ý tưởng phù hợp, xem luôn prototype chạy thực tế thay vì chỉ đọc text
- **Cho designers**: Khám phá 68+ phong cách thiết kế khác nhau, export thẳng sang Figma để bắt đầu customize
- **Cho developers**: Xem code React thực tế, học patterns, fork và phát triển tiếp
- **Cho product managers**: Demo nhanh concept cho stakeholders, không cần đợi team design/dev

Nói ngắn gọn: **rút ngắn khoảng cách từ ý tưởng đến prototype từ vài ngày xuống vài giây**.

## Roadmap - Những gì sắp tới

- **AI Prototype Generator** (Q3 2026) — Tính năng đang được build: bạn mô tả ý tưởng app bằng ngôn ngữ tự nhiên, AI sẽ generate ra prototype hoàn chỉnh cho bạn. Hiện tại đã có UI, đang phát triển backend pipeline
- **Canvas Editor** — Figma-style UI editor cho phép chỉnh sửa trực tiếp prototype, drag & drop elements, inspector panel
- **Community features** — Vote, comment, share prototypes. "Prototype of the Week" featured section
- **Weekly Newsletter** — "Best of Appdex" gửi qua email, tổng hợp những prototype hay nhất trong tuần
- **Template Marketplace** — Cho phép users fork và customize prototypes cho dự án riêng
- **Team Collaboration** — Shared workspaces, real-time collaboration trên prototypes
- **Mobile App** — Native app để browse gallery on-the-go

## Tech Stack

- **Frontend**: React 19 + TypeScript, build bằng Bun
- **Backend**: Supabase (Auth, Database, Storage)
- **AI Pipeline**: OpenAI GPT-4o-mini (ideation) + Claude Sonnet (code generation)
- **Validation**: Puppeteer (headless Chrome)
- **Deploy**: Vercel
- **Scheduling**: macOS LaunchAgent (6x/day)

## Demo Video

Mình có quay một video walkthrough ngắn (~70s) cho ai muốn xem nhanh: [đính kèm video]

---

Link: https://appdex-ai.vercel.app

Rất mong nhận được feedback từ mọi người! Nếu có ý tưởng gì hay muốn contribute thì inbox mình nhé.

---
