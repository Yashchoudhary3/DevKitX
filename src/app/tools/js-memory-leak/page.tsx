import JSMemoryLeakDetector from '../../../components/JSMemoryLeakDetector';

export default function JSMemoryLeakPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Paste JavaScript code to simulate memory allocations and detect potential memory leaks caused by closures.</div>
      <JSMemoryLeakDetector />
    </div>
  );
} 