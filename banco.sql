CREATE DATABASE bodylab;
USE bodylab;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('aluno', 'professor', 'recepcao') NOT NULL),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela de Avaliações
CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula_aluno VARCHAR(20) NOT NULL,
    data DATE NOT NULL,
    braco DECIMAL(5,2),
    perna DECIMAL(5,2),
    coxa DECIMAL(5,2),
    panturrilha DECIMAL(5,2),
    peito DECIMAL(5,2),
    abdomem DECIMAL(5,2),
    gluteos DECIMAL(5,2),
    FOREING KEY (matricula_aluno) REFERENCES usuarios(matricula)
);

-- Tabela de Contatos
CREATE TABLE contatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);