import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static assets from Vite's build directory (dist) in production
app.use(express.static(path.join(__dirname, 'dist')));

// Healthcheck route
app.get('/health', (req, res) => {
  res.send('WebSocket server is healthy and running.');
});

const httpServer = createServer(app);

// Configure Socket.io with CORS to support local development and remote deployments
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow connections from Vercel preview URLs or any domain
    methods: ["GET", "POST"]
  }
});

// State storage
// activeUsers: Set of active socket IDs
const activeUsers = new Set();
// userSections: socketId -> sectionId
const userSections = new Map();

// Helper to calculate section counts
function getSectionCounts() {
  const counts = {
    inicio: 0,
    nosotros: 0,
    servicios: 0,
    peliculas: 0,
    contacto: 0
  };
  
  for (const [socketId, sectionId] of userSections.entries()) {
    if (counts.hasOwnProperty(sectionId)) {
      counts[sectionId]++;
    }
  }
  return counts;
}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Register the new user
  activeUsers.add(socket.id);
  // Default section is 'inicio'
  userSections.set(socket.id, 'inicio');

  // Send current users list to the newly connected user
  socket.emit('init_users', Array.from(activeUsers));

  // Broadcast to other users that a new user connected
  socket.broadcast.emit('user_connected', socket.id);

  // Broadcast updated section counts
  io.emit('section_counts_update', getSectionCounts());

  // Handle section changes
  socket.on('enter_section', (sectionId) => {
    console.log(`User ${socket.id} entered section: ${sectionId}`);
    if (sectionId && ['inicio', 'nosotros', 'servicios', 'peliculas', 'contacto'].includes(sectionId)) {
      userSections.set(socket.id, sectionId);
      io.emit('section_counts_update', getSectionCounts());
    }
  });

  // Handle live reactions
  socket.on('send_reaction', (emoji) => {
    console.log(`Reaction sent: ${emoji} from ${socket.id}`);
    // Broadcast the reaction to ALL clients (including the sender, or client can render locally too)
    io.emit('new_reaction', {
      id: `${socket.id}-${Date.now()}-${Math.random()}`,
      emoji: emoji
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    activeUsers.delete(socket.id);
    userSections.delete(socket.id);
    
    // Broadcast to everyone that this user disconnected
    io.emit('user_disconnected', socket.id);
    
    // Broadcast updated section counts
    io.emit('section_counts_update', getSectionCounts());
  });
});

// Fallback route to serve the React SPA index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(200).send('WebSocket server is active. Please compile the frontend using build scripts to view the client.');
    }
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});
