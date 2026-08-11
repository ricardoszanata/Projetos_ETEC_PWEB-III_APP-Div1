const apiUrl = 'http://localhost/Projetos_ETEC_PWEB-III_Div1/api/ingredientes/';

document.getElementById('frmIngrediente').addEventListener('submit', function (event) {
    event.preventDefault();
    let nome = document.getElementById('nome').value;
    let valor = document.getElementById('valor').value;
    fetch(`${apiUrl}iingrediente.php?jsn=${JSON.stringify({ nome, valor})}`)
        .then(response => response.text())
        .then(() => {
            alert('Ingrediente cadastrado!');
            window.location.reload();
        });
});

function carregaringredientes() {
    fetch(`${apiUrl}singrediente.php`)
        .then(response => response.json())
        .then(data => {
            let gridingrediente = document.getElementById('gridIngrediente');
            gridingrediente.innerHTML = '';
            data.forEach(ds => {
                gridingrediente.innerHTML += `
                            <div class="row mt-2">
                                <div class="col-sm-3">${ds.inome}</div>
                                <div class="col-sm-2">${ds.ivalor}</div>
                                <div class="col-sm-4">
                                    <button class="btn btn-warning" onclick="editaringrediente(${ds.iid}, '${ds.inome}', '${ds.ivalor}')">Editar</button>
                                    <button class="btn btn-danger" onclick="deletaringrediente(${ds.iid}, '${ds.inome}')">Excluir</button>
                                </div>
                            </div>`;
            });
        });
}

function editaringrediente(id, nome, valor) {
    document.getElementById('nome').value = nome;
    document.getElementById('valor').value = valor;
    const btn = document.querySelector('#frmIngrediente button[type="submit"]');
    btn.textContent = 'ATUALIZAR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    btn.onclick = function (event) {
        event.preventDefault();
        let unome = document.getElementById('nome').value;
        let uvalor = document.getElementById('valor').value;
        fetch(`${apiUrl}uingrediente.php?jsn=${JSON.stringify({ nome:unome, valor:uvalor, id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Ingrediente alterado!');
                window.location.reload();
            });
    }
}

function deletaringrediente(id, nome) {
    document.getElementById('nome').value = 'Deseja realmente excluir ' + nome;
    const btn = document.querySelector('#frmIngrediente button[type="submit"]');
    const txt = document.querySelector('#frmIngrediente input[type="text"]');
    btn.textContent = 'EXCLUIR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    txt.classList.add('text-danger');
    btn.onclick = function (event) {
        event.preventDefault();
        fetch(`${apiUrl}dingrediente.php?jsn=${JSON.stringify({ id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Ingrediente Excluido!');
                window.location.reload();
            });
    }
}

window.onload = () => {
    carregaringredientes();
};
