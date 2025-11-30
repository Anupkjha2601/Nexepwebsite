import { useEffect, useState } from 'react';
import { ExternalLink, Handshake } from 'lucide-react';



type Partner = {
  id: number;
  name: string;
  logo_url: string;
  description: string;
  website_url?: string | null;
};

const STATIC_PARTNERS: Partner[] = [
  {
    id: 1,
    name: "Yoshitake Inc. (Japan)",
    logo_url: "/images/yoshitake.png", // apna path lagana
    description:
      "Global leader in steam systems and fluid control valves, providing energy-efficient industrial solutions.",
    website_url: "https://www.yoshitake-inc.com/",
  },
  {
    id: 2,
    name: "Modcon Systems (UK)",
    logo_url: "/images/modcon.png", // apna path lagana
    description:
      "AI-driven process analyzers for oil refining, natural gas, chemical and energy industries.",
    website_url: "https://www.modcon-systems.com/",
  },
  {
    id: 3,
    name: "OEM Industrial Measurement Partner",
    logo_url: "/images/rettar.png", // generic OEM, Rettar naam nahi
    description:
      "Selected OEM partner for radar level, 3D scanning and industrial measurement technologies.",
    website_url: "https://www.rettar.com/en",
  },
];

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    // ✅ Pehle Supabase se data aa raha tha
    // Ab hum seedha apne static data se fill kar rahe hain
    setPartners(STATIC_PARTNERS);
  }, []);

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Handshake className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with world-leading manufacturers to deliver exceptional solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-8"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={partner.logo_url}
                    alt={`${partner.name} logo`}
                    className="w-80% h-50% object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{partner.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {partner.description}
                  </p>
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {partners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No partners to display at the moment.</p>
          </div>
        )}

        <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a Partner</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're always looking to collaborate with innovative companies that share our
            commitment to excellence in process and energy solutions.
          </p>
          <button
            onClick={() => (window.location.href = '#contact')}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
