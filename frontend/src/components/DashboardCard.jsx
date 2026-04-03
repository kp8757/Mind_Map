import { motion } from 'framer-motion';

export default function DashboardCard({ map, onOpen }) {
  return (
    <motion.button
      layout
      whileHover={{ y: -4 }}
      onClick={() => onOpen(map._id)}
      className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5 text-left"
    >
      <h3 className="text-lg font-semibold">{map.title}</h3>
      <p className="mt-1 text-sm text-slate-400 line-clamp-2">{map.description || 'No description yet'}</p>
      <p className="mt-4 text-xs text-slate-500">Updated {new Date(map.updatedAt).toLocaleString()}</p>
    </motion.button>
  );
}
