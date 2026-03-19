import { useEffect, useRef } from 'react';
import {
  Users, Target, Globe,
  Shield, TrendingUp, Clock, MapPin, Phone, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import TeamGrid from '@/components/about/TeamGrid';
import ContactForm from '@/components/about/ContactForm';

const PRESS_LOGOS = [
  { name: 'Economic Times', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/The_Economic_Times_logo.svg/1200px-The_Economic_Times_logo.svg.png' },
  { name: 'Aviation Week', logo: 'https://aviationweek.com/themes/custom/aviationweek/logo.svg' },
  { name: 'Business Standard', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Business_Standard_logo.svg/1200px-Business_Standard_logo.svg.png' },
  { name: 'Livemint', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Mint_newspaper_logo.svg/1200px-Mint_newspaper_logo.svg.png' }
];

const DEFAULT_TEAM = [
  { id: '1', name: 'Raj Goswami', role: 'Chief Executive Officer, Managing Director', bio: 'Leading PDI Aviation\'s strategic vision and growth in India\'s private aviation market' },
  { id: '2', name: 'Jay Gyani', role: 'Chief Operating Officer, Director', bio: 'Overseeing day-to-day operations and driving operational excellence across all verticals' },
  { id: '3', name: 'Paras Shah', role: 'Chief Technology Officer', bio: 'Building PDI Aviation\'s technology platform and digital tools for aircraft advisory' },
  { id: '4', name: 'Harsh Panchal', role: 'Chief Sales Officer', bio: 'Driving client acquisition and managing key relationships across India\'s aviation sector' }
];

export default function AboutUs() {
  const contactRef = useRef(null);
  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('section') === 'contact' && contactRef.current) {
      setTimeout(() => {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-800/90" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 text-sky-400 text-sm mb-4">
                <Users className="w-4 h-4" />
                <span>About Us</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                India's Premier Aviation Advisory
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                For over 5 years, PDI Aviation has been guiding businesses and individuals 
                through every aspect of aircraft ownership — from selection and acquisition 
                to operations and resale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '5+', label: 'Years Experience' },
              { value: '200+', label: 'Aircraft Transactions' },
              { value: '₹2,500Cr+', label: 'Total Value Advised' },
              { value: '50+', label: 'Active Clients' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-3">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Simplifying Aircraft Ownership in India
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We believe that aircraft acquisition should be transparent, efficient, and
                tailored to each client's unique requirements. Our mission is to demystify
                the process and provide world-class advisory services that rival global standards.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Independent Advice', desc: 'Unbiased recommendations' },
                  { icon: TrendingUp, title: 'Market Intelligence', desc: 'Real-time pricing data' },
                  { icon: Clock, title: 'End-to-End Support', desc: 'Complete transaction guidance' },
                  { icon: Globe, title: 'Global Network', desc: 'International connections' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-sm text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1000&q=80"
                  alt="Private jet"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-sky-400 text-sm font-medium mb-3">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Meet the Experts
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Our team combines decades of aviation industry experience with deep market knowledge
            </p>
          </motion.div>

          <TeamGrid members={DEFAULT_TEAM} />
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} id="contact" className="py-20 lg:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-3">
                <Phone className="w-4 h-4" />
                Get in Touch
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Whether you're looking to buy, sell, or simply explore your options,
                our team is ready to help you navigate the world of private aviation.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Head Office</div>
                    <div className="text-slate-300">Mumbai, India</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div className="text-slate-300">business@pdiaviation.co.in</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Phone</div>
                    <div className="text-slate-300">+91 88791 26239</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-white/10">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}