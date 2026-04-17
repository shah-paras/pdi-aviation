import './App.css'
import { Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { CurrencyProvider } from '@/lib/CurrencyContext'
import { AuthProvider } from '@/lib/auth/AuthProvider'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig, LAZY_PAGES, GATED_PAGES } from './pages.config'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import PageSkeleton from '@/components/ui/loading-skeleton';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : () => <></>;

function AppRoutes() {
  const location = useLocation();

  const wrapWithSuspense = (path, element) => {
    if (LAZY_PAGES.has(path)) {
      return <Suspense fallback={<PageSkeleton />}>{element}</Suspense>;
    }
    return element;
  };

  const wrapWithGate = (path, element) =>
    GATED_PAGES.has(path) ? <ProtectedRoute>{element}</ProtectedRoute> : element;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Layout>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MainPage />
            </motion.div>
          </Layout>
        } />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <Layout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {wrapWithGate(path, wrapWithSuspense(path, <Page />))}
                </motion.div>
              </Layout>
            }
          />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <CurrencyProvider>
        <Router>
          <AuthProvider>
            <NavigationTracker />
            <AppRoutes />
          </AuthProvider>
        </Router>
        <Toaster />
      </CurrencyProvider>
    </QueryClientProvider>
  )
}

export default App
