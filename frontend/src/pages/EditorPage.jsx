import { useCallback, useEffect, useMemo, useState } from 'react';
import { addEdge, Background, Controls, MiniMap, ReactFlow, useEdgesState, useNodesState } from 'react-flow-renderer';
import { useParams } from 'react-router-dom';
import { Download, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import api from '../services/api.js';
import Sidebar from '../components/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useMindMapCollab } from '../hooks/useMindMapCollab.js';

const defaultNodes = [{ id: 'root', data: { label: 'Central Topic', color: '#6366f1', size: 'lg' }, position: { x: 200, y: 200 } }];

export default function EditorPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [title, setTitle] = useState('Untitled Mind Map');
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    const loadMap = async () => {
      const { data } = await api.get(`/mindmaps/${id}`);
      setTitle(data.title);
      setNodes(data.nodes.length ? data.nodes : defaultNodes);
      setEdges(data.edges || []);
      setSelectedTemplate(data.template || 'blank');
    };

    loadMap();
  }, [id, setEdges, setNodes]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);

  const onRemoteChange = useCallback(
    (payload) => {
      if (payload?.nodes) setNodes(payload.nodes);
      if (payload?.edges) setEdges(payload.edges);
    },
    [setEdges, setNodes]
  );

  const { broadcastChange } = useMindMapCollab({ mapId: id, userId: user?.id, onRemoteChange });

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const payload = { title, nodes, edges };
      await api.put(`/mindmaps/${id}`, payload);
      broadcastChange(payload);
    }, 900);

    return () => clearTimeout(timeout);
  }, [id, title, nodes, edges, broadcastChange]);

  const addNode = () => {
    const next = {
      id: `node-${Date.now()}`,
      position: { x: Math.random() * 520, y: Math.random() * 360 },
      data: { label: 'Idea', color: '#22c55e', size: 'md' }
    };
    setNodes((n) => [...n, next]);
  };

  const generateFromAi = async () => {
    if (!aiPrompt.trim()) return;
    const { data } = await api.post('/mindmaps/ai/generate', { text: aiPrompt });
    setNodes(data.nodes);
    setEdges(data.edges);
  };

  const exportPdf = () => {
    const pdf = new jsPDF({ orientation: 'landscape' });
    pdf.text(`Mind map: ${title}`, 10, 10);
    nodes.forEach((node, index) => {
      pdf.text(`${index + 1}. ${node.data.label}`, 10, 20 + index * 8);
    });
    pdf.save(`${title}.pdf`);
  };

  const exportPng = () => {
    window.print();
  };

  const flowNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        style: {
          backgroundColor: node.data.color,
          color: '#fff',
          padding: node.data.size === 'lg' ? 16 : node.data.size === 'sm' ? 8 : 12,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.2)'
        }
      })),
    [nodes]
  );

  return (
    <main className="flex min-h-[calc(100vh-56px)] flex-col md:flex-row">
      <Sidebar selectedTemplate={selectedTemplate} onTemplateChange={setSelectedTemplate} />
      <section className="flex-1">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-700/40 bg-slate-900/30 p-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2" />
          <button onClick={addNode} className="rounded-lg bg-accent-600 px-3 py-2 text-sm font-semibold">Add Node</button>
          <input
            placeholder="Generate with AI from text..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="min-w-64 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />
          <button onClick={generateFromAi} className="rounded-lg border border-slate-600 px-3 py-2 text-sm">
            <Sparkles className="mr-1 inline" size={14} /> Generate
          </button>
          <button onClick={exportPng} className="rounded-lg border border-slate-600 px-3 py-2 text-sm">PNG</button>
          <button onClick={exportPdf} className="rounded-lg border border-slate-600 px-3 py-2 text-sm">
            <Download className="mr-1 inline" size={14} /> PDF
          </button>
        </div>
        <div className="h-[calc(100vh-120px)]">
          <ReactFlow
            nodes={flowNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background color="#334155" gap={20} />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </section>
    </main>
  );
}
