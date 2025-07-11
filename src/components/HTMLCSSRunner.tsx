"use client";
import { useState } from "react";

export default function HTMLCSSRunner() {
  const [html, setHtml] = useState('<h1>Hello, world!</h1>');
  const [css, setCss] = useState('h1 { color: #2563eb; text-align: center; }');
  const [srcDoc, setSrcDoc] = useState('');

  function handleRun() {
    setSrcDoc(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}</body></html>`);
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in h-full">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide">HTML/CSS Runner</h2>
        <div className="text-blue-200 text-sm">Paste HTML and CSS, then run to see a live preview. Great for prototyping and visual testing.</div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <textarea
          className="flex-1 p-3 rounded bg-gray-900 text-white font-mono text-sm border border-gray-800 min-h-[120px]"
          placeholder="Paste HTML here..."
          value={html}
          onChange={e => setHtml(e.target.value)}
          rows={6}
        />
        <textarea
          className="flex-1 p-3 rounded bg-gray-900 text-white font-mono text-sm border border-gray-800 min-h-[120px]"
          placeholder="Paste CSS here..."
          value={css}
          onChange={e => setCss(e.target.value)}
          rows={6}
        />
        <button
          className="h-12 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold shadow transition self-end"
          onClick={handleRun}
        >
          Run
        </button>
      </div>
      <div className="flex-1 mt-4 bg-panel border border-gray-800 rounded-xl p-4 shadow-xl overflow-auto">
        <iframe
          title="HTML/CSS Preview"
          srcDoc={srcDoc}
          className="w-full h-96 bg-white rounded shadow"
          style={{ minHeight: 200, border: 'none' }}
        />
        {!srcDoc && <div className="text-gray-500 text-sm">Paste HTML and CSS, then click Run to see the result.</div>}
      </div>
    </div>
  );
} 