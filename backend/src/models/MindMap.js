import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 }
    },
    data: {
      label: { type: String, default: 'New Node' },
      color: { type: String, default: '#6366f1' },
      size: { type: String, enum: ['sm', 'md', 'lg'], default: 'md' }
    }
  },
  { _id: false }
);

const edgeSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    animated: { type: Boolean, default: true }
  },
  { _id: false }
);

const versionSnapshotSchema = new mongoose.Schema(
  {
    nodes: [nodeSchema],
    edges: [edgeSchema],
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const mindMapSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    tags: [{ type: String }],
    visibility: { type: String, enum: ['private', 'public'], default: 'private' },
    nodes: [nodeSchema],
    edges: [edgeSchema],
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    history: [versionSnapshotSchema],
    template: {
      type: String,
      enum: ['blank', 'study', 'business', 'startup', 'notes'],
      default: 'blank'
    },
    lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

mindMapSchema.index({ title: 'text', description: 'text', tags: 'text' });

export const MindMap = mongoose.model('MindMap', mindMapSchema);
