// Exibe mensagem de erro caso tenha dados incorretos no acesso
function exibirMensagemErro() {
    const urlParams = new URLSearchParams(window.location.search);
    const mensagem = urlParams.get('mensagem');
    if (mensagem) {
        document.getElementById('mensagemErro').innerText = mensagem;
    }
}
