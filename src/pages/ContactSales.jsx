import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Plane } from 'lucide-react';
import ContactForm from '@/components/about/ContactForm';

export default function ContactSales() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="pt-12 pb-8 lg:pt-16 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Let's Start a{' '}
              <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent font-serif italic">
                Conversation
              </span>
            </h1>
            <div className="w-16 h-px bg-sky-400/40 mt-6 mb-4" />
            <p className="text-slate-400 max-w-lg">
              Whether you're looking to buy, sell, or explore your options in private aviation,
              our expert team is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-slate-300 mb-8">
                Reach out to our advisory team for personalized assistance with aircraft
                acquisition, valuation, and operations.
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

              {/* Quick links */}
              <div className="mt-10 p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-sky-400 text-sm font-medium mb-3">
                  <Plane className="w-4 h-4" />
                  Quick Inquiries
                </div>
                <p className="text-sm text-slate-400">
                  For aircraft purchases, charter bookings, partnerships, or media inquiries —
                  use the form and our team will respond within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Right - Form */}
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
