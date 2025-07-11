"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { oneDark } from "@codemirror/theme-one-dark";

function parseJSON(input: string) {
  try {
    return [JSON.parse(input), null];
  } catch (e: any) {
    return [null, e.message];
  }
}

function Tree({ data, level = 0, path = '', onCopyPath }: { data: any; level?: number; path?: string; onCopyPath: (path: string) => void }) {
  const [open, setOpen] = useState(true);
  if (typeof data !== "object" || data === null) {
    return <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => onCopyPath(path)} title="Copy path">{JSON.stringify(data)}</span>;
  }
  const isArray = Array.isArray(data);
  return (
    <div className="pl-4 border-l border-gray-700">
      <button className="text-xs text-gray-400 mb-1" onClick={() => setOpen(o => !o)}>
        {open ? "\u25bc" : "\u25b6"} {isArray ? "Array" : "Object"}
      </button>
      {open && (
        <ul className="space-y-1">
          {Object.entries(data).map(([k, v], i) => {
            const childPath = isArray ? `${path}[${i}]` : path ? `${path}.${k}` : k;
            return (
              <li key={i} className="flex items-start gap-2">
                <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => onCopyPath(childPath)} title="Copy path">{isArray ? i : k}:</span>
                <Tree data={v} level={level + 1} path={childPath} onCopyPath={onCopyPath} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function JSONViewer() {
  const [input, setInput] = useState('{\n  "hello": "world",\n  "arr": [1,2,3],\n  "nested": { "a": true }\n}');
  const [parsed, error] = parseJSON(input);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 1200);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-2 animate-fade-in h-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-800/90 to-purple-800/90 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white tracking-wide flex-1">JSON Viewer & Formatter</h2>
        </div>
        <CodeMirror
          value={input}
          height="40vh"
          extensions={[json(), oneDark]}
          onChange={val => setInput(val)}
          className="flex-1 border-none bg-transparent text-lg font-mono min-h-[200px]"
        />
        <div className="px-4 py-2 text-sm text-gray-400 bg-transparent border-t border-gray-800">
          {error ? <span className="text-red-400">Invalid JSON: {error}</span> : "Valid JSON"}
        </div>
      </div>
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-green-800/90 to-blue-800/90 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white tracking-wide flex-1">Tree View</h3>
          <button
            className="ml-auto px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-sm font-semibold transition"
            onClick={handleDownload}
          >
            Download JSON
          </button>
        </div>
        <div className="flex-1 p-4 font-mono text-green-400 overflow-auto text-base min-h-[120px] bg-transparent relative">
          {error ? <span className="text-gray-500">Cannot display tree.</span> : <Tree data={parsed} onCopyPath={handleCopyPath} />}
          {copiedPath && (
            <div className="absolute top-2 right-4 bg-blue-800 text-white px-3 py-1 rounded shadow text-xs animate-fade-in z-10">Copied: <span className="font-mono">{copiedPath}</span></div>
          )}
        </div>
      </div>
    </div>
  );
} 