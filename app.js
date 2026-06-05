'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato } from './contatos.js'

let idAtual = null

function limparCampos() {
    document.getElementById('foto').value     = ''
    document.getElementById('nome').value     = ''
    document.getElementById('celular').value  = ''
    document.getElementById('email').value    = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value   = ''
}

async function salvarContato() {
    const contato = {
        foto:     document.getElementById('foto').value.trim(),
        nome:     document.getElementById('nome').value.trim(),
        celular:  document.getElementById('celular').value.trim(),
        email:    document.getElementById('email').value.trim(),
        endereco: document.getElementById('endereco').value.trim(),
        cidade:   document.getElementById('cidade').value.trim()
    }

    if (!contato.nome || !contato.foto || !contato.email || !contato.celular || !contato.endereco || !contato.cidade) {
        alert('Preencha todos os campos!')
    } else {
        if (idAtual == null) {
            await postContato(contato)
        } else {
            await putContato(idAtual, contato)
            idAtual = null
            document.getElementById('btn-enviar').textContent = 'Salvar'
        }
    
        limparCampos()
        await get()
    }
}

async function get() {
    const contatos = await getContatos()
    const linhas = contatos.map(criarLinha)
    document.getElementById('tbody').replaceChildren(...linhas)
}

async function put(id) {
    const contato = await getContato(id)
    idAtual = contato.id

    document.getElementById('foto').value     = contato.foto
    document.getElementById('nome').value     = contato.nome
    document.getElementById('celular').value  = contato.celular
    document.getElementById('email').value    = contato.email
    document.getElementById('endereco').value = contato.endereco
    document.getElementById('cidade').value   = contato.cidade

    document.getElementById('btn-enviar').textContent = 'Atualizar'
}

async function del(id, nome) {
    const confirmar = confirm(`Tem certeza que deseja excluir "${nome}"?`)
    if (!confirmar) return

    await deleteContato(id)
    await get()
}

function criarLinha(contato) {
    const tr = document.createElement('tr')

    const id       = document.createElement('td')
    const foto     = document.createElement('td')
    const nome     = document.createElement('td')
    const celular  = document.createElement('td')
    const email    = document.createElement('td')
    const endereco = document.createElement('td')
    const cidade   = document.createElement('td')
    const acoes    = document.createElement('td')

    id.textContent       = contato.id
    nome.textContent     = contato.nome
    celular.textContent  = contato.celular
    email.textContent    = contato.email
    endereco.textContent = contato.endereco
    cidade.textContent   = contato.cidade

    const imagem = document.createElement('img')
    imagem.src   = contato.foto
    imagem.width = 80
    foto.appendChild(imagem)

    acoes.classList.add('acoes')
    const atualizar = document.createElement('button')
    atualizar.className = 'btn-acao btn-editar'
    atualizar.title = 'Editar contato'
    atualizar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>`
    atualizar.addEventListener('click', () => put(contato.id))

    const deletar = document.createElement('button')
    deletar.className = 'btn-acao btn-excluir'
    deletar.title = 'Excluir contato'
    deletar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`
    deletar.addEventListener('click', () => del(contato.id, contato.nome))

    acoes.append(atualizar, deletar)
    tr.replaceChildren(id, foto, nome, celular, email, endereco, cidade, acoes)

    return tr
}


document.getElementById('btn-enviar')
    .addEventListener('click', salvarContato)

document.addEventListener('DOMContentLoaded', get)