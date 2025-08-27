import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Users, Heart, Calendar, Video, Send, Star, MapPin, Clock } from 'lucide-react';

const supportResources = [
  {
    title: 'Crisis Helplines',
    items: [
      { name: 'National Suicide Prevention Lifeline', number: '988', available: '24/7' },
      { name: 'Crisis Text Line', number: 'Text HOME to 741741', available: '24/7' },
      { name: 'SAMHSA National Helpline', number: '1-800-662-4357', available: '24/7' }
    ],
    color: 'from-red-500 to-pink-500',
    icon: '🆘'
  },
  {
    title: 'Mental Health Resources',
    items: [
      { name: 'Psychology Today', description: 'Find therapists near you', url: 'https://psychologytoday.com' },
      { name: 'BetterHelp', description: 'Online therapy platform', url: 'https://betterhelp.com' },
      { name: 'Headspace', description: 'Meditation and mindfulness', url: 'https://headspace.com' }
    ],
    color: 'from-blue-500 to-purple-500',
    icon: '🧠'
  },
  {
    title: 'Support Groups',
    items: [
      { name: 'NAMI Support Groups', description: 'Mental health support groups' },
      { name: 'Anxiety and Depression Association', description: 'ADAA support groups' },
      { name: 'Local Community Centers', description: 'Check your local area' }
    ],
    color: 'from-green-500 to-teal-500',
    icon: '👥'
  }
];

const wellnessServices = [
  {
    name: 'Individual Counseling',
    description: 'One-on-one sessions with certified therapists',
    duration: '50 minutes',
    price: '$120',
    features: ['Personalized approach', 'Flexible scheduling', 'Various specialties']
  },
  {
    name: 'Group Therapy',
    description: 'Small group sessions for shared experiences',
    duration: '90 minutes',
    price: '$60',
    features: ['Peer support', 'Shared learning', 'Cost effective']
  },
  {
    name: 'Mindfulness Workshops',
    description: 'Learn meditation and stress reduction techniques',
    duration: '2 hours',
    price: '$45',
    features: ['Practical techniques', 'Take-home materials', 'Ongoing support']
  }
];

export default function Support() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  });
  const [showEmergencyInfo, setShowEmergencyInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for reaching out! We\'ll contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      preferredDate: '',
      preferredTime: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Support & Wellness</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          You're not alone in your journey. Connect with professional support and community resources.
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🆘</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Need Immediate Help?</h2>
              <p className="text-white/80">If you're in crisis, please reach out immediately</p>
            </div>
          </div>
          <button
            onClick={() => setShowEmergencyInfo(!showEmergencyInfo)}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-medium transition-colors"
          >
            {showEmergencyInfo ? 'Hide' : 'Show'} Crisis Resources
          </button>
        </div>
        
        {showEmergencyInfo && (
          <div className="mt-6 grid md:grid-cols-3 gap-4 animate-slideInUp">
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Call 988</h3>
              <p className="text-sm text-white/80">Suicide & Crisis Lifeline</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Text HOME to 741741</h3>
              <p className="text-sm text-white/80">Crisis Text Line</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Call 911</h3>
              <p className="text-sm text-white/80">Emergency Services</p>
            </div>
          </div>
        )}
      </div>

      {/* Wellness Guide Contact */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Meet Your Wellness Guide</h2>
          <p className="text-xl text-gray-600">Tanvee Kariya, Licensed Wellness Consultant</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="p-3 bg-blue-500 rounded-lg text-white">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <a href="mailto:tanveekariya@gmail.com" className="text-blue-600 hover:underline">
                  tanveekariya@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
              <div className="p-3 bg-green-500 rounded-lg text-white">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <a href="tel:7878208800" className="text-green-600 hover:underline">
                  +91 7878208800
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
              <div className="p-3 bg-purple-500 rounded-lg text-white">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Video Consultations</h3>
                <p className="text-gray-600">Available via Zoom or Google Meet</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
              <div className="p-3 bg-orange-500 rounded-lg text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Availability</h3>
                <p className="text-gray-600">Mon-Fri: 9AM-6PM IST</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">About Tanvee</h3>
            <p className="text-gray-600 mb-4">
              With over 8 years of experience in mental health and wellness, Tanvee specializes in 
              mindfulness-based therapy, stress management, and holistic wellness approaches.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Certified Mindfulness Instructor</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Licensed Clinical Social Worker</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Trauma-Informed Care Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Services */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Wellness Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {wellnessServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => setSelectedService(selectedService === service.name ? null : service.name)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                  <div className="text-sm text-gray-500">{service.duration}</div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
              {selectedService === service.name && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData({ ...formData, service: service.name });
                  }}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Book This Service
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Resources */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Additional Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {supportResources.map((resource, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${resource.color} rounded-2xl p-6 text-white`}
            >
              <div className="text-4xl mb-4">{resource.icon}</div>
              <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
              <div className="space-y-3">
                {resource.items.map((item, idx) => (
                  <div key={idx} className="bg-white/10 rounded-lg p-3">
                    <h4 className="font-semibold">{item.name}</h4>
                    {'number' in item && (
                      <p className="text-white/80 font-mono">{item.number}</p>
                    )}
                    {'description' in item && (
                      <p className="text-white/80 text-sm">{item.description}</p>
                    )}
                    {'available' in item && (
                      <p className="text-white/60 text-xs">Available {item.available}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Schedule a Consultation</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select a service</option>
              {wellnessServices.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="input-field"
            >
              <option value="">Select time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="input-field resize-none"
              placeholder="Tell us about your goals and any specific concerns..."
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Schedule Consultation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}