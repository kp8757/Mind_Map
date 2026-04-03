import { MindMap } from '../models/MindMap.js';
import { generateMindMapFromText } from '../services/aiService.js';

export async function listMindMaps(req, res) {
  const { q = '', template, visibility } = req.query;

  const query = {
    $or: [
      { ownerId: req.user.id },
      { collaborators: req.user.id },
      { visibility: 'public' }
    ]
  };

  if (q) {
    query.$text = { $search: q };
  }

  if (template) query.template = template;
  if (visibility) query.visibility = visibility;

  const mindMaps = await MindMap.find(query)
    .select('-history')
    .sort({ updatedAt: -1 })
    .lean();

  return res.json(mindMaps);
}

export async function createMindMap(req, res) {
  const body = req.body;
  const mindMap = await MindMap.create({
    ownerId: req.user.id,
    title: body.title,
    description: body.description || '',
    tags: body.tags || [],
    template: body.template || 'blank',
    nodes: body.nodes || [],
    edges: body.edges || [],
    collaborators: [],
    visibility: 'private',
    history: []
  });

  return res.status(201).json(mindMap);
}

export async function getMindMap(req, res) {
  const mindMap = await MindMap.findById(req.params.id);

  if (!mindMap) return res.status(404).json({ message: 'Not found' });

  const canAccess =
    mindMap.visibility === 'public' ||
    mindMap.ownerId.toString() === req.user.id ||
    mindMap.collaborators.some((id) => id.toString() === req.user.id);

  if (!canAccess) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return res.json(mindMap);
}

export async function updateMindMap(req, res) {
  const { id } = req.params;
  const { nodes, edges, title, description, visibility } = req.body;

  const mindMap = await MindMap.findById(id);
  if (!mindMap) return res.status(404).json({ message: 'Not found' });

  const canEdit =
    mindMap.ownerId.toString() === req.user.id ||
    mindMap.collaborators.some((cid) => cid.toString() === req.user.id);

  if (!canEdit) return res.status(403).json({ message: 'Forbidden' });

  mindMap.history.push({ nodes: mindMap.nodes, edges: mindMap.edges });
  mindMap.nodes = nodes ?? mindMap.nodes;
  mindMap.edges = edges ?? mindMap.edges;
  mindMap.title = title ?? mindMap.title;
  mindMap.description = description ?? mindMap.description;
  mindMap.visibility = visibility ?? mindMap.visibility;
  mindMap.lastEditedBy = req.user.id;

  await mindMap.save();
  return res.json(mindMap);
}

export async function deleteMindMap(req, res) {
  const map = await MindMap.findOneAndDelete({
    _id: req.params.id,
    ownerId: req.user.id
  });

  if (!map) return res.status(404).json({ message: 'Not found or unauthorized' });
  return res.status(204).send();
}

export async function generateFromText(req, res) {
  const { text } = req.body;
  const generated = generateMindMapFromText(text);
  return res.json(generated);
}

export async function getVersionHistory(req, res) {
  const mindMap = await MindMap.findById(req.params.id).select('history updatedAt');
  if (!mindMap) return res.status(404).json({ message: 'Not found' });
  return res.json(mindMap.history);
}
