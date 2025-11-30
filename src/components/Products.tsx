import { useState } from 'react';
import { Package, CheckCircle } from 'lucide-react';

// ---- Local product type (if using JS, you can ignore types) ----
type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url?: string | null;
  features: string[];
  applications: string;
  display_order: number;
};

// ---- Replace image_url values with your real public URLs when ready ----
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Safety Instrumented System (SIS)',
    category: 'Safety Systems',
    description:
      'Integrated Safety Instrumented System for emergency shutdown, high-reliability trip logic and SIL-compliant safety functions.',
    image_url: '/images/sis-placeholder.png',
    features: [
      'SIL-capable architecture',
      'Real-time trip monitoring',
      'Redundant I/O and diagnostics',
      'Fast fail-safe actuation'
    ],
    applications: 'Critical process shutdowns, refinery safety, chemical reactors',
    display_order: 1
  },
  {
    id: 2,
    name: 'Pressure Reducing Station (Skid)',
    category: 'Fluid Control',
    description:
      'Skid-mounted PR Station designed for stable downstream pressure control, fitted with isolation, filters and safety valves.',
    image_url: '/images/prs-placeholder.png',
    features: ['Skid-mounted', 'ASME-compliant', 'Integrated safety valves', 'Easy maintenance access'],
    applications: 'Steam distribution, instrument air, utility supply',
    display_order: 2
  },
  {
    id: 3,
    name: 'Oxygen Analyzer System',
    category: 'Process Analyzer',
    description:
      'Continuous oxygen monitoring solution for combustion optimisation and safety. Low drift, online calibration support.',
    image_url: '/images/oxygen-analyzer.png',
    features: ['Continuous measurement', 'Auto-calibration support', 'Low maintenance', 'Field-mountable'],
    applications: 'Boilers, furnaces, incinerators, process safety',
    display_order: 3
  },
  {
    id: 4,
    name: 'Crude Oil Quality / Salt-in-Crude Analyzer',
    category: 'Process Analyzer',
    description:
      'Online crude monitoring for salt, water and basic quality metrics — helps refineries manage desalting and blending.',
    image_url: '/images/crude-analyzer.png',
    features: ['Salt detection', 'Water cut estimation', 'Fast response', 'Integration with DCS'],
    applications: 'Refineries, crude receiving stations, desalting units',
    display_order: 4
  },
  {
    id: 5,
    name: 'Radar Level Transmitter',
    category: 'Measurement',
    description:
      'Non-contact radar level transmitter for liquids and solids — reliable in vapour, foam and vaporous environments.',
    image_url: '/images/radar-level.png',
    features: ['Non-contact measurement', 'High accuracy', 'Works in vapour/foam', '4-20mA / HART'],
    applications: 'Tanks, silos, separators, high-temp vessels',
    display_order: 5
  },
  {
    id: 6,
    name: 'Coriolis / Density & Flow Meter',
    category: 'Measurement',
    description:
      'High-precision density and mass flow measurement for custody transfer and process control applications.',
    image_url: '/images/flow-density.png',
    features: ['Mass flow measurement', 'Density output', 'Custody transfer capable', 'Wide turndown'],
    applications: 'Refinery products, chemical dosing, batching systems',
    display_order: 6
  },
  {
    id: 7,
    name: 'Solenoid / Motorised Control Valve',
    category: 'Valves',
    description:
      'Electrically or pneumatically actuated valves for process control, isolation and automated operations.',
    image_url: '/images/valve.png',
    features: ['Fast actuation', 'Modulating control', 'Low leakage options', 'Actuator diagnostics'],
    applications: 'Control loops, safety isolation, automated valves in skids',
    display_order: 7
  },
  {
    id: 8,
    name: 'Skid-mounted Purging & Sample Station',
    category: 'Skid Systems',
    description:
      'Custom-built skid for purging, sampling and conditioning of process streams — turnkey with piping & instrumentation.',
    image_url: '/images/skid.png',
    features: ['Turnkey skid', 'Pre-tested', 'Compact footprint', 'Client-specific instrumentation'],
    applications: 'Sampling lines, purging stations, pilot plants',
    display_order: 8
  },
  {
    id: 9,
    name: 'Steam Trap & Steam Management',
    category: 'Fluid Control',
    description:
      'Steam trap selection, surveys and energy-saving retrofits to improve steam system efficiency and reliability.',
    image_url: '/images/steam-trap.png',
    features: ['Trap audits', 'Energy optimisation', 'Replacement services', 'Condition monitoring'],
    applications: 'Steam distribution networks, heat exchangers, process heaters',
    display_order: 9
  }
];

export default function ProductsLocal() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = selectedCategory === 'All'
    ? PRODUCTS.sort((a,b)=>a.display_order - b.display_order)
    : PRODUCTS.filter(p=>p.category === selectedCategory).sort((a,b)=>a.display_order - b.display_order);

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive industrial solutions — fluid control, analyzers, measurement and skid systems.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={()=>setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium ${
                selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-60 bg-gray-50 flex items-center justify-center overflow-hidden">
                {p.image_url ? (
                 <img
                    src={p.image_url}
                    alt={p.name}
                    className="max-h-80 max-w-70 object-contain"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      // hide broken image to show grey box instead
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-gray-500">No Image</div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center mb-2">
                  <Package className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-600">{p.category}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{p.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {p.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Applications:</span> {p.applications}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
