
import { db, isObjetoValido, isIdValido } from "./Repository";
import { ref, query, limitToFirst, limitToLast, set, get, remove, update } from "firebase/database";

const nomeColecao = 'palpites'

const Palpite = {
  create: async (obj) => {
    var novoId = 1
    if (isObjetoValido(obj)) {
      let ultimo = await Palpite.read(false, 1)
      novoId = (ultimo && ultimo.length) ? (parseInt(ultimo[0].id) + 1) : 1
      obj.id = novoId
      const dbRef = ref(db, `${nomeColecao}/${novoId}`)
      set(dbRef, obj);
    } else {
      console.log("Erro: não há objeto para inserir")
    }
  },
  readById: async (id) => {
    // ler do banco, mas apenas 1 registro informado pelo usuário
    // se o registro não existe, retorna array vazio
  },
  read: async (primeiro, limite) => {
    var result = [];
    limite = limite ? limite : 10
    const condicao = (primeiro ? limitToFirst(limite) : limitToLast(limite))
    const dbRef = query(ref(db, nomeColecao), condicao)
    await get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        var dados = snapshot.val()
        let chaves = Object.keys(dados)
        for (let chave of chaves) {
          result.push(dados[chave])
        }
      }
    }).catch((error) => {
      console.error(error);
    });
    return result.filter(item => item)
  },
  update: async (obj) => {
    if (isObjetoValido(obj)) {
      const dbRef = ref(db, `${nomeColecao}/${obj.id}`)
      update(dbRef, obj);
    } else {
      console.log("Erro: não há objeto para atualizar")
      const result = confirm('O objeto não existe no cadastro, deseja criá-lo?')
      if (result == true) {
        Palpite.create(obj)
      } else {
        alert('O objeto não foi cadastrado!')
      }

    }
    // passa um objeto que já tenha um id
    // manda o banco gravar esse objeto nesse id, ou seja, se já tiver algo com esse id vai gravar por cima
    // se não tiver nada com esse id, vai inserir
  },
  delete: (id) => {
    // usa a função remove()
    // referência: https://www.educative.io/courses/complete-guide-firebase-web/gkJGzkWK7zk
  }
}

export default Palpite;