"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactDiffViewer = dynamic(() => import("react-diff-viewer-continued"), { ssr: false });

function getDiffStats(oldStr: string, newStr: string) {
  const oldLines = oldStr.split("\n");
  const newLines = newStr.split("\n");
  let added = 0, removed = 0;
  let i = 0, j = 0;
  while (i < oldLines.length || j < newLines.length) {
    if (oldLines[i] !== newLines[j]) {
      if (oldLines[i] === undefined) { added++; j++; }
      else if (newLines[j] === undefined) { removed++; i++; }
      else { added++; removed++; i++; j++; }
    } else { i++; j++; }
  }
  return { added, removed };
}

export default function GitDiffVisualizer() {
  const [oldCode, setOldCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [view, setView] = useState<'side' | 'inline'>("side");
  const stats = getDiffStats(oldCode, newCode);

  return (
    <div className="flex flex-col gap-4 animate-fade-in h-full">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide flex-1">Git Diff Visualizer</h2>
        <span className="bg-green-900/80 text-green-300 px-3 py-1 rounded text-xs font-mono mr-2">+{stats.added}</span>
        <span className="bg-red-900/80 text-red-300 px-3 py-1 rounded text-xs font-mono">-{stats.removed}</span>
        <button
          className={`ml-4 px-3 py-1 rounded text-sm font-semibold transition ${view === 'side' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-blue-900'}`}
          onClick={() => setView('side')}
        >
          Side-by-side
        </button>
        <button
          className={`ml-2 px-3 py-1 rounded text-sm font-semibold transition ${view === 'inline' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-blue-900'}`}
          onClick={() => setView('inline')}
        >
          Inline
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <textarea
          className="flex-1 p-3 rounded bg-gray-900 text-white font-mono text-sm border border-gray-800 min-h-[120px]"
          placeholder="Paste old code here..."
          value={oldCode}
          onChange={e => setOldCode(e.target.value)}
        />
        <textarea
          className="flex-1 p-3 rounded bg-gray-900 text-white font-mono text-sm border border-gray-800 min-h-[120px]"
          placeholder="Paste new code here..."
          value={newCode}
          onChange={e => setNewCode(e.target.value)}
        />
      </div>
      <div className="mt-4 rounded-xl overflow-auto bg-panel border border-gray-800 shadow-xl">
        <ReactDiffViewer
          oldValue={oldCode}
          newValue={newCode}
          splitView={view === 'side'}
          showDiffOnly={false}
          leftTitle="Old Code"
          rightTitle="New Code"
          styles={{
            variables: {
              light: {
                diffViewerBackground: '#23283b',
                addedBackground: '#064e3b',
                removedBackground: '#7f1d1d',
                wordAddedBackground: '#166534',
                wordRemovedBackground: '#991b1b',
                addedGutterBackground: '#166534',
                removedGutterBackground: '#991b1b',
                gutterBackground: '#181c24',
                gutterColor: '#a3a3a3',
                codeFoldGutterBackground: '#23283b',
                codeFoldBackground: '#23283b',
                emptyLineBackground: '#23283b',
                highlightBackground: '#312e81',
                highlightGutterBackground: '#312e81',
                removedColor: '#fecaca',
                addedColor: '#bbf7d0',
                codeFoldContentColor: '#a3a3a3',
              },
              dark: {
                diffViewerBackground: '#23283b',
                addedBackground: '#064e3b',
                removedBackground: '#7f1d1d',
                wordAddedBackground: '#166534',
                wordRemovedBackground: '#991b1b',
                addedGutterBackground: '#166534',
                removedGutterBackground: '#991b1b',
                gutterBackground: '#181c24',
                gutterColor: '#a3a3a3',
                codeFoldGutterBackground: '#23283b',
                codeFoldBackground: '#23283b',
                emptyLineBackground: '#23283b',
                highlightBackground: '#312e81',
                highlightGutterBackground: '#312e81',
                removedColor: '#fecaca',
                addedColor: '#bbf7d0',
                codeFoldContentColor: '#a3a3a3',
              },
            },
          }}
        />
      </div>
    </div>
  );
} 