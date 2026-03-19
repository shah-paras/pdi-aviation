import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import {
  Plane, BarChart3, Map, Calculator, BookOpen,
  ArrowRight, Shield, Clock, TrendingUp, Users
} from 'lucide-react';
import NumbersSection from '@/components/home/NumbersSection';

const features = [
  {
    icon: BarChart3,
    title: 'Aircraft Comparison',
    description: 'Compare up to 3 aircraft side-by-side with detailed specs, pricing, and performance metrics.',
    href: 'AircraftComparison',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Map,
    title: 'Range Map',
    description: 'Visualize aircraft range with interactive maps, geodesic circles, and route planning.',
    href: 'RangeMap',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Calculator,
    title: 'Finance Calculator',
    description: 'Calculate acquisition costs, loan payments, and total cost of ownership scenarios.',
    href: 'FinanceCalculator',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: BookOpen,
    title: 'Aviation Insights',
    description: 'Stay informed with market analysis, buying guides, and industry news.',
    href: 'Blog',
    color: 'from-amber-500 to-amber-600'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2000&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 border border-sky-500/30 rounded-full mb-8">
              <Plane className="w-4 h-4 text-sky-400" />
              <span className="text-sky-400 text-sm font-medium">India's Premier Aviation Advisory</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Journey to
              <span className="block bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Aircraft Ownership
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Discover, compare, and acquire the perfect aircraft with PDI Aviation's comprehensive 
              tools and expert advisory services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('AircraftComparison')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-blue-400 hover:to-blue-500 transition-all shadow-xl shadow-blue-500/25"
              >
                Compare Aircraft
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={createPageUrl('ContactSales')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>

      </section>

      <NumbersSection />

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Tools for Smart Decisions
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Access comprehensive tools designed to simplify your aircraft acquisition journey
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={createPageUrl(feature.href)}
                  className="block h-full p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/10 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sky-400 text-sm font-medium">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Why Aviation Leaders Choose PDI
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                With over 5 years of experience in the Indian aviation market, we provide
                unparalleled expertise in aircraft acquisition, valuation, and market intelligence.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'Trusted Advisory', desc: 'Independent, unbiased recommendations focused on your needs' },
                  { icon: TrendingUp, title: 'Market Intelligence', desc: 'Real-time pricing data and market trend analysis' },
                  { icon: Clock, title: 'End-to-End Support', desc: 'From search to acquisition, we guide every step' },
                  { icon: Users, title: 'Industry Network', desc: 'Access to exclusive listings and global connections' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-slate-300 text-sm">{item.desc}</p>
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
                  src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=1000&q=80"
                  alt="Private jet interior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-slate-900 rounded-xl shadow-xl p-4 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">₹1,200Cr+</div>
                    <div className="text-xs text-slate-400">Advisory Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect Aircraft?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Start exploring our comprehensive tools or speak with our expert advisory team 
              to begin your aircraft acquisition journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('AircraftComparison')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-400 hover:to-blue-500 transition-all"
              >
                Start Comparing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={createPageUrl('ContactSales')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}