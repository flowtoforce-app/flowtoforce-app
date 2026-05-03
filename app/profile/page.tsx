'use client'

import Link from 'next/link'

export default function Profile() {
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
              <Link href="/profile" className="text-accent border-b border-accent font-space text-sm">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-5xl font-bebas text-white mb-2">MON PROFIL</h2>
        <p className="text-gray-400 font-space mb-12">Gère tes informations et ta progression</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-black bg-opacity-50 border border-secondary border-opacity-30 rounded-lg p-8">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center font-bebas text-3xl">
                👤
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bebas text-white">Mon Profil</h3>
                <p className="text-gray-400 font-space">FlowToForce V1 - En cours</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-accent font-bebas text-sm mb-2">NOM</label>
                <input
                  type="text"
                  placeholder="Entre ton nom"
                  className="w-full bg-black bg-opacity-70 border border-secondary border-opacity-30 text-white p-3 rounded-lg font-space placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-accent font-bebas text-sm mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="ton.email@exemple.com"
                  className="w-full bg-black bg-opacity-70 border border-secondary border-opacity-30 text-white p-3 rounded-lg font-space placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-accent font-bebas text-sm mb-2">OBJECTIF</label>
                <select className="w-full bg-black bg-opacity-70 border border-secondary border-opacity-30 text-white p-3 rounded-lg font-space">
                  <option>Gagner de la force</option>
                  <option>Prendre du muscle</option>
                  <option>Perdre de la graisse</option>
                  <option>Améliorer la mobilité</option>
                </select>
              </div>
              <button className="w-full bg-accent text-primary font-bebas py-3 rounded-lg hover:bg-yellow-500 transition">
                SAUVEGARDER LES MODIFICATIONS
              </button>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 p-6 rounded-lg">
              <h4 className="font-bebas text-accent text-lg mb-4">STATISTIQUES</h4>
              <div className="space-y-3 text-sm font-space">
                <div className="flex justify-between">
                  <span className="text-gray-400">Séances complétées</span>
                  <span className="text-accent font-bebas">0 / 24</span>
                </div>
                <div className="w-full bg-black rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-gray-400">Chapitre actuel</span>
                  <span className="text-accent font-bebas">1 / 8</span>
                </div>
                <div className="w-full bg-black rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '12.5%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-50 border border-secondary border-opacity-30 p-6 rounded-lg">
              <h4 className="font-bebas text-accent text-lg mb-4">JOURS ACTIFS</h4>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-black bg-opacity-70 border border-secondary border-opacity-30 rounded-lg flex items-center justify-center text-xs font-bebas text-gray-400"
                  >
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
