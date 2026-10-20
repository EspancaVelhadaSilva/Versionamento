const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Dados em memória (somem ao reiniciar o servidor)
let tarefas = [];

app.get('/api/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/api/tarefas', (req, res) => {
  const titulo = String(req.body?.titulo ?? '').trim();
  if (!titulo) {
    return res.status(400).json({ erro: 'O título é obrigatório.' });
  }
  const nova = { id: Date.now(), titulo, concluida: false };
  tarefas.push(nova);
  res.status(201).json(nova);
});

app.patch('/api/tarefas/:id', (req, res) => {
  const tarefa = tarefas.find(t => t.id === Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  tarefa.concluida = !tarefa.concluida;
  res.json(tarefa);
});

app.delete('/api/tarefas/:id', (req, res) => {
  tarefas = tarefas.filter(t => t.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});