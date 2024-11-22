const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db  = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET  = process.env.JWT_SECRET;

exports.login = (req, res) => {
    const { matricula, senha } = req.body;

    const query = 'SELECT * FROM usuarios WHERE matricula = ?';
    db.query(query, [matricula], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, mensagem: 'Erro no servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, mensagem: 'Credenciais invalidas' });
        }

        const user = results[0];
        const match = await bcrypt.compare(senha, user.senha);

        if (!match) {
            return res.status(401).json({ success: false, mensagem: 'Credenciais ivalidas' });
        }


        const token = jwt.sign({ matricula: user.matricula, tipo: user.tipo }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            token,
            usuario: {
                matricula: user.matricula,
                tipo: user.tipo,
                nome: user.nome,
                email: user.email
            }
        });
    });

    exports.register = (req, res) => {
        const { matricula, senha, tipo, nome, email} = req.body;
        bcrypt.hash(senha, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ success: false, mensagem: 'Erro ao hash da senha' });
            }

            const insertQuery = 'INSERT INTO usuarios (matricula, senha, tipo, nome, email) VALUES (?, ?, ?, ?, ?)';
            db.query(insertQuery, [matricula, hash, tipo, nome, email], (err, results) => {
              if (err) {
                return res.status(500).json({ success: false, mensagem: 'Erro ao registrar usuario' });  
              }  
              res.status(201).json({ success: true, mensagem: 'Usuario registado com sucesso' });
            });
            });
        };
}