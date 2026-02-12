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
    { id: '1', title: 'Understanding Aircraft Valuations in 2024', slug: 'aircraft-valuations-2024', excerpt: 'A comprehensive guide to how aircraft values are determined in today\'s market.', category: 'Market Analysis', featured_image: null, publish_date: '2024-11-15', author_name: 'Rajesh Kumar', reading_time_min: 8 },
    { id: '2', title: 'Top 5 Light Jets for Indian Operators', slug: 'top-light-jets-india', excerpt: 'Comparing the best light jet options for the Indian market.', category: 'Aircraft Reviews', featured_image: null, publish_date: '2024-10-28', author_name: 'Vikram Singh', reading_time_min: 6 },
    { id: '3', title: 'DGCA Regulations Every Owner Should Know', slug: 'dgca-regulations-guide', excerpt: 'Essential regulatory knowledge for aircraft owners in India.', category: 'Buying Guide', featured_image: null, publish_date: '2024-10-10', author_name: 'Priya Sharma', reading_time_min: 10 },
    { id: '4', title: 'The Rise of Sustainable Aviation Fuel', slug: 'sustainable-aviation-fuel', excerpt: 'How SAF is changing the future of private aviation.', category: 'Industry News', featured_image: null, publish_date: '2024-09-20', author_name: 'Ananya Patel', reading_time_min: 5 },
    { id: '5', title: 'Pre-Purchase Inspection Checklist', slug: 'pre-purchase-inspection', excerpt: 'What to look for before buying a pre-owned aircraft.', category: 'Buying Guide', featured_image: null, publish_date: '2024-09-05', author_name: 'Vikram Singh', reading_time_min: 7 },
    { id: '6', title: 'Charter vs Ownership: A Cost Analysis', slug: 'charter-vs-ownership', excerpt: 'Breaking down the true cost of aircraft ownership vs chartering.', category: 'Ownership Tips', featured_image: null, publish_date: '2024-08-18', author_name: 'Rajesh Kumar', reading_time_min: 9 },
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 lg:py-16">
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
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8 shadow-sm">
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
                      ? 'bg-slate-900 hover:bg-slate-800' 
                      : ''
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
            <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
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