import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, Calendar, Clock, User, Share2,
  Facebook, Twitter, Linkedin, Link2
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const ALL_POSTS = [
    { id: '1', title: 'Understanding Aircraft Valuations in 2024', slug: 'aircraft-valuations-2024', excerpt: 'A comprehensive guide...', category: 'Market Analysis', featured_image: null, publish_date: '2024-11-15', author_name: 'Rajesh Kumar', author_role: 'Founder & CEO', reading_time_min: 8, content: '<p>Aircraft valuations are influenced by many factors including age, total time, maintenance status, and market conditions.</p>', tags: ['valuation', 'market'] },
    { id: '2', title: 'Top 5 Light Jets for Indian Operators', slug: 'top-light-jets-india', excerpt: 'Comparing the best...', category: 'Aircraft Reviews', featured_image: null, publish_date: '2024-10-28', author_name: 'Vikram Singh', author_role: 'Head of Acquisitions', reading_time_min: 6, content: '<p>The Indian market for light jets continues to grow, with several excellent options available.</p>', tags: ['jets', 'reviews'] },
    { id: '3', title: 'DGCA Regulations Every Owner Should Know', slug: 'dgca-regulations-guide', excerpt: 'Essential regulatory...', category: 'Buying Guide', featured_image: null, publish_date: '2024-10-10', author_name: 'Priya Sharma', author_role: 'COO', reading_time_min: 10, content: '<p>Understanding DGCA regulations is crucial for any aircraft owner operating in India.</p>', tags: ['regulation', 'dgca'] },
    { id: '4', title: 'The Rise of Sustainable Aviation Fuel', slug: 'sustainable-aviation-fuel', excerpt: 'How SAF is changing...', category: 'Industry News', featured_image: null, publish_date: '2024-09-20', author_name: 'Ananya Patel', author_role: 'Director of Client Relations', reading_time_min: 5, content: '<p>Sustainable Aviation Fuel represents one of the most promising pathways to reducing aviation emissions.</p>', tags: ['sustainability', 'fuel'] },
    { id: '5', title: 'Pre-Purchase Inspection Checklist', slug: 'pre-purchase-inspection', excerpt: 'What to look for...', category: 'Buying Guide', featured_image: null, publish_date: '2024-09-05', author_name: 'Vikram Singh', author_role: 'Head of Acquisitions', reading_time_min: 7, content: '<p>A thorough pre-purchase inspection is the most important step in buying a pre-owned aircraft.</p>', tags: ['buying', 'inspection'] },
    { id: '6', title: 'Charter vs Ownership: A Cost Analysis', slug: 'charter-vs-ownership', excerpt: 'Breaking down costs...', category: 'Ownership Tips', featured_image: null, publish_date: '2024-08-18', author_name: 'Rajesh Kumar', author_role: 'Founder & CEO', reading_time_min: 9, content: '<p>The decision between chartering and ownership depends on annual flight hours and specific needs.</p>', tags: ['ownership', 'charter'] },
  ];
  const isLoading = false;
  const post = ALL_POSTS.find(p => p.slug === slug);
  const relatedPosts = post ? ALL_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) : [];

  const shareUrl = window.location.href;
  
  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Article not found</h2>
        <Link to={createPageUrl('Blog')}>
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const categoryColors = {
    'Industry News': 'bg-blue-500/20 text-blue-300',
    'Aircraft Reviews': 'bg-purple-500/20 text-purple-300',
    'Market Analysis': 'bg-emerald-500/20 text-emerald-300',
    'Buying Guide': 'bg-amber-500/20 text-amber-300',
    'Ownership Tips': 'bg-rose-500/20 text-rose-300',
    'Technology': 'bg-indigo-500/20 text-indigo-300'
  };



  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative h-[50vh] lg:h-[60vh] min-h-[400px]">
        <img
          src={post.featured_image || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2000&q=80'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <Link 
              to={createPageUrl('Blog')}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <Badge className={`${categoryColors[post.category] || 'bg-slate-500/20 text-slate-300'} mb-4`}>
              {post.category}
            </Badge>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              {post.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                {post.author_avatar ? (
                  <img src={post.author_avatar} alt={post.author_name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-300" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-white">{post.author_name}</div>
                  <div className="text-sm text-slate-400">{post.author_role}</div>
                </div>
              </div>
              <span className="w-px h-6 bg-slate-600" />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.publish_date ? format(new Date(post.publish_date), 'MMMM d, yyyy') : 'Draft'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.reading_time_min || 5} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <div 
              className="prose prose-lg prose-slate prose-invert max-w-none prose-headings:font-bold prose-a:text-sky-400 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-slate-300 border-slate-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this article
                </span>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleShare('facebook')}>
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleShare('twitter')}>
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleShare('linkedin')}>
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={copyLink}>
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link
                  key={related.id}
                  to={createPageUrl('BlogPost') + `?slug=${related.slug}`}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/5 transition-all">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={related.featured_image || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80'}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-sky-400 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {related.reading_time_min || 5} min read
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}