import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export default function Support() {
  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Support Network</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Your Wellness Guide</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Tanvee Kariya</p>
              <p className="text-gray-600">Wellness Consultant</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Mail className="w-5 h-5" />
            </div>
            <a href="mailto:tanveekariya@gmail.com" className="text-blue-600 hover:underline">
              tanveekariya@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Phone className="w-5 h-5" />
            </div>
            <a href="tel:7878208800" className="text-blue-600 hover:underline">
              +91 7878208800
            </a>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Book a Session</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Schedule Consultation
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Community Support</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Join our supportive community to connect with others on their wellness journey.
            </p>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Join Community Forum
            </button>
            <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition-colors">
              View Support Groups
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}