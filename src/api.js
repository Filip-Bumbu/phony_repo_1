import express from 'express';

const app = express();
app.use(express.json());

const users = [];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
});

app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { name, email, phone } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone;
  res.json(user);
});

app.post('/api/messaging/host', (req, res) => {
  const { sourceUid, targetUid, phoneNumbers } = req.body;
  if (!sourceUid || !targetUid || !phoneNumbers?.length) {
    return res.status(400).json({ error: 'sourceUid, targetUid, and phoneNumbers are required' });
  }
  res.status(201).json({
    id: Date.now(),
    sourceUid,
    targetUid,
    phoneNumbers,
    status: 'active'
  });
});

app.get('/api/messaging/host/:id', (req, res) => {
  res.json({
    id: req.params.id,
    sourceUid: 'uid-123',
    targetUid: 'uid-456',
    phoneNumbers: ['+15551234567'],
    status: 'active'
  });
});

app.delete('/api/messaging/host/:id', (req, res) => {
  res.status(204).send();
});

app.listen(3000);
