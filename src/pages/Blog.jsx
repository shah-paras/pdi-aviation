import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from '@/components/blog/BlogCard';

const CATEGORIES = [
  'All',
  'Industry News',
  'Aircraft Reviews',
  'Market Analysis',
  'Buying Guide',
  'Ownership Tips',
  'Technology'
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const isLoading = false;
  const posts = [
    { id: '3', title: 'DGCA Regulations Every Owner Should Know', slug: 'dgca-regulations-guide', excerpt: 'Navigating India\'s civil aviation regulatory framework is not optional — it is the foundation of safe, legal, and financially sound aircraft ownership.', category: 'Buying Guide', featured_image: '/images/blog/dgca-regulations-guide.jpg', publish_date: '2025-12-22', author_name: 'PDI Aviation', reading_time_min: 10 },
    { id: '1', title: 'Understanding Aircraft Valuations in 2026', slug: 'aircraft-valuations-2026', excerpt: 'From evolving interest rates to shifting fleet demographics — how to read the market signals that determine what your aircraft is worth in 2026.', category: 'Market Analysis', featured_image: '/images/blog/aircraft-valuations-2026.jpg', publish_date: '2026-02-10', author_name: 'PDI Aviation', reading_time_min: 8 },
    { id: '2', title: 'Top 5 Light Jets for Indian Operators in 2026', slug: 'top-light-jets-india-2026', excerpt: 'From the Phenom 300E to the Citation M2 Gen2 — the five light jets best suited for Indian operations in 2026.', category: 'Aircraft Reviews', featured_image: '/images/blog/top-light-jets-india.png', publish_date: '2026-01-18', author_name: 'PDI Aviation', reading_time_min: 7 },
    { id: '4', title: 'The Rise of Sustainable Aviation Fuel in 2026', slug: 'sustainable-aviation-fuel', excerpt: 'SAF is no longer a future aspiration — it is a present reality reshaping the economics, regulation, and public perception of private aviation.', category: 'Industry News', featured_image: '/images/blog/sustainable-aviation-fuel.jpg', publish_date: '2025-12-05', author_name: 'PDI Aviation', reading_time_min: 5 },
    { id: '5', title: 'eVTOL and Urban Air Mobility: What Indian Operators Need to Know', slug: 'evtol-urban-air-mobility', excerpt: 'Electric vertical takeoff and landing aircraft are moving from prototype to certification — here is what the emerging eVTOL landscape means for Indian private aviation.', category: 'Technology', featured_image: '/images/blog/evtol-urban-air-mobility.jpg', publish_date: '2025-11-20', author_name: 'PDI Aviation', reading_time_min: 7 },
    { id: '6', title: 'Charter vs Ownership: A Cost Analysis', slug: 'charter-vs-ownership', excerpt: 'The decision between chartering and owning an aircraft is fundamentally a financial one — including the costs that sellers rarely discuss.', category: 'Ownership Tips', featured_image: '/images/blog/charter-vs-ownership.png', publish_date: '2025-11-08', author_name: 'PDI Aviation', reading_time_min: 9 },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sky-400 text-sm mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Aviation Insights</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Blog</h1>
          <p className="text-slate-300 max-w-2xl">
            Stay informed with the latest aviation industry news, aircraft reviews, market analysis, and expert buying guides.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {CATEGORIES.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-sky-500 hover:bg-sky-600 text-white border-sky-500'
                      : 'border-slate-700 text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <BlogCard post={featuredPost} featured />
              </div>
            )}

            {/* Post Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {remainingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
}