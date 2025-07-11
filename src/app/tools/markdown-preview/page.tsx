import MarkdownPreview from '../../../components/MarkdownPreview';

export default function MarkdownPreviewPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Live preview and edit Markdown. Switch themes, export HTML, and see your content styled instantly.</div>
      <MarkdownPreview />
    </div>
  );
} 