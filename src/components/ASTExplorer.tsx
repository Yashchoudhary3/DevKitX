"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

let babelParser: typeof import("@babel/parser") | null = null;

function parseCode(code: string) {
  if (!babelParser) return null;
  try {
    return babelParser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript", "classProperties", "objectRestSpread"],
    });
  } catch (e) {
    return { error: (e as Error).message };
  }
}

function renderAST(node: any, path: string = "root", setHovered: (t: string) => void, hovered: string) {
  if (!node || typeof node !== "object") return null;
  const keys = Object.keys(node).filter(k => typeof node[k] === "object" && node[k] !== null && k !== 'loc' && k !== 'start' && k !== 'end');
  return (
    <div className="pl-4 border-l border-gray-700">
      <div
        className={`inline-block px-2 py-1 rounded cursor-pointer text-xs mb-1 ${hovered === path ? 'bg-blue-700 text-white' : 'bg-gray-800 text-blue-200'}`}
        onMouseEnter={() => setHovered(path)}
        onMouseLeave={() => setHovered("")}
        title={node.type}
      >
        {node.type || typeof node}
      </div>
      {keys.length > 0 && (
        <ul className="ml-2">
          {keys.map((k, i) => (
            <li key={i} className="mb-1">
              <span className="text-green-400 font-mono text-xs">{k}</span>
              {Array.isArray(node[k])
                ? node[k].map((child: any, idx: number) => (
                    <div key={idx}>{renderAST(child, path + '.' + k + '[' + idx + ']', setHovered, hovered)}</div>
                  ))
                : renderAST(node[k], path + '.' + k, setHovered, hovered)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ASTExplorer() {
  const [code, setCode] = useState("function hello(name) {\n  return 'Hello, ' + name;\n}");
  const [ast, setAst] = useState<any>(null);
  const [hovered, setHovered] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleParse() {
    setLoading(true);
    setError(null);
    if (!babelParser) {
      babelParser = await import("@babel/parser");
    }
    const result = parseCode(code);
    if (result && (result as any).error) setError((result as any).error);
    else setAst(result);
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in h-full">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide flex-1">AST Explorer</h2>
        <button
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold shadow transition"
          onClick={handleParse}
          disabled={loading}
        >
          {loading ? 'Parsing...' : 'Parse'}
        </button>
      </div>
      <textarea
        className="w-full p-3 rounded bg-gray-900 text-white font-mono text-sm border border-gray-800 min-h-[120px]"
        placeholder="Paste JavaScript code here..."
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={6}
      />
      <div className="flex-1 overflow-auto bg-panel border border-gray-800 rounded-xl p-4 shadow-xl">
        {error && <div className="text-red-400 font-mono text-sm mb-2">{error}</div>}
        {ast ? (
          <div className="text-xs text-blue-200 font-mono">
            {renderAST(ast.program || ast, "root", setHovered, hovered)}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">Paste code and click Parse to see the AST.</div>
        )}
      </div>
    </div>
  );
} 