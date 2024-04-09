function carregarChaves() {
    fetch('/seekeys')
        .then(response => response.json())
        .then(keys => {
            const keysTableBody = document.querySelector('#keysTable tbody');
            keys.forEach(key => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${key.chave}</td>
            <td>${formatarData(key.compra)}</td>
            <td>${formatarData(key.expiracao_key)}</td>
          `;
                keysTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao obter dados das chaves:', error);
        });
}

function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
