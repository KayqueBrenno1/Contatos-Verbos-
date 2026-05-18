'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js"

document.getElementById('btn-enviar').addEventListener("click", enviarContato)

async function enviarContato() {
    const nome = document.getElementById('nome').value
    const telefone = document.getElementById('telefone').value
    const foto = document.getElementById('foto').value
    const email = document.getElementById('email').value
    const logradouro = document.getElementById('logradouro').value
    const cidade = document.getElementById('cidade').value

    const contato = {
        nome,
        telefone, 
        foto, 
        email, 
        logradouro, 
        cidade,
    }

    await postContato(contato)  
}

const crrarLinha = function(contato) {
    const tr = document.createElement('tr')
}