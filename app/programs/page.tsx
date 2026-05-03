'use client'

import Link from 'next/link'

export default function Programs() {
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
              <Link href="/programs" className="text-accent border-b border-accent font-space text-sm">
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
        <h2 className="text-5xl font-bebas text-white mb-2">NOS PROGRAMMES</h2>
        <p className="text-gray-400 font-space mb-12">Deux niveaux de progression pour tous les objectifs</p>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* V1 Program */}
          <div className="bg-gradient-to-br from-secondary to-blue-900 rounded-lg overflow-hidden border border-accent border-opacity-50 hover:shadow-lg hover:shadow-secondary transition">
            <div className="bg-black bg-opacity-70 p-8">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-4xl font-bebas text-white mb-2">V1</h3>
              <p className="text-gray-300 font-space mb-6">
                Le fondement. 8 chapitres, 24 séances. La structure complète pour transformer ton corps.
              </p>

              <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-6 border border-secondary border-opacity-30">
                <div className="font-bebas text-accent mb-4">CE QUE TU VAS APPRENDRE</div>
                <ul className="space-y-2 text-sm font-space text-gray-300">
                  <li>✓ Anatomie et mécanique musculaire</li>
                  <li>✓ Techniques de musculation</li>
                  <li>✓ Programmation et progression</li>
                  <li>✓ Nutrition et récupération</li>
                  <li>✓ Mobilité et prévention blessures</li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="inline-block w-full text-center bg-accent text-primary font-bebas py-3 rounded-lg hover:bg-yellow-500 transition"
              >
                COMMENCER V1
              </Link>
            </div>
          </div>

          {/* V2 Program */}
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg overflow-hidden border border-gray-500 border-opacity-50 hover:shadow-lg hover:shadow-purple-500 transition opacity-75">
            <div className="bg-black bg-opacity-70 p-8">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-4xl font-bebas text-white mb-2">V2</h3>
              <p className="text-gray-400 font-space mb-6">
                L'évolution. Spécialisation et variantes avancées. Coming soon...
              </p>

              <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-6 border border-gray-500 border-opacity-30">
                <div className="font-bebas text-gray-400 mb-4">EN DÉVELOPPEMENT</div>
                <ul className="space-y-2 text-sm font-space text-gray-400">
                  <li>→ Variantes d'exercices</li>
                  <li>→ Periodisation avancée</li>
                  <li>→ Nutrition personnalisée</li>
                  <li>→ Suivi biomécanique</li>
                  <li>→ Communauté et défis</li>
                </ul>
              </div>

              <button
                disabled
                className="w-full text-center bg-gray-600 text-gray-300 font-bebas py-3 rounded-lg cursor-not-allowed"
              >
                BIENTÔT DISPONIBLE
              </button>
            </div>
          </div>
        </div>

        {/* Why FlowToForce */}
        <div className="mt-16 bg-black bg-opacity-50 border border-secondary border-opacity-30 p-8 rounded-lg">
          <h3 className="text-3xl font-bebas text-accent mb-6">POURQUOI FLOWTOFORCE ?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bebas text-white text-lg mb-2">Basé sur l'anatomie réelle</h4>
              <p className="text-gray-400 font-space text-sm">Chaque exercice est choisi pour son efficacité biomécanique. Pas de trends, pas de bullshit.</p>
            </div>
            <div>
              <h4 className="font-bebas text-white text-lg mb-2">Progressif et scalable</h4>
              <p className="text-gray-400 font-space text-sm">De débutant à avancé. Chaque séance construit sur la précédente. Tu vois les résultats.</p>
            </div>
            <div>
              <h4 className="font-bebas text-white text-lg mb-2">Créé par un CQP IF</h4>
              <p className="text-gray-400 font-space text-sm">Diplômée en musculation. 10+ ans d'expérience. Cette structure, c'est du travail réel.</p>
            </div>
            <div>
              <h4 className="font-bebas text-white text-lg mb-2">Nutrition intégrée</h4>
              <p className="text-gray-400 font-space text-sm">Pas juste d'exos. Les recommandations nutritionnelles pour maximiser tes gains.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
