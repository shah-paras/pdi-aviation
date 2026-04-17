import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import {
  Plane, BarChart3, Map, Calculator, BookOpen,
  ArrowRight, Shield, Clock, TrendingUp, Users
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import FloatingParticles from '@/components/home/FloatingParticles';
import SpotlightCard from '@/components/home/SpotlightCard';
import TextShimmer from '@/components/home/TextShimmer';
import MovingBorder from '@/components/home/MovingBorder';
import NumbersSection from '@/components/home/NumbersSection';
import { StaggerReveal, StaggerItem } from '@/components/home/StaggerReveal';

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
  const reducedMotion = useReducedMotion();

  // Animation helpers — disabled when reduced motion preferred
  const fadeIn = reducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } };
  const fadeUp = (delay = 0) => reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
      };
  const fadeSlide = (delay = 0, x = 30) => reducedMotion
    ? {}
    : {
        initial: { opacity: 0, x },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, delay }
      };

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      {/* Full viewport, split layout: text left, image right, FloatingParticles bg */}
      <section className="relative h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-950">
          <FloatingParticles count={40} />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text */}
            <div>
              <motion.div {...fadeIn} transition={{ duration: 0.4 }}>
                <span className="uppercase tracking-[0.3em] text-sky-400/60 text-xs font-medium">
                  PDI Aviation
                </span>
              </motion.div>

              <motion.h1
                className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]"
                {...fadeUp(0.15)}
              >
                Your Journey to{' '}
                <TextShimmer className="font-serif font-bold italic">
                  Aircraft Ownership
                </TextShimmer>
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-slate-400 max-w-lg leading-relaxed"
                {...fadeUp(0.35)}
              >
                Discover, compare, and acquire the perfect aircraft with India's
                premier aviation advisory platform.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4"
                {...fadeUp(0.5)}
              >
                <MovingBorder borderRadius="0.75rem">
                  <Link
                    to={createPageUrl('AircraftComparison')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold text-lg"
                  >
                    Compare Aircraft
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </MovingBorder>
                <Link
                  to={createPageUrl('ContactSales')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>

            {/* Right: Hero Image (desktop only) */}
            <motion.div
              className="relative hidden lg:block"
              {...(reducedMotion ? {} : {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8, delay: 0.2 }
              })}
            >
              <div
                className="aspect-[16/10] rounded-2xl shadow-2xl shadow-black/40 bg-cover bg-center"
                style={{ backgroundImage: 'url(/home-jet.jpeg)' }}
              />

              {/* Floating stat badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-slate-900/90 backdrop-blur-xl rounded-xl shadow-xl p-4 border border-white/10"
                {...(reducedMotion ? {} : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.8, duration: 0.5 }
                })}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">70+</div>
                    <div className="text-xs text-slate-400">Aircraft Models</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ===== NUMBERS BAR ===== */}
      <NumbersSection />

      {/* ===== TOOLS SECTION ===== */}
      {/* Editorial layout: 2 large featured cards + 2 compact horizontal cards */}
      <section className="py-20 lg:py-28 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16"
            {...(reducedMotion ? {} : {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true }
            })}
          >
            <span className="uppercase tracking-[0.25em] text-slate-500 text-xs font-medium">
              Aviation Tools
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 max-w-lg">
              Powerful Tools for{' '}
              <span className="font-serif italic text-sky-400">Smart</span>{' '}
              Decisions
            </h2>
          </motion.div>

          {/* Featured tools: 2 large cards */}
          <StaggerReveal className="grid lg:grid-cols-2 gap-6 mb-6">
            {features.slice(0, 2).map((feature) => (
              <StaggerItem key={feature.title}>
                <SpotlightCard className="rounded-2xl h-full">
                  <Link
                    to={createPageUrl(feature.href)}
                    className="block p-8 lg:p-10 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-sky-500/20 transition-colors group h-full"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white mt-6 group-hover:text-sky-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 mt-3 leading-relaxed">
                      {feature.description}
                    </p>
                  </Link>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Secondary tools: compact horizontal strip */}
          <StaggerReveal className="grid sm:grid-cols-2 gap-6">
            {features.slice(2).map((feature) => (
              <StaggerItem key={feature.title}>
                <Link
                  to={createPageUrl(feature.href)}
                  className="flex items-center gap-4 p-5 bg-white/[0.03] rounded-xl border border-white/10 hover:border-sky-500/20 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white group-hover:text-sky-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-0.5 truncate">{feature.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      {/* Full-bleed image bg, 12-col grid (5:7), portrait image left, content right */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pdi-jet-airport.jpeg"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image column */}
            <motion.div
              className="lg:col-span-5"
              {...(reducedMotion ? {} : {
                initial: { opacity: 0, scale: 0.95 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { duration: 0.6 }
              })}
            >
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/pdi-why-choose.png"
                    alt="VT-PDI jet at Mumbai airport"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-24 rounded-xl overflow-hidden shadow-xl border-2 border-slate-950 hidden lg:block">
                  <img
                    src="/about-jet.jpeg"
                    alt="Aircraft detail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content column */}
            <motion.div
              className="lg:col-span-7"
              {...fadeSlide(0.15)}
            >
              <span className="uppercase tracking-[0.25em] text-sky-400/60 text-xs font-medium">
                Why PDI Aviation
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-8 leading-tight">
                Aviation Leaders{' '}
                <span className="font-serif italic font-normal text-slate-400">Choose Us</span>
              </h2>
              <p className="text-lg text-slate-300/80 mb-10 leading-relaxed max-w-xl">
                With over 5 years of experience in the Indian aviation market, we provide
                unparalleled expertise in aircraft acquisition, valuation, and market intelligence.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: 'Trusted Advisory', desc: 'Independent, unbiased recommendations focused on your needs' },
                  { icon: TrendingUp, title: 'Market Intelligence', desc: 'Real-time pricing data and market trend analysis' },
                  { icon: Clock, title: 'End-to-End Support', desc: 'From search to acquisition, we guide every step' },
                  { icon: Users, title: 'Industry Network', desc: 'Access to exclusive listings and global connections' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4"
                    {...(reducedMotion ? {} : {
                      initial: { opacity: 0, y: 15 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { delay: 0.2 + i * 0.1 }
                    })}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent mb-16" />

          <motion.div
            className="text-center"
            {...(reducedMotion ? {} : {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.6 }
            })}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Find Your{' '}
              <span className="font-serif italic text-sky-400">Perfect Aircraft?</span>
            </h2>

            <p className="text-slate-400 mt-6 mb-10 max-w-lg mx-auto">
              Start exploring our comprehensive tools or speak with our expert team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('FleetDirectory')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-sky-500/20"
              >
                Explore Fleet Directory
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={createPageUrl('ContactSales')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
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
