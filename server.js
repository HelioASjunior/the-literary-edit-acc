const express = require('express');
const path = require('path');
require('dotenv').config();

const subscribe = require('./api/subscribe');
const ratings = require('./api/ratings');
const comments = require('./api/comments');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/subscribe', subscribe);
app.use('/api/ratings', ratings);
app.use('/api/comments', comments);

app.use(express.static(path.join(__dirname)));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});