"use client";
import { useState } from "react";

const TASKS = [
  { key: 'explain', label: 'Explain this code', prompt: 'Explain what this code does:' },
  { key: 'summarize', label: 'Summarize this function', prompt: 'Summarize this function:' },
  { key: 'pseudocode', label: 'Convert to pseudocode', prompt: 'Convert this code to pseudocode:' },
  { key: 'detect', label: 'Detect bugs', prompt: 'Find bugs in this code:' },
];

async function runLLM(task: string, code: string) {
  try {
    // Lazy load transformers.js
    const { pipeline } = await import("@xenova/transformers");
    // Use gpt2 (small, fast, local)
    const pipe = await pipeline('text-generation', 'Xenova/gpt2');
    const prompt = TASKS.find(t => t.key === task)?.prompt || '';
    const input = `${prompt}\n${code}\n`;
    const out = await pipe(input, { max_new_tokens: 64 });
    return out[0]?.generated_text?.replace(input, '').trim() || '(No output)';
  } catch (e) {
    return null;
  }
}

function simulateLLM(task: string, code: string) {
  if (!code.trim()) return 'Paste code and select a task.';
  switch (task) {
    case 'explain':
      return 'This code defines a function and explains its logic step by step.';
    case 'summarize':
      return 'This function takes input, processes it, and returns a result.';
    case 'pseudocode':
      return '1. Start\n2. Do something with input\n3. Return output';
    case 'detect':
      return 'No obvious bugs detected. (Simulated)';
    default:
      return 'Select a task.';
  }
}

export default function CodeIntel() {
  const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n}');
  const [task, setTask] = useState('explain');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [llmAvailable, setLlmAvailable] = useState(true);

  async function handleRun() {
    setRunning(true);
    setOutput('');
    // Try real LLM, fallback to simulated
    const real = await runLLM(task, code);
    if (real !== null) {
      setOutput(real);
      setLlmAvailable(true);
    } else {
      setOutput(simulateLLM(task, code));
      setLlmAvailable(false);
    }
    setRunning(false);
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in h-full">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide">Code Intelligence (Local LLM)</h2>
        <div className="text-blue-200 text-sm">Paste code and use local LLM-style tools: explain, summarize, convert to pseudocode, or detect bugs. Powered by transformers.js, runs in your browser.</div>
      </div>
      <textarea
        className="w-full p-3 rounded bg-gray-900 text-white font-mono text-sm border border-gray-800 min-h-[120px]"
        placeholder="Paste code here..."
        value={code}
        onChange={e => setCode(e.target.value)}
        rows={6}
      />
      <div className="flex flex-wrap gap-4 items-center">
        {TASKS.map(t => (
          <button
            key={t.key}
            className={`px-4 py-2 rounded font-semibold text-sm transition ${task === t.key ? 'bg-blue-700 text-white' : 'bg-gray-800 text-blue-200 hover:bg-blue-900'}`}
            onClick={() => setTask(t.key)}
            disabled={running}
          >
            {t.label}
          </button>
        ))}
        <button
          className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold shadow transition"
          onClick={handleRun}
          disabled={running}
        >
          {running ? 'Running...' : 'Run'}
        </button>
      </div>
      <div className="flex-1 mt-4 bg-panel border border-gray-800 rounded-xl p-4 shadow-xl overflow-auto">
        {running ? (
          <div className="text-blue-300 font-mono text-sm">Loading model and generating output...</div>
        ) : (
          <div className="text-blue-300 font-mono text-sm whitespace-pre-line min-h-[40px]">{output || 'Paste code and select a task.'}</div>
        )}
        {!llmAvailable && (
          <div className="text-yellow-400 text-xs mt-2">(Model not available or failed to load, using simulated output.)</div>
        )}
      </div>
    </div>
  );
} 