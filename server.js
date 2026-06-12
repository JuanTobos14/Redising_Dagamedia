import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Serve Vite build in production
app.use(express.static(path.join(__dirname, 'dist')));

// Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    activeUsers: activeUsers.size,
    uptime: process.uptime().toFixed(1) + 's'
  });
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  pingTimeout: 20000,
  pingInterval: 10000,
});

// ──────────────────────────────────────────────────────
//  State
// ──────────────────────────────────────────────────────
const VALID_SECTIONS = ['inicio', 'nosotros', 'servicios', 'peliculas', 'contacto'];
const VALID_EMOJIS   = ['🔥', '🚀', '❤️', '🎉', '😮', '👏'];
const VALID_PHRASES  = ['¡Increíble!', '¡Espectacular!', '¡Buenísimo!', '¡Me encanta!', 'Awesome!', 'Amazing!', 'Spectacular!', 'Love it!'];

const activeUsers    = new Set();       // socket IDs online
const userSections   = new Map();       // socketId → sectionId
const reactionThrottle = new Map();     // socketId → last reaction timestamp

// ──────────────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────────────
function getSectionCounts() {
  const counts = Object.fromEntries(VALID_SECTIONS.map(s => [s, 0]));
  for (const [, section] of userSections) {
    if (counts[section] !== undefined) counts[section]++;
  }
  return counts;
}

// ──────────────────────────────────────────────────────
//  Socket Handlers
// ──────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] User connected  ${socket.id}  (total: ${activeUsers.size + 1})`);

  activeUsers.add(socket.id);
  userSections.set(socket.id, 'inicio');

  // Welcome the new user with current state
  socket.emit('init_users', Array.from(activeUsers));
  socket.broadcast.emit('user_connected', socket.id);
  io.emit('section_counts_update', getSectionCounts());

  // ── Section tracking ─────────────────────────────
  socket.on('enter_section', (sectionId) => {
    if (!VALID_SECTIONS.includes(sectionId)) return;
    if (userSections.get(socket.id) === sectionId) return; // no change
    userSections.set(socket.id, sectionId);
    io.emit('section_counts_update', getSectionCounts());
  });

  // ── Reactions with throttle (max 1 per 600 ms per user) ─
  socket.on('send_reaction', (emoji) => {
    if (!VALID_EMOJIS.includes(emoji) && !VALID_PHRASES.includes(emoji)) return;

    const now  = Date.now();
    const last = reactionThrottle.get(socket.id) || 0;
    if (now - last < 600) return; // silently drop spam
    reactionThrottle.set(socket.id, now);

    io.emit('new_reaction', {
      id:    `${socket.id}-${now}-${Math.random().toString(36).slice(2)}`,
      emoji,
    });
  });

  // ── Disconnect ───────────────────────────────────
  socket.on('disconnect', (reason) => {
    console.log(`[-] User disconnected ${socket.id}  reason: ${reason}  (total: ${activeUsers.size - 1})`);
    activeUsers.delete(socket.id);
    userSections.delete(socket.id);
    reactionThrottle.delete(socket.id);

    io.emit('user_disconnected', socket.id);
    io.emit('section_counts_update', getSectionCounts());
  });
});

// ──────────────────────────────────────────────────────
//  Fallback — serve React SPA
// ──────────────────────────────────────────────────────
app.get(/.*/, (req, res) => {
   res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
     if (err) {
       console.error('Error sending index.html:', err);
       res.status(500).send('Internal Server Error');
     }
   });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`\n  WebSocket server listening on port ${PORT}\n`);
});
