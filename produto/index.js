const apiUrlp = 'http://localhost/Projetos_ETEC_PWEB-III_Div1/api/produtos/';
const apiUrlc = 'http://localhost/Projetos_ETEC_PWEB-III_Div1/api/categorias/';

document.getElementById('frmProduto').addEventListener('submit', function (event) {
    event.preventDefault();
    let nome = document.getElementById('nome').value;
    let vlvenda = document.getElementById('vlvenda').value;
    let cat = document.getElementById('cat').value;
    fetch(`${apiUrlp}iproduto.php?jsn=${JSON.stringify({ nome, vlvenda, cat })}`)
        .then(response => response.text())
        .then(() => {
            alert('Produto cadastrado!');
            window.location.reload();
        });
});

function carregarprodutos() {
    fetch(`${apiUrlp}sproduto.php`)
        .then(response => response.json())
        .then(data => {
            let gridProduto = document.getElementById('gridProduto');
            gridProduto.innerHTML = '';
            data.forEach(ds => {
                gridProduto.innerHTML += `
                            <div class="row mt-2">
                                <div class="col-sm-3">${ds.nome}</div>
                                <div class="col-sm-2">${ds.vlvenda}</div>
                                <div class="col-sm-4">
                                    <button class="btn btn-warning" onclick="editarproduto(${ds.id}, '${ds.nome}', '${ds.vlvenda}','${ds.cat}')">Editar</button>
                                    <button class="btn btn-danger" onclick="deletarproduto(${ds.id}, '${ds.nome}')">Excluir</button>
                                </div>
                            </div>`;
            });
        });
}

function editarproduto(id, nome, vlvenda, cat) {
    document.getElementById('nome').value = nome;
    document.getElementById('vlvenda').value = vlvenda;
    document.getElementById('cat').value = cat;
    const btn = document.querySelector('#frmProduto button[type="submit"]');
    btn.textContent = 'ATUALIZAR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    btn.onclick = function (event) {
        event.preventDefault();
        let nome = document.getElementById('nome').value;
        fetch(`${apiUrlp}uproduto.php?jsn=${JSON.stringify({ nome, vlvenda, cat, id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Produto alterado!');
                window.location.reload();
            });
    }
}

function deletarproduto(id, nome) {
    document.getElementById('nome').value = 'Deseja realmente excluir ' + nome;
    const btn = document.querySelector('#frmProduto button[type="submit"]');
    const txt = document.querySelector('#frmProduto input[type="text"]');
    btn.textContent = 'EXCLUIR';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    txt.classList.add('text-danger');
    btn.onclick = function (event) {
        event.preventDefault();
        fetch(`${apiUrlp}dproduto.php?jsn=${JSON.stringify({ id })}`)
            .then(response => response.text())
            .then(() => {
                alert('Produto Excluido!');
                window.location.reload();
            });
    }
}

function carregarcategorias() {
    fetch(`${apiUrlc}scategoria.php`)
        .then(response => response.json())
        .then(data => {
            let gridCategoria = document.getElementById('gridCategoria');
            gridCategoria.innerHTML = '';
            data.forEach(ds => {
                gridCategoria.innerHTML += `
                            <div class="row mt-2">
                                <div class="col-sm-3">${ds.cnome}</div>
                                <div class="col-sm-4">
                                    <button class="btn btn-info" onclick="pegacategoria(${ds.cid}, '${ds.cnome}')">Selecionar</button>
                                </div>
                            </div>`;
            });
        });
}

function pegacategoria(cat, cnome) {
    document.getElementById('cat').value = cat;
    document.getElementById('cnome').value = cnome;
}

window.onload = () => {
    carregarcategorias();
    carregarprodutos();
};
//window.onload = carregarcategorias,carregarprodutos;
//window.onload = carregarprodutos,carregarcategorias; 
//window.onload = carregarprodutos; 
//window.onload = carregarcategorias;
