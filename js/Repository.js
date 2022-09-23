import firebaseConfig from './config'
import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database"

// conexão com o firebase e banco
export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

// funções de validação
export const isObjetoValido = (obj) => {
    return obj && typeof obj == 'object'
}
export const isIdValido = (id) => {
    return id && typeof id == 'number'
}

// todo: validar o conteúdo do objeto, pensar em como poderia ser feito