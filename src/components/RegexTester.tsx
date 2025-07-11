"use client";
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
// Local regex explanation (simple, not as advanced as regex101)
function explainRegex(pattern: string, flags: string) {
  try {
    const re = new RegExp(pattern, flags);
    let parts = [];
    if (flags) parts.push(`Flags: ${flags}`);
    if (pattern.startsWith("^")) parts.push("Anchors start of line");
    if (pattern.endsWith("$")) parts.push("Anchors end of line");
    if (pattern.includes("(") && pattern.includes(")")) parts.push("Capturing group(s)");
    if (pattern.includes("[") && pattern.includes("]")) parts.push("Character class");
    if (pattern.includes("|")) parts.push("Alternation (or)");
    if (pattern.includes("?")) parts.push("Optional or non-greedy");
    if (pattern.includes("+")) parts.push("One or more");
    if (pattern.includes("*")) parts.push("Zero or more");
    if (pattern.includes(".")) parts.push("Any character");
    return parts.length ? parts.join(", ") : "Simple pattern";
  } catch {
    return "Invalid regex";
  }
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("(\\w+)");
  const [flags, setFlags] = useState("g");
  const [testText, setTestText] = useState("Hello world! Regex test.");
  const [saved, setSaved] = useState<{ pattern: string; flags: string }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("devplayground_regexes");
    if (data) setSaved(JSON.parse(data));
  }, []);

  const saveRegex = () => {
    const newSaved = [...saved, { pattern, flags }];
    setSaved(newSaved);
    localStorage.setItem("devplayground_regexes", JSON.stringify(newSaved));
  };

  const loadRegex = (i: number) => {
    setPattern(saved[i].pattern);
    setFlags(saved[i].flags);
    setSelected(i);
  };

  let regex: RegExp | null = null;
  let error = "";
  try {
    regex = new RegExp(pattern, flags);
  } catch (e: any) {
    error = e.message;
  }
  let matches: RegExpExecArray[] = [];
  if (regex && !error) {
    let m;
    while ((m = regex.exec(testText))) {
      matches.push(m);
      if (!regex.global) break;
    }
  }
  function highlightMatches(text: string, regex: RegExp) {
    if (!regex.global) regex = new RegExp(regex.source, regex.flags + "g");
    let lastIndex = 0;
    const out: any[] = [];
    text.replace(regex, (match, ...args) => {
      const matchIndex = args[args.length - 2];
      if (lastIndex < matchIndex) {
        out.push(text.slice(lastIndex, matchIndex));
      }
      out.push(<mark className="bg-yellow-400 text-black px-1 rounded" key={matchIndex}>{match}</mark>);
      lastIndex = matchIndex + match.length;
      return match;
    });
    if (lastIndex < text.length) out.push(text.slice(lastIndex));
    return out;
  }
  return (
    <div className="flex flex-col gap-2 animate-fade-in h-full min-h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-800/90 to-purple-800/90 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white tracking-wide flex-1">Regex Tester</h2>
        </div>
        <div className="flex gap-2 px-4 py-2 bg-transparent border-b border-gray-800 items-center">
          <input
            className="px-2 py-1 rounded border border-gray-700 bg-gray-900 text-white w-1/2"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="Pattern"
            aria-label="Regex pattern"
          />
          <input
            className="px-2 py-1 rounded border border-gray-700 bg-gray-900 text-white w-20"
            value={flags}
            onChange={e => setFlags(e.target.value)}
            placeholder="Flags"
            aria-label="Regex flags"
          />
          <button className="ml-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-sm font-semibold transition" onClick={saveRegex}>Save</button>
          <select className="ml-2 px-2 py-1 rounded border border-gray-700 bg-gray-900 text-white text-sm" value={selected ?? ''} onChange={e => loadRegex(Number(e.target.value))}>
            <option value="">Load saved</option>
            {saved.map((r, i) => <option key={i} value={i}>{r.pattern} /{r.flags}</option>)}
          </select>
        </div>
        <div className="px-4 py-2 text-xs text-blue-300 bg-transparent border-b border-gray-800">
          <b>Explanation:</b> {explainRegex(pattern, flags)}
        </div>
        <CodeMirror
          value={testText}
          height="20vh"
          extensions={[oneDark]}
          onChange={val => setTestText(val)}
          className="flex-1 border-none bg-transparent text-lg font-mono min-h-[100px]"
        />
        <div className="px-4 py-2 text-sm text-gray-400 bg-transparent border-t border-gray-800">
          {error ? <span className="text-red-400">Invalid regex: {error}</span> : ""}
        </div>
      </div>
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-panel border border-gray-800">
        <div className="flex items-center px-4 py-2 bg-gradient-to-r from-green-800/90 to-blue-800/90 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white tracking-wide flex-1">Matches</h3>
        </div>
        <div className="flex-1 p-4 font-mono text-green-400 overflow-auto text-base min-h-[120px] bg-transparent">
          {error ? (
            <span className="text-gray-500">Cannot test regex.</span>
          ) : (
            <div className="text-white text-base mb-2">
              {highlightMatches(testText, regex!)}
            </div>
          )}
          {matches.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-gray-300 mb-1">Groups:</div>
              <ul className="text-xs text-gray-400">
                {matches.map((m, i) => (
                  <li key={i}>
                    <span className="text-blue-400">Match {i + 1}:</span> {m[0]} {m.length > 1 && (
                      <span className="ml-2">Groups: {m.slice(1).map((g, j) => <span key={j} className="text-purple-400 ml-1">[{g}]</span>)}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 