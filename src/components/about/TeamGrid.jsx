import { Linkedin, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeamGrid({ members }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {members.map((member, index) => (
        <motion.div
          key={member.id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/10 transition-all">
            <div className="aspect-[4/5] overflow-hidden bg-slate-800">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-20 h-20 text-slate-600" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white text-lg">{member.name}</h3>
              <p className="text-sky-400 text-sm font-medium mb-2">{member.role}</p>
              {member.bio && (
                <p className="text-slate-300 text-sm line-clamp-3">{member.bio}</p>
              )}
              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-400 hover:text-sky-400 text-sm mt-3 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}