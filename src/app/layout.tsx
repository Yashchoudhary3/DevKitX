'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import '../app/globals.css';
import Head from 'next/head';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { AboutModal } from '../components';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <html lang="en">
      <Head>
        <title>DevKitX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col h-full min-h-screen bg-app">
            <header className="h-16 flex items-center px-8 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
              <h1 className="text-2xl font-semibold tracking-tight text-white">DevKitX</h1>
              <span className="ml-4 text-sm text-gray-200 font-mono">The Ultimate Local-First Developer Tool Suite</span>
              <button
                className="ml-auto px-5 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => setAboutOpen(true)}
                style={{ marginLeft: 'auto' }}
              >
                About
              </button>
            </header>
            <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
            <section className="flex-1 h-full w-full p-8 m-0 flex flex-col gap-8 overflow-y-auto">
              {children}
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
