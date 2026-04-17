import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import {
  Menu, X,
  BarChart3, Map, Calculator, BookOpen, Users, Phone, ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccountMenu from '@/components/auth/AccountMenu';


export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const showFooter = ['/', '/AboutUs'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Compare Aircraft', href: 'AircraftComparison', icon: BarChart3 },
    { name: 'Range Map', href: 'RangeMap', icon: Map },
    { name: 'Finance Calculator', href: 'FinanceCalculator', icon: Calculator },
    { name: 'Fleet Directory', href: 'FleetDirectory', icon: ClipboardList },
    { name: 'Blog', href: 'Blog', icon: BookOpen },
    { name: 'About Us', href: 'AboutUs', icon: Users },
  ];

  const isActive = (href) => location.pathname.includes(href);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/80 backdrop-blur-xl shadow-xl shadow-black/20 border-b border-white/10' : 'bg-slate-950/95 backdrop-blur-sm'
        }`}
      >
        <div className="w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link 
              to={createPageUrl('Home')} 
              className="flex items-center gap-3 group"
            >
              <img src="/pdi-logo.png" alt="PDI Aviation" className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg shadow-md group-hover:scale-105 transition-transform object-cover" />
              <span className="hidden sm:block text-lg lg:text-xl font-bold text-white tracking-tight">PDI Aviation</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-sky-400/20 text-sky-300'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA + account */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={createPageUrl('ContactSales')}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold text-sm transition-colors shadow-md flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                Contact Sales
              </Link>
              <AccountMenu variant="desktop" />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-sky-400/20 text-sky-300'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
                <Link
                  to={createPageUrl('ContactSales')}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-sky-500 text-white rounded-lg font-semibold text-sm mt-4"
                >
                  <Phone className="w-4 h-4" />
                  Contact Sales
                </Link>
                <AccountMenu variant="mobile" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-14 lg:pt-16">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="bg-slate-900 border-t border-slate-800 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/pdi-logo.png" alt="PDI Aviation" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <span className="text-lg font-bold">PDI Aviation</span>
                    <span className="block text-xs text-slate-400">Planedekho India</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  India's premier platform for aircraft comparison, acquisition advisory, and aviation intelligence.
                </p>
              </div>

              {/* Tools */}
              <div>
                <h4 className="font-semibold mb-4 text-sky-400">Tools</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link to={createPageUrl('AircraftComparison')} className="hover:text-white transition-colors">Aircraft Comparison</Link></li>
                  <li><Link to={createPageUrl('RangeMap')} className="hover:text-white transition-colors">Range Map</Link></li>
                  <li><Link to={createPageUrl('FinanceCalculator')} className="hover:text-white transition-colors">Finance Calculator</Link></li>
                  <li><Link to={createPageUrl('FleetDirectory')} className="hover:text-white transition-colors">Fleet Directory</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-4 text-sky-400">Company</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link to={createPageUrl('AboutUs')} className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to={createPageUrl('Blog')} className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to={createPageUrl('ContactSales')} className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4 text-sky-400">Get in Touch</h4>
                <p className="text-slate-400 text-sm mb-4">
                  Ready to find your perfect aircraft?
                </p>
                <Link
                  to={createPageUrl('ContactSales')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Contact Sales
                </Link>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <p>© {new Date().getFullYear()} PDI Aviation. All rights reserved.</p>
              <div className="flex gap-6">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}