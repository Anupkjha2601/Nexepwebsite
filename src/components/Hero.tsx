import { ArrowRight, Beaker, Cog, Users } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Engineering Solutions for Tomorrow
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Nexep India Pvt Ltd delivers cutting-edge automation, control systems, and instrumentation solutions for the process industries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-white"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Beaker className="h-12 w-12 mb-4 text-blue-200" />
            <h3 className="text-xl font-semibold mb-2">Process Excellence</h3>
            <p className="text-blue-100">
              Advanced solutions for Engineering processing, refining, and manufacturing industries
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Cog className="h-12 w-12 mb-4 text-blue-200" />
            <h3 className="text-xl font-semibold mb-2">Automation & Control</h3>
            <p className="text-blue-100">
              State-of-the-art DCS, SCADA, and safety instrumented systems
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Users className="h-12 w-12 mb-4 text-blue-200" />
            <h3 className="text-xl font-semibold mb-2">Trusted Partners</h3>
            <p className="text-blue-100">
              Collaborating with global leaders in industrial technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
