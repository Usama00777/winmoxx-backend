const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let sessions = [
  { email: 'client1@example.com', device: 'DeviceA1', ip: '192.168.1.10', time: '2025-04-16 08:45', status: 'active' },
  { email: 'client2@example.com', device: 'DeviceB9', ip: '103.21.244.1', time: '2025-04-16 07:30', status: 'blocked' }
];

// Fetch all sessions
app.get('/api/sessions', (req, res) => {
  res.json(sessions);
});

// Block a session
app.post('/api/block-session', (req, res) => {
  const { email, device } = req.body;
  const found = sessions.find(s => s.email === email && s.device === device);
  if (found) {
    found.status = 'blocked';
    return res.json({ message: 'Session blocked' });
  }
  res.status(404).json({ message: 'Session not found' });
});

// Unblock a session
app.post('/api/unblock-session', (req, res) => {
  const { email, device } = req.body;
  const found = sessions.find(s => s.email === email && s.device === device);
  if (found) {
    found.status = 'active';
    return res.json({ message: 'Session unblocked' });
  }
  res.status(404).json({ message: 'Session not found' });
});

// Simulated login route with device tracking
app.post('/api/login', (req, res) => {
  const { email, device, ip } = req.body;
  const existing = sessions.find(s => s.email === email && s.device === device);
  if (existing && existing.status === 'blocked') {
    return res.status(403).json({ message: 'This device is blocked for this user.' });
  }

  const newSession = { email, device, ip, time: new Date().toISOString(), status: 'active' };
  sessions.push(newSession);
  res.json({ message: 'Login success', session: newSession });
});

app.listen(5001, () => console.log('WinMoxx Session Firewall running on port 5001'));