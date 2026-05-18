'use strict'

import { getContatos, getContato, postContato, putContato, deleteContato } from "./contatos.js"

const atualizarContato = {
    "nome": "Kayque Almeida - Teste Atualizar",
    "celular": "11 9 5697-0042",
    "foto": "https://img.freepik.com/psd-gratuitas/renderizacao-3d-do-estilo-de-cabelo-para-o-design-do-avatar_23-2151869121.jpg",
    "email": "kayque@gmail.com",
    "endereco": "Rua Odilon Correa Pires, 113",
    "cidade": "Jandira"
}

console.table (await deleteContato(89))