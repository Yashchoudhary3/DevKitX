import GitDiffVisualizer from '../../../components/GitDiffVisualizer';

export default function GitDiffPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Paste two versions of code to see a Git-style diff. View side-by-side or inline, with commit-style stats.</div>
      <GitDiffVisualizer />
    </div>
  );
} 