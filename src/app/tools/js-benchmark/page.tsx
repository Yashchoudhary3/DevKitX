import JSBenchmarkTool from '../../../components/JSBenchmarkTool';

export default function JSBenchmarkPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Paste multiple JavaScript functions and compare their performance. See rankings and a bar graph of execution times.</div>
      <JSBenchmarkTool />
    </div>
  );
} 