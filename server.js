const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRouter = require('./routes/auth');
const evaluationsRouter = require('./routes/evaluations');
const contactRouter = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.use('/api/login', authRouter);
app.use('/api/register', authRouter);
app.use('/api/avaliacoes', evaluationsRouter);
app.use('/api/contatos', contactRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/sobre-nos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sobre-nos.html'));
});
app.get('/planos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'planos.html'));
});
app.get('/aulas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'aulas.html'));
});
app.get('/contatos', (req, res) => {
 res.sendFile(path.join(__dirname, 'views', 'contatos.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/dashboard-aluno', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard-aluno.html'));
});
app.get('/dashboard-professor', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard-professor.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});