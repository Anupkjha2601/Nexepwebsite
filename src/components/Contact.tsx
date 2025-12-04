import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const apiBase = import.meta.env.PROD ? '' : 'http://localhost:5000';

  // helper to POST contact and handle many edge-cases
  async function postContact(payload: typeof formData) {
    const url = `${apiBase}/send-email`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // If non-2xx: read text (might be empty) and throw nice error
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Server responded with ${res.status}${txt ? `: ${txt}` : ''}`);
      }

      // Some servers return empty body on success — guard against JSON.parse error
      const text = await res.text().catch(() => '');
      if (!text) return { success: true };

      try {
        const json = JSON.parse(text);
        return json;
      } catch {
        // response not JSON, but not an error — treat as success with raw text
        return { success: true, raw: text };
      }
    } catch (err: any) {
      // Normalize error
      const message = err?.message || 'Network or server error';
      console.error('postContact error:', message);
      throw new Error(message);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill Name, Email and Message.');
      return;
    }

    try {
      setSubmitted(true);

      const result = await postContact(formData);

      if (result && result.success) {
        // keep same behaviour as before
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        }, 3000);
      } else {
        console.error('Server responded with error:', result);
        alert('Failed to send message. Try again later.');
        setSubmitted(false);
      }
    } catch (err: any) {
      console.error('Network or server error', err);
      alert(`Error sending message: ${err?.message || 'Check console for details.'}`);
      setSubmitted(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can help transform your operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8 text-blue-100 leading-relaxed">
                Reach out to our team for inquiries, support, or partnership opportunities. We're here to help you find the right solution for your needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-blue-100">
                      Nexep India Pvt Ltd<br />
                      West Vinod Nagar, East Delhi<br />
                      Delhi, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-blue-100">+91 7042615692</p>
                    <p className="text-blue-100">+91 8882828900</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-blue-100">info@nexep.in</p>
                    <p className="text-blue-100">sales@nexep.in</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-blue-500">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <p className="text-blue-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-blue-100">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-blue-100">Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                {submitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>

              {submitted && (
                <p className="text-green-600 text-center">
                  Thank you for your message. We'll get back to you soon!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
