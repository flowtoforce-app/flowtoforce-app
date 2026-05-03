'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Seance({ params }: { params: { id: string } }) {
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([])

  // Sample data - in future this will come from database
  const seanceData = {
    chapter: parseInt(params.id.split('-')[0]),
    seance: params.id.split('-')[1],
    title: 'Apprivoiser le muscle sans crainte',
    duration: '45-60 min',
    difficulty: 'Débutant',
    exercises: [
      {
        name: 'Chest Press (Machine)',
        sets: 3,
        reps: '8-10',
        rest: '90 sec',
        notes: 'Contrôle complet du mouvement',
      },
      {
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: '8-10',
        rest: '90 sec',
        notes: 'Engager les épaules antérieures',
      },
      {
        name: 'Cable Flyes',
        sets: 3,
        reps: '12-15',
        rest: '60 sec',
        notes: 'Étirement maximal à la fin du mouvement',
      },
      {
        name: 'Push-ups (Assisted si besoin)',
        sets: 3,
        reps: 'Max reps',
        rest: '90 sec',
        notes: 'Progression naturelle',
      },
    ],
  }

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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/dashboard" className="text-secondary hover:text-accent transition font-space text-sm">
          ← Retour au dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <span className="font-bebas text-accent text-lg border border-accent px-4 py-2 rounded">
              CHAPITRE {seanceData.chapter}
            </span>
            <span className="font-bebas text-secondary text-lg">SÉANCE {seanceData.seance}</span>
          </div>
          <h1 className="text-5xl font-bebas text-white mb-4">{seanceData.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm font-space">
            <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 px-4 py-2 rounded">
              <span className="text-gray-400">Durée: </span>
              <span className="text-accent">{seanceData.duration}</span>
            </div>
            <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 px-4 py-2 rounded">
              <span className="text-gray-400">Niveau: </span>
              <span className="text-accent">{seanceData.difficulty}</span>
            </div>
            <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 px-4 py-2 rounded">
              <span className="text-gray-400">Exercices: </span>
              <span className="text-accent">{seanceData.exercises.length}</span>
            </div>
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4 mb-12">
          {seanceData.exercises.map((exercise, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-50 border border-secondary border-opacity-30 p-6 rounded-lg hover:border-accent transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={completedExercises[index] || false}
                      onChange={(e) => {
                        const newCompleted = [...completedExercises]
                        newCompleted[index] = e.target.checked
                        setCompletedExercises(newCompleted)
                      }}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <h3
                      className={`text-xl font-bebas transition ${
                        completedExercises[index]
                          ? 'text-gray-500 line-through'
                          : 'text-white'
                      }`}
                    >
                      {exercise.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-sm font-space">
                      <span className="text-gray-400">Séries</span>
                      <div className="text-accent font-bebas">{exercise.sets}</div>
                    </div>
                    <div className="text-sm font-space">
                      <span className="text-gray-400">Répétitions</span>
                      <div className="text-accent font-bebas">{exercise.reps}</div>
                    </div>
                    <div className="text-sm font-space">
                      <span className="text-gray-400">Repos</span>
                      <div className="text-accent font-bebas">{exercise.rest}</div>
                    </div>
                  </div>

                  <p className="text-gray-300 font-space text-sm border-t border-secondary border-opacity-30 pt-3 mt-3">
                    <span className="text-accent font-bebas">💡 Note: </span>
                    {exercise.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Button */}
        <div className="flex gap-4">
          <button className="flex-1 bg-accent text-primary font-bebas py-4 rounded-lg hover:bg-yellow-500 transition text-lg">
            ✅ MARQUER COMME COMPLÈTE
          </button>
          <button className="px-6 bg-secondary text-white font-bebas py-4 rounded-lg hover:bg-blue-600 transition">
            → PROCHAINE SÉANCE
          </button>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-black bg-opacity-50 border border-secondary border-opacity-30 p-8 rounded-lg">
          <h3 className="text-2xl font-bebas text-accent mb-4">CONSEILS IMPORTANTS</h3>
          <ul className="space-y-3 text-gray-300 font-space text-sm">
            <li>✓ Échauffement: 5-10 min de cardio léger + mobilité dynamique</li>
            <li>✓ Hydratation: bois de l'eau entre les séries</li>
            <li>✓ Forme &gt; Poids: privilégie toujours la technique</li>
            <li>✓ Progression: ajoute du poids quand les 10 derniers reps sont confortables</li>
            <li>✓ Nutrition: 2-3h après ta séance, repas avec protéines + glucides</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
