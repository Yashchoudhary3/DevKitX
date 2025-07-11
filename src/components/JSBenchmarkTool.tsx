"use client";
import { useState } from "react";

function parseFunctions(code: string) {
  // Split by function name (simple heuristic)
  const regex = /function\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?}/g;
  let match;
  const funcs: { name: string; code: string }[] = [];
  while ((match = regex.exec(code))) {
    funcs.push({ name: match[1], code: match[0] });
  }
  return funcs;
}

function runBenchmarks(funcs: { name: string; code: string }[], runs: number) {
  const results: { name: string; ms: number }[] = [];
  for (const fn of funcs) {
    let total = 0;
    let f;
    try {
      // eslint-disable-next-line no-new-func
      f = new Function(fn.code + `; return ${fn.name};`)();
    } catch (e) {
      results.push({ name: fn.name, ms: NaN });
      continue;
    }
    try {
      const t0 = performance.now();
      for (let i = 0; i < runs; i++) f();
      const t1 = performance.now();
      total = t1 - t0;
      results.push({ name: fn.name, ms: total });
    } catch (e) {
      results.push({ name: fn.name, ms: NaN });
    }
  }
  return results;
}

function getBarColor(idx: number) {
  const colors = ["#2563eb", "#22c55e", "#f59e42", "#e11d48", "#a21caf", "#0ea5e9"];
  return colors[idx % colors.length];
}

export default function JSBenchmarkTool() {
  const [code, setCode] = useState(`function fast() { let x = 0; for (let i = 0; i < 1000; i++) x += i; }
function slow() { let x = 0; for (let i = 0; i < 100000; i++) x += i; }`);
  const [runs, setRuns] = useState(100);
  const [results, setResults] = useState<{ name: string; ms: number }[] | null>(null);
  const [running, setRunning] = useState(false);
  const funcs = parseFunctions(code);

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      setResults(runBenchmarks(funcs, runs));
      setRunning(false);
    }, 100);
  }

  const maxMs = results ? Math.max(...results.map(r => isNaN(r.ms) ? 0 : r.ms)) : 0;

  return (
    <div className="flex flex-col gap-4 animate-fade-in h-full">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide">JS Benchmarking Tool</h2>
        <div className="text-blue-200 text-sm">Paste multiple JS functions, set run count, and compare their performance. See rankings and a bar graph of execution times.</div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <textarea
          className="flex-1 p-3 rounded bg-gray-900 text-white font-mono text-sm border border-gray-800 min-h-[120px]"
          placeholder="Paste multiple JS functions here..."
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={6}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-300 font-mono">Runs per function</label>
          <input
            type="number"
            min={1}
            max={1000000}
            value={runs}
            onChange={e => setRuns(Number(e.target.value))}
            className="w-28 p-2 rounded bg-gray-900 text-white border border-gray-800 text-base font-mono"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold shadow transition"
            onClick={handleRun}
            disabled={running || funcs.length === 0}
          >
            {running ? 'Running...' : 'Run Benchmarks'}
          </button>
        </div>
      </div>
      {results && (
        <div className="mt-4 bg-panel border border-gray-800 rounded-xl p-4 shadow-xl">
          <div className="mb-4 text-base text-white font-semibold">Results (lower is better):</div>
          <div className="flex flex-col gap-2">
            {results
              .slice()
              .sort((a, b) => a.ms - b.ms)
              .map((r, i) => (
                <div key={r.name} className="flex items-center gap-4">
                  <span className="w-32 font-mono text-sm text-blue-200">{r.name}</span>
                  <div className="flex-1 h-6 bg-gray-800 rounded relative">
                    <div
                      className="h-6 rounded"
                      style={{
                        width: isNaN(r.ms) || maxMs === 0 ? 0 : `${(r.ms / maxMs) * 100}%`,
                        background: getBarColor(i),
                        transition: 'width 0.4s',
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs text-gray-300 ml-2">{isNaN(r.ms) ? 'Error' : r.ms.toFixed(2) + ' ms'}</span>
                </div>
              ))}
          </div>
        </div>
      )}
      {!results && (
        <div className="text-gray-500 text-sm">Paste functions and click Run Benchmarks to compare their speed.</div>
      )}
    </div>
  );
} 