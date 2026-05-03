'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Dashboard() {
  const [currentChapter, setCurrentChapter] = useState(1)

  const chapters = [
    { num: 1, name: 'Apprivoiser le muscle sans crainte', seances: 4 },
    { num: 2, name: 'Construire les fondations', seances: 2 },
    { num: 3, name: 'Maîtriser la mécanique', seances: 2 },
    { num: 4, name: 'La symétrie du guerrier', seances: 4 },
    { num: 5, name: 'Quand les muscles tremblent', seances: 3 },
    { num: 6, name: 'Équilibre et stabilité', seances: 2 },
    { num: 7, name: 'Le tempo de la force', seances: 3 },
    { num: 8, name: 'Tout sur la plateforme', seances: 4 },
  ]

  return (
    <main className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-md border-b border-secondary border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bebas text-accent">⚡</div>
              <h1 className="text-xl font-bebas text-white">FLOWTOFORCE</h1>
            </Link>
            <div className="flex space-x-8">
              <Link href="/dashboard" className="text-accent border-b border-accent font-space text-sm">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-5xl font-bebas text-white mb-2">MON DASHBOARD</h2>
        <p className="text-gray-400 font-space mb-12">Suis ta progression à travers FlowToForce V1</p>

        {/* Chapter Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {chapters.map((chapter) => (
            <button
              key={chapter.num}
              onClick={() => setCurrentChapter(chapter.num)}
              className={`p-4 rounded-lg font-bebas text-sm border transition ${
                currentChapter === chapter.num
                  ? 'bg-accent text-primary border-accent'
                  : 'bg-black bg-opacity-50 text-white border-secondary border-opacity-30 hover:border-secondary'
              }`}
            >
              CHAP {chapter.num}
              <div className="text-xs mt-1 opacity-75">{chapter.seances} séances</div>
            </button>
          ))}
        </div>

        {/* Current Chapter Detail */}
        <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 rounded-lg p-8">
          <div className="mb-8">
            <h3 className="text-4xl font-bebas text-accent mb-2">
              CHAPITRE {currentChapter}
            </h3>
            <p className="text-xl text-gray-300 font-space">
              {chapters[currentChapter - 1].name}
            </p>
          </div>

          {/* Seances Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: chapters[currentChapter - 1].seances }).map((_, i) => {
              const seanceLetters = ['A', 'B', 'C', 'D']
              return (
                <Link
                  key={i}
                  href={`/seance/${currentChapter}-${seanceLetters[i]}`}
                  className="bg-gradient-to-br from-secondary to-blue-900 p-6 rounded-lg hover:shadow-lg hover:shadow-secondary transition group"
                >
                  <div className="text-sm font-bebas text-white mb-2">
                    SÉANCE {seanceLetters[i]}
                  </div>
                  <h4 className="text-2xl font-bebas text-white group-hover:text-accent transition">
                    ENTRAÎNEMENT {currentChapter}{seanceLetters[i]}
                  </h4>
                  <div className="text-gray-200 text-sm mt-4 font-space">
                    Clique pour commencer
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 p-6 rounded-lg text-center">
            <div className="text-3xl font-bebas text-accent mb-2">24</div>
            <p className="text-gray-400 font-space">Séances totales</p>
          </div>
          <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 p-6 rounded-lg text-center">
            <div className="text-3xl font-bebas text-accent mb-2">0</div>
            <p className="text-gray-400 font-space">Complétées</p>
          </div>
          <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 p-6 rounded-lg text-center">
            <div className="text-3xl font-bebas text-accent mb-2">0%</div>
            <p className="text-gray-400 font-space">Progression</p>
          </div>
        </div>
      </div>
    </main>
  )
}
