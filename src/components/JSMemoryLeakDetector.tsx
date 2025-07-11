"use client";
import { useState } from "react";

function analyzeCodeForLeaks(code: string) {
  // Simple heuristic: look for function definitions inside other functions
  // and references to variables from outer scopes
  const closurePattern = /function\s+\w*\s*\([^)]*\)\s*{[^}]*function\s+\w*\s*\([^)]*\)\s*{/gs;
  const leaks = closurePattern.test(code);
  return leaks;
}

function runSimulated(code: string) {
  let allocations = 0;
  let maxAlloc = 0;
  let leakWarning = false;
  // Proxy Array to count allocations
  const ArrayProxy = new Proxy(Array, {
    construct(target, args) {
      allocations += 1;
      maxAlloc = Math.max(maxAlloc, allocations);
      return new target(...args);
    }
  });
  // Simulate a global context
  const context = {
    Array: ArrayProxy,
    allocations,
    leakWarning: false,
  };
  let error = null;
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('Array', code);
    fn(ArrayProxy);
    leakWarning = analyzeCodeForLeaks(code);
  } catch (e: any) {
    error = e.message;
  }
  return { allocations, maxAlloc, leakWarning, error };
}

export default function JSMemoryLeakDetector() {
  const [code, setCode] = useState("function leaky() {\n  let arr = new Array(1000);\n  return function() { return arr; };\n}\nleaky();");
  const [result, setResult] = useState<any>(null);
  const [running, setRunning] = useState(false);

  function handleRun() {
    setRunning(true);
    setTimeout(() => {
      const res = runSimulated(code);
      setResult(res);
      setRunning(false);
    }, 200);
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in h-full">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide flex-1">JS Memory Leak Detector (Simulated)</h2>
        <button
          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold shadow transition"
          onClick={handleRun}
          disabled={running}
        >
          {running ? 'Running...' : 'Run'}
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
        {result && (
          <div className="space-y-2">
            {result.error && <div className="text-red-400 font-mono text-sm">Error: {result.error}</div>}
            <div className="text-green-300 font-mono text-sm">Simulated allocations: <b>{result.maxAlloc}</b></div>
            {result.leakWarning && (
              <div className="text-yellow-300 font-mono text-sm bg-yellow-900/40 rounded p-2">
                ⚠️ Potential memory leak: Closure may be holding references to large objects or arrays.
              </div>
            )}
            {!result.leakWarning && !result.error && (
              <div className="text-blue-300 font-mono text-sm">No obvious memory leaks detected.</div>
            )}
          </div>
        )}
        {!result && <div className="text-gray-500 text-sm">Paste code and click Run to simulate memory usage and check for leaks.</div>}
      </div>
    </div>
  );
} 