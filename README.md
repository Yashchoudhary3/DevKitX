# DevKitX

> The Ultimate Local-First Developer Tool Suite

DevKitX is a modern, local-first developer tool suite that runs entirely in your browser. No sign-in, no cloud, no data leaves your device. Perfect for rapid prototyping, debugging, and everyday dev workflows.

## 🚀 Features

- **JS Runner**: Run JavaScript code in a secure, sandboxed environment. See live output, memory usage, and execution time.
- **JSON Viewer**: Validate, format, and explore JSON data. View as a collapsible tree, copy paths, and download as .json.
- **Regex Tester**: Test and debug regular expressions. See live matches, explanations, and save/load your favorite regexes.
- **Markdown Preview**: Live preview and edit Markdown. Switch themes, export HTML, and see your content styled instantly.
- **Git Diff Visualizer**: Paste two versions of code to see a Git-style diff. View side-by-side or inline, with commit-style stats.
- **AST Explorer**: Paste JavaScript code to visualize its Abstract Syntax Tree (AST). Hover nodes to see their type and structure.
- **JS Memory Leak Detector**: Paste JavaScript code to simulate memory allocations and detect potential memory leaks caused by closures.
- **JS Benchmarking Tool**: Paste multiple JavaScript functions and compare their performance. See rankings and a bar graph of execution times.
- **HTML/CSS Runner**: Paste HTML and CSS, then run to see a live preview. Great for prototyping and visual testing.
- **API Tester**: Test REST APIs. Input method, URL, headers, and JSON body (Monaco Editor). See response headers, body, and status.

## 🖥️ Usage

1. **Clone the repo:**
   ```sh
   git clone <your-repo-url>
   cd devkitx
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run locally:**
   ```sh
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 🛠️ Tools Overview

| Tool                  | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| JS Runner            | Run JS code in a sandbox, see output, memory, and timing.                    |
| JSON Viewer          | Format, validate, and explore JSON as a tree.                                |
| Regex Tester         | Test regex patterns, see matches, explanations, and save/load regexes.       |
| Markdown Preview     | Live Markdown to HTML preview, theme switcher, export HTML.                  |
| Git Diff Visualizer  | GitHub-style code diff, side-by-side/inline, commit stats.                   |
| AST Explorer         | Visualize JS ASTs, hover for node types.                                     |
| JS Memory Leak Detector | Simulate allocations, detect closure leaks in JS code.                     |
| JS Benchmarking Tool | Compare performance of multiple JS functions, see bar graph.                 |
| HTML/CSS Runner      | Live preview HTML and CSS, perfect for prototyping.                          |
| API Tester           | Test REST APIs, input method/URL/headers/body, see response.                 |

## 📦 Deployment

DevKitX is ready for deployment on Vercel, Netlify, or any static hosting that supports Next.js:

1. **Build the app:**
   ```sh
   npm run build
   ```
2. **Start in production mode:**
   ```sh
   npm start
   ```
3. **Or deploy to Vercel/Netlify:**
   - Push your repo to GitHub.
   - Connect to Vercel/Netlify and follow their Next.js deployment instructions.

## 📚 Docs

- All tools are accessible from the sidebar or dashboard.
- Each tool has a short description at the top explaining its purpose and usage.
- No data leaves your device—everything runs locally in your browser.

## 🧑‍💻 Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Monaco Editor
- @xenova/transformers (for local LLM, optional)
- @babel/parser (AST)
- react-diff-viewer-continued

---

**DevKitX** — The all-in-one, privacy-first developer toolkit. Enjoy hacking! 🚀
