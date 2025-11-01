'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(
    '<h2>Your generated site will appear here.</h2>'
  );

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setPreview(data.html);
    } catch (error) {
      console.error('Error:', error);
      setPreview('<p>Something went wrong.</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">CreateNow.io</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 border border-gray-600 rounded">
            Login
          </button>
          <button className="px-4 py-2 bg-cyan-400 text-black rounded">
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 p-6">
        {/* Left side (input area) */}
        <section>
          <h2 className="text-3xl mb-3 font-semibold">
            Build a full website in 10 minutes with AI.
          </h2>
          <p className="mb-4 text-gray-400">
            Describe your idea, and CreateNow.io will generate it instantly.
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Build a website for my cafe"
            rows={5}
            className="w-full p-3 rounded bg-[#0B1220] border border-gray-700 text-white mb-4"
          ></textarea>

          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition"
          >
            {loading ? 'Generating...' : 'Generate Website'}
          </button>
        </section>

        {/* Right side (preview) */}
        <section className="bg-white text-black rounded overflow-hidden">
          <iframe
            srcDoc={preview}
            sandbox="allow-scripts"
            className="w-full h-[500px] border-none"
          ></iframe>
        </section>
      </main>

      {/* Download Button */}
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => {
            const blob = new Blob([preview], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated-website.html';
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="w-full py-3 bg-green-400 text-black font-semibold rounded hover:bg-green-300 transition"
        >
          Download Website
        </button>
      </div>
    </div>
  );
}
