import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/home/AnimatedCounter';

const stats = [
  { type: 'counter', value: 70, suffix: '+', label: 'Aircraft Models' },
  { type: 'counter', value: 5, suffix: '+', label: 'Years of Experience' },
  { type: 'static', display: 'UAM/RAM', label: 'eVTOL Models' },
  { type: 'counter', value: 1200, suffix: '+ Cr', label: 'Provided Advisory Support' },
];

export default function NumbersSection() {
  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                {stat.type === 'counter' ? (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
