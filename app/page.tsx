'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-secondary border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bebas text-accent">⚡</div>
              <h1 className="text-xl font-bebas text-white">FLOWTOFORCE</h1>
            </div>
            <div className="flex space-x-8">
              <Link href="/dashboard" className="text-white hover:text-accent transition font-space text-sm">
                Dashboard
              </Link>
              <Link href="/programs" className="text-white hover:text-accent transition font-space text-sm">
                Programs
              </Link>
              <Link href="/profile" className="text-white hover:text-accent transition font-space text-sm">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-6xl font-bebas text-white mb-4 tracking-wider">
          FLOW TO YOUR FORCE
        </h2>
        <p className="text-xl text-gray-300 mb-8 font-space max-w-2xl mx-auto">
          Un programme d'entraînement personnalisé pour transformer ton corps et ton mental.
          De la mobilité à la force, maîtrise chaque séance.
        </p>
        <Link href="/dashboard" className="inline-block bg-accent text-primary font-bebas text-lg px-8 py-3 rounded-lg hover:bg-yellow-500 transition transform hover:scale-105">
          START YOUR JOURNEY
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-secondary border-opacity-30">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-2xl font-bebas text-accent mb-2">8 Chapitres</h3>
            <p className="text-gray-300 font-space text-sm">24 séances structurées pour progresser rapidement</p>
          </div>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-secondary border-opacity-30">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-2xl font-bebas text-accent mb-2">Musculation</h3>
            <p className="text-gray-300 font-space text-sm">Techniques éprouvées + anatomie + nutrition</p>
          </div>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg border border-secondary border-opacity-30">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bebas text-accent mb-2">Suivi</h3>
            <p className="text-gray-300 font-space text-sm">Track ta progression et tes performances</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-secondary border-opacity-30 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 font-space text-sm">
          <p>FlowToForce © 2026. Tous droits réservés. 🤍</p>
        </div>
      </footer>
    </main>
  )
}
