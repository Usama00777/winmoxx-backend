const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let inviteCodes = ['INVITE123', 'JOIN2025']; // example codes
let usedCodes = [];

app.post('/api/generate-invite', (req, res) => {
  const newCode = 'INV' + Math.floor(Math.random() * 1000000);
  inviteCodes.push(newCode);
  res.json({ code: newCode });
});

app.post('/api/invite-register', (req, res) => {
  const { email, password, inviteCode } = req.body;
  if (!inviteCodes.includes(inviteCode)) {
    return res.status(400).json({ message: 'Invalid or used invite code' });
  }
  usedCodes.push(inviteCode);
  inviteCodes = inviteCodes.filter(c => c !== inviteCode);
  res.json({ message: 'Registered with invite successfully' });
});

app.post('/api/verify-email', (req, res) => {
  const { code } = req.body;
  if (code === "123456") {
    return res.json({ message: 'Email verified' });
  }
  res.status(400).json({ message: 'Invalid code' });
});

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  console.log(`Simulating password reset email to ${email}`);
  res.json({ message: 'Password reset link sent (simulated)' });
});

app.listen(5000, () => console.log('Invite & email backend running on port 5000'));