import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function BlogCard({ post, featured = false }) {
  const categoryColors = {
    'Industry News': 'bg-blue-500/20 text-blue-300',
    'Aircraft Reviews': 'bg-purple-500/20 text-purple-300',
    'Market Analysis': 'bg-emerald-500/20 text-emerald-300',
    'Buying Guide': 'bg-amber-500/20 text-amber-300',
    'Ownership Tips': 'bg-rose-500/20 text-rose-300',
    'Technology': 'bg-indigo-500/20 text-indigo-300'
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative"
      >
        <Link to={createPageUrl('BlogPost') + `?slug=${post.slug}`}>
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-6">
            <img
              src={post.featured_image || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2000&q=80'}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <Badge className={`${categoryColors[post.category] || 'bg-slate-500/20 text-slate-300'} mb-3`}>
                {post.category}
              </Badge>
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-200 text-lg mb-4 max-w-3xl line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author_name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.publish_date ? format(new Date(post.publish_date), 'MMM d, yyyy') : 'Draft'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.reading_time_min || 5} min read
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Link to={createPageUrl('BlogPost') + `?slug=${post.slug}`}>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/5 transition-all">
          <div className="h-48 overflow-hidden">
            <img
              src={post.featured_image || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80'}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <Badge className={`${categoryColors[post.category] || 'bg-slate-500/20 text-slate-300'} mb-3`}>
              {post.category}
            </Badge>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-sky-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-slate-300 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                {post.author_avatar ? (
                  <img src={post.author_avatar} alt={post.author_name} className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                    <User className="w-3 h-3 text-slate-400" />
                  </div>
                )}
                <span>{post.author_name}</span>
              </div>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.reading_time_min || 5} min
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}