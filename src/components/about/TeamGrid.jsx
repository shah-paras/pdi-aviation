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
          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-20 h-20 text-slate-300" />
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-900 text-lg">{member.name}</h3>
              <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
              {member.bio && (
                <p className="text-slate-600 text-sm line-clamp-3">{member.bio}</p>
              )}
              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600 text-sm mt-3 transition-colors"
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