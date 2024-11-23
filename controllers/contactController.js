const db = require('../config/db');

exports.receiveContact = (req, res) => {
    const { name, email, telefone, mensagem } = req.body;

    const insertQuery = 'INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [nome, email, telefone, mensagem], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, mensagem: 'Erro ao salvar mensagem' });  
        }
        res.status(201).json({ success: true, mensagem: 'Mensagem recebida com sucesso' });
    });
};