'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tools = [
  { name: 'JS Runner', href: '/tools/js-runner', icon: '💻', key: 'js-runner' },
  { name: 'JSON Viewer', href: '/tools/json-viewer', icon: '🗂️', key: 'json-viewer' },
  { name: 'Regex Tester', href: '/tools/regex-tester', icon: '🔍', key: 'regex-tester' },
  { name: 'Markdown Preview', href: '/tools/markdown-preview', icon: '📝', key: 'markdown-preview' },
  { name: 'Git Diff Visualizer', href: '/tools/git-diff', icon: '🔀', key: 'git-diff' },
  { name: 'AST Explorer', href: '/tools/ast-explorer', icon: '🌳', key: 'ast-explorer' },
  { name: 'JS Memory Leak Detector', href: '/tools/js-memory-leak', icon: '🧠', key: 'js-memory-leak' },
  { name: 'JS Benchmarking Tool', href: '/tools/js-benchmark', icon: '⏱️', key: 'js-benchmark' },
  { name: 'HTML/CSS Runner', href: '/tools/html-css-runner', icon: '🖼️', key: 'html-css-runner' },
  { name: 'API Tester', href: '/tools/api-tester', icon: '🛰️', key: 'api-tester' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-20 md:w-64 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-6 shadow-xl">
      <div className="mb-2 flex flex-col items-center">
        <span className="text-4xl mb-2">🧑‍💻</span>
        <span className="hidden md:block text-xl font-bold tracking-wide text-white">DevKitX</span>
      </div>
      <nav className="flex flex-col gap-4 w-full">
        {tools.map((tool) => {
          const isActive = pathname.startsWith(tool.href);
          return (
            <Link
              key={tool.name}
              href={tool.href}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${isActive ? 'bg-blue-700 text-white font-bold shadow' : 'hover:bg-gray-800 text-white'}`}
            >
              <span className="text-2xl md:text-xl" aria-label={tool.name}>{tool.icon}</span>
              <span className="hidden md:inline text-base font-medium">{tool.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto text-xs text-gray-500 pt-8 hidden md:block">© {new Date().getFullYear()} DevKitX</div>
    </aside>
  );
} 