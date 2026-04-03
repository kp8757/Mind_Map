import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api.js';
import DashboardCard from '../components/DashboardCard.jsx';

export default function DashboardPage() {
  const [maps, setMaps] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaps = async () => {
      const params = {};
      if (search) params.q = search;
      if (filter !== 'all') params.visibility = filter;
      const { data } = await api.get('/mindmaps', { params });
      setMaps(data);
    };

    const id = setTimeout(fetchMaps, 250);
    return () => clearTimeout(id);
  }, [search, filter]);

  const visible = useMemo(() => maps, [maps]);

  const createMap = async () => {
    const { data } = await api.post('/mindmaps', { title: 'Untitled Mind Map', template: 'blank' });
    navigate(`/editor/${data._id}`);
  };

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <button onClick={createMap} className="rounded-xl bg-accent-600 px-4 py-2 font-semibold">
          + Create Mind Map
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          placeholder="Search mind maps"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 md:max-w-sm"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2"
        >
          <option value="all">All</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((map) => (
          <DashboardCard key={map._id} map={map} onOpen={(id) => navigate(`/editor/${id}`)} />
        ))}
      </motion.div>
    </main>
  );
}
