// Exibe mensagem de erro caso tenha dados incorretos no acesso
function exibirMensagemErro() {
    const urlParams = new URLSearchParams(window.location.search);
    const mensagem = urlParams.get('mensagem');
    if (mensagem) {
        alert(mensagem); // Exibe mensagem de erro como um alerta
    }
}
