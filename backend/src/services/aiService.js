export function generateMindMapFromText(text) {
  const words = text
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, '').trim())
    .filter(Boolean)
    .slice(0, 12);

  const centerId = 'node-center';
  const nodes = [
    {
      id: centerId,
      position: { x: 250, y: 250 },
      data: { label: 'Main Idea', color: '#4f46e5', size: 'lg' }
    }
  ];

  const edges = [];

  words.forEach((word, index) => {
    const nodeId = `node-${index + 1}`;
    const angle = (index / Math.max(words.length, 1)) * Math.PI * 2;
    const radius = 180;
    nodes.push({
      id: nodeId,
      position: {
        x: 250 + Math.cos(angle) * radius,
        y: 250 + Math.sin(angle) * radius
      },
      data: {
        label: word,
        color: '#22c55e',
        size: 'md'
      }
    });

    edges.push({
      id: `edge-${centerId}-${nodeId}`,
      source: centerId,
      target: nodeId,
      animated: true
    });
  });

  return { nodes, edges };
}
