
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;

    const contato = {nome, email, telefone, mensagem};

fetch('/api/contato', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(contato)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        alert('Mensagem enviada com Suceso!');
        document.getElementById('contactForm').reset();
    } else {
        alert('Erro ao enviar mensagem: ' + data.mensagem);
    }
}) .catch (error => {
    console.error('Erro: ', error);
    alert('Erro ao enviar mensagem.');
});
});