"use client";
import { useRef, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export default function JSRunner() {
  const [code, setCode] = useState("console.log('Hello, Dev Playground!')");
  const [output, setOutput] = useState<string[]>([]);
  const [srcDoc, setSrcDoc] = useState('');
  const [execTime, setExecTime] = useState<number | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [showInspector, setShowInspector] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [sandboxGlobals, setSandboxGlobals] = useState<any>({});

  const runCode = () => {
    setOutput([]);
    setExecTime(null);
    setMemory(null);
    setSandboxGlobals({});
    const script = `
      const __start = performance.now();
      window.console = {
        log: (...args) => parent.postMessage({ type: 'log', args }, '*'),
        error: (...args) => parent.postMessage({ type: 'error', args }, '*'),
        warn: (...args) => parent.postMessage({ type: 'warn', args }, '*'),
        info: (...args) => parent.postMessage({ type: 'info', args }, '*'),
      };
      try {
        ${code}
      } catch (e) {
        parent.postMessage({ type: 'error', args: [e.message] }, '*');
      }
      const __end = performance.now();
      parent.postMessage({ type: 'timer', args: [__end - __start] }, '*');
      if (window.performance && performance.memory) {
        parent.postMessage({ type: 'memory', args: [performance.memory.usedJSHeapSize] }, '*');
      }
      // Inspector: send global keys
      parent.postMessage({ type: 'globals', args: [Object.keys(window).filter(k => !k.startsWith('_') && !k.startsWith('webkit'))] }, '*');
    `;
    setSrcDoc(`<script>${script}<\/script>`);
  };

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === 'timer') setExecTime(e.data.args[0]);
      else if (e.data.type === 'memory') setMemory(e.data.args[0]);
      else if (e.data.type === 'globals') setSandboxGlobals(e.data.args[0]);
      else setOutput((prev) => [...prev, `[${e.data.type}] ${e.data.args.join(' ')}`]);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="flex flex-col gap-2 animate-fade-in h-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-800/90 to-purple-800/90 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white tracking-wide flex-1">JavaScript Code Runner</h2>
          <button
            className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold shadow transition"
            onClick={runCode}
          >
            Run
          </button>
        </div>
        <CodeMirror
          value={code}
          height="40vh"
          extensions={[javascript(), oneDark]}
          onChange={val => setCode(val)}
          className="flex-1 border-none bg-transparent text-lg font-mono min-h-[200px]"
        />
        <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-800 bg-black/30 text-sm text-gray-300">
          {execTime !== null && <span>23f1e0f <b>Execution:</b> {execTime.toFixed(2)} ms</span>}
          {memory !== null && <span>83ede0 <b>Memory:</b> {(memory / 1024 / 1024).toFixed(2)} MB</span>}
          <button className="ml-auto text-blue-400 hover:underline" onClick={() => setShowCode(v => !v)}>{showCode ? 'Hide' : 'Show'} Injected Code</button>
          <button className="text-purple-400 hover:underline" onClick={() => setShowInspector(v => !v)}>{showInspector ? 'Hide' : 'Show'} Sandbox Inspector</button>
        </div>
        {showCode && (
          <pre className="bg-black/80 text-green-300 p-4 text-xs overflow-x-auto border-t border-gray-800">{code}</pre>
        )}
        {showInspector && (
          <div className="bg-black/80 text-blue-200 p-4 text-xs border-t border-gray-800">
            <b>Global Variables in Sandbox:</b>
            <div className="flex flex-wrap gap-2 mt-2">
              {sandboxGlobals && Array.isArray(sandboxGlobals) && sandboxGlobals.length > 0 ? sandboxGlobals.map((k: string) => <span key={k} className="bg-blue-900/60 px-2 py-1 rounded text-xs">{k}</span>) : <span className="text-gray-400">(none)</span>}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-green-800/90 to-blue-800/90 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white tracking-wide flex-1">Output</h3>
        </div>
        <div className="flex-1 p-4 font-mono text-green-400 overflow-auto text-base min-h-[120px] bg-transparent">
          {output.length === 0 ? <span className="text-gray-500">No output yet.</span> : output.map((line, i) => <div key={i}>{line}</div>)}
        </div>
        <iframe
          ref={iframeRef}
          title="JS Sandbox"
          sandbox="allow-scripts"
          style={{ position: 'absolute', left: '-9999px', width: 400, height: 300, border: 'none' }}
          srcDoc={srcDoc}
        />
      </div>
    </div>
  );
} 