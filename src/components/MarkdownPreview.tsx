"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { oneDark } from "@codemirror/theme-one-dark";

const themes = [
  { name: 'GitHub', prose: 'prose prose-slate dark:prose-invert', bg: 'bg-white/80 text-black' },
  { name: 'Hacker', prose: 'prose prose-green dark:prose-invert', bg: 'bg-black/90 text-green-300' },
  { name: 'Serif', prose: 'prose prose-lg prose-neutral dark:prose-invert font-serif', bg: 'bg-white/90 text-gray-900' },
];

export default function MarkdownPreview() {
  const [input, setInput] = useState(`# Hello, Dev Playground!\n\n- Live markdown preview\n- **Bold** and _italic_\n- [Link](https://nextjs.org)`);
  const [theme, setTheme] = useState(0);

  const handleExport = () => {
    const html = document.getElementById('md-preview-html')?.innerHTML || '';
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'preview.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-2 animate-fade-in h-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-800/90 to-purple-800/90 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white tracking-wide flex-1">Markdown Previewer</h2>
        </div>
        <CodeMirror
          value={input}
          height="40vh"
          extensions={[markdown(), oneDark]}
          onChange={val => setInput(val)}
          className="flex-1 border-none bg-transparent text-lg font-mono min-h-[200px]"
        />
      </div>
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-green-800/90 to-blue-800/90 border-b border-gray-800 gap-4">
          <h3 className="text-lg font-semibold text-white tracking-wide flex-1">Preview</h3>
          <button
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-sm font-semibold transition"
            onClick={handleExport}
          >
            Export HTML
          </button>
          <select
            className="px-2 py-1 rounded border border-gray-700 bg-gray-900 text-white text-sm"
            value={theme}
            onChange={e => setTheme(Number(e.target.value))}
          >
            {themes.map((t, i) => <option key={i} value={i}>{t.name}</option>)}
          </select>
        </div>
        <div className={`flex-1 p-4 rounded-b-xl overflow-auto text-base max-w-none min-h-[120px] bg-transparent ${themes[theme].bg}`}>
          <div id="md-preview-html" className={themes[theme].prose}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{input}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
} 