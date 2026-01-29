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

app.listen(3000);
