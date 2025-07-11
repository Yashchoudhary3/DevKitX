import Link from 'next/link';

const tools = [
  { name: 'JS Runner', desc: 'Run JS code in a secure sandbox.', icon: '/file.svg', href: '/tools/js-runner' },
  { name: 'JSON Viewer', desc: 'Validate, format, and explore JSON.', icon: '/globe.svg', href: '/tools/json-viewer' },
  { name: 'Regex Tester', desc: 'Test regex patterns and see matches live.', icon: '/vercel.svg', href: '/tools/regex-tester' },
  { name: 'Markdown Preview', desc: 'Live markdown to HTML preview.', icon: '/next.svg', href: '/tools/markdown-preview' },
  { name: 'Git Diff Visualizer', desc: 'See Git-style diffs and commit stats.', icon: '/window.svg', href: '/tools/git-diff' },
  { name: 'AST Explorer', desc: 'Visualize JavaScript ASTs.', icon: '/window.svg', href: '/tools/ast-explorer' },
  { name: 'JS Memory Leak Detector', desc: 'Simulate and detect JS memory leaks.', icon: '/window.svg', href: '/tools/js-memory-leak' },
  { name: 'JS Benchmarking Tool', desc: 'Compare JS function performance.', icon: '/window.svg', href: '/tools/js-benchmark' },
  { name: 'HTML/CSS Runner', desc: 'Live preview HTML and CSS.', icon: '/window.svg', href: '/tools/html-css-runner' },
  { name: 'API Tester', desc: 'Test REST APIs with a modern UI.', icon: '/window.svg', href: '/tools/api-tester' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <img src="/window.svg" alt="DevKitX" className="w-20 h-20 mb-6 drop-shadow-lg" />
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">DevKitX</h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        DevKitX is the ultimate local-first developer tool suite. Run code, test APIs, visualize ASTs, debug memory, and more—all in your browser. No sign-in, no cloud, no data leaves your device.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mt-6">
        {tools.map((tool) => (
          <ToolCard key={tool.name} name={tool.name} desc={tool.desc} icon={tool.icon} href={tool.href} />
        ))}
      </div>
      <p className="mt-10 text-gray-500 text-sm">Select a tool from the sidebar or dashboard to get started.</p>
    </div>
  );
}

function ToolCard({ name, desc, icon, href }: { name: string; desc: string; icon: string; href: string }) {
  return (
    <Link href={href} className="group bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-800 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
      <img src={icon} alt={name} className="w-10 h-10 mb-3" style={{ filter: 'invert(1) brightness(2)' }} />
      <div className="font-semibold text-lg mb-1 text-white">{name}</div>
      <div className="text-gray-400 text-sm">{desc}</div>
    </Link>
  );
}
