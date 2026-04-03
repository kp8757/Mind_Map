# MindSpark - Modern Collaborative Mind Map Platform

MindSpark is a full-stack web application for creating, editing, and sharing mind maps with a high-performance editor, real-time collaboration, and polished UI.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, React Flow
- **Backend:** Node.js, Express, Socket.IO
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + Google login endpoint hook

## Folder Structure

```text
Mind_Map/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── validators/
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── .env.example
└── README.md
```

## Features Delivered

### UI/UX
- Clean sidebar + canvas layout inspired by productivity tools.
- Dark/light mode toggle with persistence.
- Framer Motion interactions on dashboard cards.
- Fully responsive layout for mobile/tablet/desktop.

### Dashboard
- View all accessible mind maps (owned, shared, public).
- Search + visibility filtering.
- One-click “Create Mind Map”.

### Editor
- Drag/drop nodes with React Flow.
- Connect nodes visually.
- Add nodes dynamically.
- Node style controls in data model (color, size, label).
- Zoom/pan, minimap, and controls.
- Auto-save with debounced updates.
- Export to PDF and quick PNG pathway.

### Collaboration
- Shareable public/private visibility model.
- Real-time collaboration transport with Socket.IO.
- Multi-user presence update events.

### Authentication
- JWT signup/login.
- Google login endpoint hook for OAuth integration.

### Storage & Retrieval
- MongoDB schemas for users and mind maps.
- Persisted nodes/edges, template metadata, version history snapshots.

### Unique Features
- AI-assisted auto-generation from text prompt.
- Templates: Study, Business, Startup, Notes.
- Version history snapshots on every save.

### Security & Performance
- Helmet + CORS + rate limiting.
- Validation via express-validator.
- Auth middleware on protected APIs.
- Lazy-loaded route pages.
- Debounced API autosave to reduce network chatter.

## API Routes

Base URL: `/api`

### Auth
- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/google`

### Mind Maps (Protected)
- `GET /mindmaps`
- `POST /mindmaps`
- `GET /mindmaps/:id`
- `PUT /mindmaps/:id`
- `DELETE /mindmaps/:id`
- `POST /mindmaps/ai/generate`
- `GET /mindmaps/:id/history`

### Health
- `GET /health`

## Data Schemas

### User
- `name`, `email`, `passwordHash`, `googleId`

### MindMap
- `ownerId`, `title`, `description`, `tags`, `visibility`
- `nodes[]`, `edges[]`
- `collaborators[]`, `history[]`
- `template`, `lastEditedBy`

## Step-by-Step Setup

### 1) Prerequisites
- Node.js 20+
- MongoDB running locally or via Atlas

### 2) Backend setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3) Frontend setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 4) Open app
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Notes for Production
- Replace Google endpoint hook with full OAuth flow.
- Store collaboration events in Redis for horizontal scaling.
- Use signed URL export service for high-fidelity PNG snapshots.
- Add integration tests and E2E tests (Playwright/Cypress).
