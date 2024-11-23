const db = require('../config/db');

exports.getEvaluations = (req, res) => {
    const { matricula } = req.query;

    if (req.user.matricula !== matricula && !['professor', 'recepcao'].includes(req.user.tipo)) {
        return res.status(403).json({ success: false, mensagem: 'Acesso negado' });
    }

    const query = 'SELECT * FROM avaliacoes WHERE matricula_aluno = ? ORDER BY data DESC'; 
    db.query(query, [matricula], (err, results) => {
        if(err) {
            return res.status(500).json({ success: false, mensagem: 'Erro no servidor' });
        }
        res.status(200).json({ success: true, avaliacoes: results });
    });
};

exports.insertEvaluation = (req, res) => {
    if (!['professor', 'recepcao'].includes(req.user.tipo)) {
        return res.status(403).json({ success: false, mensagem: 'Acesso negado' });
    }
    const { matricula, data, braco, perna, coxa, panturrilha, peito, abdomen, gluteos } = req.body;

    const query = 'INSERT INTO avaliacoes (matricula_aluno, data, braco, perna, coxa, panturrilha, peito, abdomen, gluteos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    if (err) {
        return res.status(500).json({ success: false, mensagem: 'Erro ao inserir avaliação' });
    }
    res.status(201).json({ success: true, mensagem: 'Avaliação inserida com sucesso' });
};
