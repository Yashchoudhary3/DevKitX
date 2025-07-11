import JSONViewer from '../../../components/JSONViewer';

export default function JSONViewerPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-blue-200 text-sm mb-2">Validate, format, and explore JSON data. View as a collapsible tree, copy paths, and download as .json.</div>
      <JSONViewer />
    </div>
  );
} 