
const form = document.getElementById('form-produto');
const nome = document.getElementById('nome');
const categoria = document.getElementById('categoria');
const preco = document.getElementById('preco');
const estoque = document.getElementById('estoque');
const corpoTabela = document.getElementById('corpo-tabela');

form.addEventListener('submit', function(evento) {  
    evento.preventDefault(); 

    const nomeValor = nome.value;
    const categoriaValor = categoria.value;
    const precoValor = parseFloat(preco.value); 
    const estoqueValor = parseInt(estoque.value); 

    const produto = {
        nome: nomeValor,
        categoria: categoriaValor,
        preco: precoValor,
        estoque: estoqueValor
    };

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(produto) 
    })
    .then(resposta => {
        if (resposta.ok) {
            alert('Produto foi cadastrado com sucesso!');
            form.reset();
            
            buscarProdutos();

        } else {
            alert('Erro ao cadastrar o produto');
        }
    });
});

function buscarProdutos() {
    fetch('http://localhost:3000/produtos')
        .then(resposta => resposta.json())
        .then(produtos => {
            corpoTabela.innerHTML = ''; 

            produtos.forEach(p => {
                const linha = document.createElement('tr');
                
                linha.innerHTML = `
                    <td>${p.nome}</td>
                    <td>${p.categoria}</td>
                    <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                    <td>${p.estoque}</td>
                    <td>
                        <button class="btn-excluir" onclick="removerProduto(${p.id})">X</button>
                    </td>
                `;

                corpoTabela.appendChild(linha);
            });
        }); 
}

function removerProduto(id) {
    if (confirm("Tem certeza que você quer remover este produto?")) {
        fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE'
        })
        .then(resposta => {
            if (resposta.ok) {
                alert("Produto removido com sucesso!");
                buscarProdutos();
            } else {
                alert("Erro ao remover o produto.");
            }
        });
    }
}

buscarProdutos();
