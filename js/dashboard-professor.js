

document.getElementById('inserirAvaliacaoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const matricula = localStorage.getItem('matricula');

    if (!token || !matricula) {
        alert('Você precisa estar logado para inserir avaliação.');
        window.location.href = '../views/login.html';
        return;
    }
    const aluno = document.getElementById('aluno').value;
    const data = document.getElementById('data').value;
    const braco = parseFloat(document.getElementById('braco').value);
    const perna = parseFloat(document.getElementById('perna').value);
    const coxa = parseFloat(document.getElementById('coxa').value);
    const panturrilha = parseFloat(document.getElementById('panturrilha').value);
  const peito = parseFloat(document.getElementById('peito').value);
  const abdomen = parseFloat(document.getElementById('abdomen').value);
  const gluteos = parseFloat(document.getElementById('gluteos').value);

  const avaliacao = { matricula: aluno, data, braco, perna, coxa, panturrilha, peito, abdomen, gluteos };

  fetch('/api/avaliacoes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(avaliacao)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
        alert('Avaliação inserida com sucesso!');
        document.getElementById('inserirAvaliacaoForm').reset();
    }else {
        alert('Erro ao inserir avaliação: ' + data.mensagem);
    }
  }).catch (error => {
    console.error('Erro: ', error);
    alert('Erro ao inserir Avaliação');
  });  
});