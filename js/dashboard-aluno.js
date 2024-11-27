

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const matricula = localStorage.getItem('matricula');

    if (!token || !matricula) {
        alert('Você precisa fazer login primeiro.');
        window.location.href = '../views/login.html';
        return;
    }
    fetch(`/api/avaliacoes?matricula=${matricula}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tbody = document.querySelector('#avaliacoesTable tbody');
            data.avaliacoes.forEach(avaliacao => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${avaliacao.data}</td>
          <td>${avaliacao.braco}</td>
          <td>${avaliacao.perna}</td>
          <td>${avaliacao.coxa}</td>
          <td>${avaliacao.panturrilha}</td>
          <td>${avaliacao.peito}</td>
          <td>${avaliacao.abdomen}</td>
          <td>${avaliacao.gluteos}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            alert('Erro ao carregar avaliações.');
        }
    })
    .catch(error =>{
        console.error('Erro: ', error);
        alert('Erro ao carregar avaliações.');
    });
});