class User {
    constructor(id, matricula, senha, tipo, nome, email) {
        this.id = id;
        this.matricula = matricula;
        this.senha = senha;
        this.tipo = tipo;
        this.nome = nome;
        this.email = email;
    }
}
module.exports = User;