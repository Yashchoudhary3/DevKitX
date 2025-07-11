"use client";
import { useState } from "react";

function toCamelCase(str: string) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (m) => m.toLowerCase());
}
function toSnakeCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}
function toPascalCase(str: string) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (m) => m.toUpperCase());
}

export default function TextTransformer() {
  const [input, setInput] = useState('dev playground os');
  const [bulk, setBulk] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setInput(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  const lines = bulk ? input.split(/\r?\n/) : [input];

  return (
    <div className="flex flex-col gap-2 animate-fade-in h-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-800/90 to-purple-800/90 border-b border-gray-800 gap-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex-1">Text Transformer</h2>
          <label className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-sm font-semibold transition cursor-pointer">
            Upload File
            <input type="file" accept=".txt" className="hidden" onChange={handleFile} />
          </label>
          <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
            <input type="checkbox" checked={bulk} onChange={e => setBulk(e.target.checked)} className="accent-blue-600" />
            Bulk Edit
          </label>
        </div>
        <textarea
          className="w-full h-32 flex-1 p-3 border-none bg-transparent text-white font-mono text-lg shadow mb-0 resize-none min-h-[200px] rounded-b-xl"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your text here..."
        />
      </div>
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-green-800/90 to-blue-800/90 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white tracking-wide flex-1">Transformations</h3>
        </div>
        <div className="flex-1 p-4 font-mono text-green-400 overflow-auto text-base min-h-[120px] bg-transparent">
          {lines.map((line, idx) => (
            <div key={idx} className={bulk ? 'mb-4 pb-2 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0' : ''}>
              {bulk && <div className="text-xs text-blue-300 mb-1">Line {idx + 1}</div>}
              <div><span className="text-blue-400">camelCase:</span> {toCamelCase(line)}</div>
              <div><span className="text-blue-400">snake_case:</span> {toSnakeCase(line)}</div>
              <div><span className="text-blue-400">PascalCase:</span> {toPascalCase(line)}</div>
              <div><span className="text-blue-400">UPPERCASE:</span> {line.toUpperCase()}</div>
              <div><span className="text-blue-400">lowercase:</span> {line.toLowerCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 