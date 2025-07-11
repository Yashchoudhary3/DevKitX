"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export default function APITester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState(`{
  "Content-Type": "application/json"
}`);
  const [body, setBody] = useState(`{
  "example": 123
}`);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setLoading(true);
    setError(null);
    setResponse(null);
    let parsedHeaders = {};
    try {
      parsedHeaders = headers ? JSON.parse(headers) : {};
    } catch (e) {
      setError("Invalid headers JSON");
      setLoading(false);
      return;
    }
    let fetchOpts: RequestInit = {
      method,
      headers: parsedHeaders,
    };
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      fetchOpts.body = body;
    }
    try {
      const res = await fetch(url, fetchOpts);
      const contentType = res.headers.get("content-type") || "";
      let resBody;
      if (contentType.includes("application/json")) {
        resBody = await res.json();
      } else {
        resBody = await res.text();
      }
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: resBody,
      });
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in h-full">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-bold text-white tracking-wide">API Tester</h2>
        <div className="text-blue-200 text-sm">Test REST APIs. Input method, URL, headers, and JSON body. See response headers, body, and status. Minimal, modern, Monaco-powered.</div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <select
          className="p-2 rounded bg-gray-900 text-white border border-gray-800 font-mono text-base w-28"
          value={method}
          onChange={e => setMethod(e.target.value)}
        >
          {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <input
          className="flex-1 p-2 rounded bg-gray-900 text-white border border-gray-800 font-mono text-base"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold shadow transition"
          onClick={handleSend}
          disabled={loading || !url}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-xs text-gray-400 font-mono">Headers (JSON)</label>
          <textarea
            className="w-full p-2 rounded bg-gray-900 text-white border border-gray-800 font-mono text-xs min-h-[60px]"
            value={headers}
            onChange={e => setHeaders(e.target.value)}
          />
        </div>
        {METHODS.includes(method) && method !== "GET" && (
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-xs text-gray-400 font-mono">Body (JSON)</label>
            <div className="h-32 md:h-40 rounded border border-gray-800 bg-gray-900">
              <MonacoEditor
                height="100%"
                defaultLanguage="json"
                value={body}
                onChange={v => setBody(v || "")}
                theme="vs-dark"
                options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: "off", scrollBeyondLastLine: false }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 mt-4 bg-panel border border-gray-800 rounded-xl p-4 shadow-xl overflow-auto">
        {error && <div className="text-red-400 font-mono text-sm mb-2">{error}</div>}
        {response && (
          <div className="space-y-2">
            <div className="text-green-300 font-mono text-sm">Status: <b>{response.status}</b> {response.statusText}</div>
            <div className="text-blue-300 font-mono text-xs">Headers:</div>
            <pre className="bg-gray-900 text-blue-200 rounded p-2 text-xs overflow-x-auto">{JSON.stringify(response.headers, null, 2)}</pre>
            <div className="text-blue-300 font-mono text-xs">Body:</div>
            <pre className="bg-gray-900 text-green-200 rounded p-2 text-xs overflow-x-auto">{typeof response.body === 'object' ? JSON.stringify(response.body, null, 2) : String(response.body)}</pre>
          </div>
        )}
        {!response && !error && <div className="text-gray-500 text-sm">Enter details and hit Send to test an API.</div>}
      </div>
    </div>
  );
} 