export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            SocialHub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gérez tous vos réseaux sociaux en un seul endroit. Planifiez, publiez et analysez vos contenus.
          </p>
          <div className="space-x-4">
            <a 
              href="/auth/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
            >
              Se connecter
            </a>
            <a 
              href="/auth/register" 
              className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-8 rounded-lg border-2 border-blue-600 transition duration-200"
            >
              S'inscrire
            </a>
          </div>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Analytics Avancés</h3>
            <p className="text-gray-600">
              Suivez les performances de vos publications sur tous vos réseaux sociaux.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-green-600 text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold mb-2">Planification</h3>
            <p className="text-gray-600">
              Planifiez vos publications à l'avance pour maintenir une présence constante.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-purple-600 text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">Multi-Plateformes</h3>
            <p className="text-gray-600">
              Gérez Facebook, Instagram, Twitter, LinkedIn et bien plus encore.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
