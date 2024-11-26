

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;
    
    const loginData = { matricula, senha };

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login realizado com sucesso!');

            localStorage.setItem('token', data.token);
            localStorage.setItem('matricula', data.usuario.matricula);
            localStorage.setItem('tipo', data.usuario.tipo);
            localStorage.setItem('nome', data.usuario.nome);

            if (data.usuario.tipo === 'aluno') {
                window.location.href = '/dashboard-aluno.html';
            }else if (data.usuario.tipo === 'professor') {
                window.location.href = '/dashboard-professor.html';
            }else if (data.usuario.tipo === 'recepcao') {
                window.location.href = '/dashboard-professor.html';
            }
        } else {
            alert('Crendenciais inválidas');
        }
    })
    .catch(error => {
        console.error('Error: ', error);
        alert('Erro ao realizar login');
    }); 
});