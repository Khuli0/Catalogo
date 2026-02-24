let produtos = JSON.parse(localStorage.getItem("produtos")) || []

function salvar(){

    localStorage.setItem("produtos", JSON.stringify(produtos))
}

function adicionarProduto(){

    let nome = document.getElementById("nome")?.value
    let preco = document.getElementById("preco")?.value
    let imagem = document.getElementById("imagem")?.value

    if(!nome || !preco || !imagem){
        return
    }

    produtos.push({
        nome,
        preco,
        imagem
    })

    salvar()

    mostrarProdutos()

    document.getElementById("nome").value = ""
    document.getElementById("preco").value = ""
    document.getElementById("imagem").value = ""
}

function removerProduto(index){

    produtos.splice(index, 1)

    salvar()

    mostrarProdutos()
}

function mostrarProdutos(){

    let lista = document.getElementById("lista")

    if(!lista) return

    lista.innerHTML = ""

    produtos.forEach((produto, index) => {

        let admin = localStorage.getItem("logado") === "true"

        lista.innerHTML += `
        
        <div class="produto">

            <img src="${produto.imagem}">

            <h3>${produto.nome}</h3>

            <p>R$ ${produto.preco}</p>

            ${
                admin
                ?
                `<button onclick="removerProduto(${index})">
                Remover
                </button>`
                :
                ""
            }

        </div>
        
        `
    })
}

mostrarProdutos()