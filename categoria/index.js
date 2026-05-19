const apiUrl = 'http://localhost/Projetos_ETEC_PWEB-III_Div1/api/categorias/';

document.getElementById('frmCategoria').addEventListener('submit', function (event) {
    event.preventDefault();
    let nome = document.getElementById('nome').value;

    fetch(`${apiUrl}icategoria.php?jsn=${JSON.stringify({ nome })}`)
        .then(response => response.text())
        .then(() => {
            alert('Categoria cadastrado!');
            window.location.reload();
        });
});

function carregarcategorias() {
    fetch(`${apiUrl}scategoria.php`)
        .then(response => response.json())
        .then(data => {
            let gridCategoria = document.getElementById('gridCategoria');
            gridCategoria.innerHTML = '';
            data.forEach(ds => {
                gridCategoria.innerHTML += `
                            <div class="row mt-2">
                                <div class="col-sm-3">${ds.nome}</div>
                                <div class="col-sm-2">${ds.ativo ? 'ATIVO' : 'INATIVO'}</div>
                                <div class="col-sm-4">
                                    <button class="btn btn-warning" onclick="editarcategoria(${ds.id}, '${ds.nome}', '${ds.ativo}')">Editar</button>
                                    <button class="btn btn-danger" onclick="deletarcategoria(${ds.id}, '${ds.nome}')">Excluir</button>
                                </div>
                            </div>`;
            });
        });
}

function editarcategoria(id, nome, ativo) {
    document.getElementById('nome').value = nome;
    const btn = document.querySelector('#frmCategoria button[type="submit"]');
    btn.textContent = 'ATUALIZAR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    btn.onclick = function (event) {
        event.preventDefault();
        let unome = document.getElementById('nome').value;
        fetch(`${apiUrl}ucategoria.php?jsn=${JSON.stringify({ nome: unome, ativo, id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Categoria alterado!');
                window.location.reload();
            });
    }
}

function deletarcategoria(id, nome) {
    document.getElementById('nome').value = 'Deseja realmente excluir ' + nome;
    const btn = document.querySelector('#frmCategoria button[type="submit"]');
    const txt = document.querySelector('#frmCategoria input[type="text"]');
    btn.textContent = 'EXCLUIR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    txt.classList.add('text-danger');
    btn.onclick = function (event) {
        event.preventDefault();
        fetch(`${apiUrl}dcategoria.php?jsn=${JSON.stringify({ id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Categoria Excluido!');
                window.location.reload();
            });
    }
}
window.onload = carregarcategorias;