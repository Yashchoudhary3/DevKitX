import ASTExplorer from '../../../components/ASTExplorer';

export default function ASTExplorerPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Paste JavaScript code to visualize its Abstract Syntax Tree (AST). Hover nodes to see their type and structure.</div>
      <ASTExplorer />
    </div>
  );
} 