import { Award, Target, Lightbulb, Shield } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Nexep India</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading provider of engineering solutions, committed to excellence in automation and process control
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Industrial facility"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Company</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Nexep India Pvt Ltd is a premier engineering solutions provider, specializing in delivering comprehensive automation, control systems, and instrumentation solutions for process industries across India.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              With years of experience and a commitment to innovation, we partner with world-class manufacturers to bring cutting-edge technology to our clients. Our expertise spans across refineries, petrochemical plants, pharmaceutical facilities, and manufacturing operations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We pride ourselves on delivering tailored solutions that enhance operational efficiency, ensure safety, and drive sustainable growth for businesses in the chemical and process industries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Target className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Our Mission</h3>
            <p className="text-gray-600">
              To deliver innovative engineering solutions that optimize processes and drive industrial excellence
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Lightbulb className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Innovation</h3>
            <p className="text-gray-600">
              Staying at the forefront of technology to provide state-of-the-art solutions for complex challenges
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Award className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Excellence</h3>
            <p className="text-gray-600">
              Committed to delivering superior quality and exceptional service in every project we undertake
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Safety First</h3>
            <p className="text-gray-600">
              Prioritizing safety and reliability in all our solutions to protect people and assets
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
