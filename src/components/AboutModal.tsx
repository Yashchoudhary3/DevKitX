import React from 'react';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full relative text-white border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Close About Modal"
        >
          &times;
        </button>
        <header className="mb-4 text-center">
          <h2 className="text-3xl font-bold text-white">About Us</h2>
        </header>
        <section className="space-y-3 text-base">
          <p>
            <strong>Created by:</strong> Yash Choudhary
          </p>
          <p>
            <strong>Contact:</strong> <a href="mailto:choudharyyash1512@gmail.com" className="underline text-blue-400">choudharyyash1512@gmail.com</a>
          </p>
          <p>
            <strong>About this app:</strong> This developer playground was created to provide a suite of tools for developers to experiment, test, and visualize code and data. The idea was born from the need for a single platform where developers can access utilities like API testing, AST exploration, code benchmarking, memory leak detection, JSON viewing, markdown previewing, regex testing, and more—all in one place. The goal is to make development, debugging, and learning more efficient and enjoyable.
          </p>
          <div>
            <strong>Features include:</strong>
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>API Tester</li>
              <li>AST Explorer</li>
              <li>Git Diff Visualizer</li>
              <li>HTML/CSS Runner</li>
              <li>JavaScript Benchmark Tool</li>
              <li>JavaScript Memory Leak Detector</li>
              <li>JavaScript Runner</li>
              <li>JSON Viewer</li>
              <li>Markdown Preview</li>
              <li>Regex Tester</li>
              <li>Text Transformer</li>
            </ul>
          </div>
          <p className="pt-2 text-center text-gray-400 text-sm">
            Thank you for visiting and using the Developer Playground!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutModal; 