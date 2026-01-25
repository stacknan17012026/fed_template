"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white ">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FED App</h1>
            </div>
            <div className="hidden md:flex gap-6">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Welcome to Your Next.js App
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Production-grade Next.js structure with TypeScript, Tailwind CSS,
            and best practices built-in.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Try It Out</h3>
          <div className="inline-flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <button
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition font-medium"
            >
              -
            </button>
            <span className="text-3xl font-bold text-gray-900 min-w-16">
              {count}
            </span>
            <button
              onClick={() => setCount(count + 1)}
              className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition font-medium"
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              className="ml-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition font-medium"
            >
              Reset
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-lg bg-blue-600 px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to build?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Check out the documentation files included in your project.
          </p>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            View Next.js Docs
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-sm text-gray-600">
            <p>© 2026 Your App. Built with Next.js 16 and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    id: 1,
    icon: "⚡",
    name: "Server Components",
    description: "Server components by default for better performance",
  },
  {
    id: 2,
    icon: "🔒",
    name: "Type Safe",
    description: "TypeScript with strict mode for safer code",
  },
  {
    id: 3,
    icon: "🎨",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework built-in",
  },
  {
    id: 4,
    icon: "📁",
    name: "Organized",
    description: "Production-grade folder structure",
  },
  {
    id: 5,
    icon: "🧪",
    name: "Testing Ready",
    description: "Structure for unit, integration, and E2E tests",
  },
  {
    id: 6,
    icon: "📚",
    name: "Documented",
    description: "Comprehensive documentation included",
  },
];
