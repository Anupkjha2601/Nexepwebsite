import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Nexep India</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Leading provider of engineering solutions, delivering excellence in automation and process control.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-blue-400 transition-colors">Products</a></li>
              <li><a href="#partners" className="hover:text-blue-400 transition-colors">Partners</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Fluid Control & Steam Solutions</li>
              <li className="text-gray-400">Advanced Process Analyzer Systems</li>
              <li className="text-gray-400">Industrial Measurement Solutions</li>
              <li className="text-gray-400">Skid Engineering & Custom System Design</li>
              <li className="text-gray-400">Installation, Commissioning & Technical Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-blue-400" />
                <span className="text-gray-400">F-39, West Vinod Nagar, East Delhi, Delhi, 110092</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-blue-400" />
                <span className="text-gray-400">+91 7042615692</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-blue-400" />
                <span className="text-gray-400">sales@nexep.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Nexep India Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
