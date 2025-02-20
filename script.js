'use strict'

async function pesquisarJogo(categoria) {
    const url = `https://www.freetogame.com/api/games?category=${categoria}`
    const proxyUrl = `https://api.allorigins.win/get?url=${url}`

    const response = await fetch(proxyUrl)
    const data = await response.json()
    const jogos = JSON.parse(data.contents)
    return jogos
}

function criarCard(jogo) {
    const galeria = document.getElementById('galeria')
    const novoCard = document.createElement('div')
    novoCard.classList.add('card') 
    
    const jogoImg = document.createElement('img')
    jogoImg.src = jogo.thumbnail
    novoCard.appendChild(jogoImg)
    
    const jogoTitulo = document.createElement('h3')
    jogoTitulo.textContent = jogo.title
    novoCard.appendChild(jogoTitulo)

    const jogoDescricao = document.createElement('p')
    jogoDescricao.textContent = jogo.short_description
    novoCard.appendChild(jogoDescricao)

    galeria.appendChild(novoCard)
}

async function preencherJogo() {
    const jogo = document.getElementById('jogo').value
    const jogos = await pesquisarJogo(jogo)
    const galeria = document.getElementById('galeria')
    galeria.replaceChildren()

    jogos.forEach(jogo => criarCard(jogo)) 
}
document.getElementById('pesquisar').addEventListener("click", preencherJogo)
