import JSRunner from '../../../components/JSRunner';

export default function JSRunnerPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Run JavaScript code in a secure, sandboxed environment. See live output, memory usage, and execution time.</div>
      <JSRunner />
    </div>
  );
} 