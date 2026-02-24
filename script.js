let produtos = JSON.parse(localStorage.getItem("produtos")) || []

function salvar(){

    localStorage.setItem("produtos", JSON.stringify(produtos))
}

function adicionarProduto(){

    let nome = document.getElementById("nome").value
    let preco = document.getElementById("preco").value
    let arquivo = document.getElementById("imagem").files[0]

    if(!nome || !preco || !arquivo){
        alert("Preencha tudo")
        return
    }

    let reader = new FileReader()

    reader.onload = function(e){

        let imagemBase64 = e.target.result

        produtos.push({
            nome,
            preco,
            imagem: imagemBase64
        })

        salvar()
        mostrarProdutos()

        document.getElementById("nome").value = ""
        document.getElementById("preco").value = ""
        document.getElementById("imagem").value = ""
    }

    reader.readAsDataURL(arquivo)
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
                `<button class="btn-remover" onclick="removerProduto(${index})">
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


document.getElementById("imagem").addEventListener("change", function(){

    let arquivo = this.files[0]

    if(!arquivo){
        document.getElementById("nomeArquivo").innerText = ""
        return
    }

    let nome = arquivo.name

    // Limite de caracteres
    let limite = 10

    if(nome.length > limite){
        nome = nome.substring(0, limite) + "..."
    }

    document.getElementById("nomeArquivo").innerText = nome
})