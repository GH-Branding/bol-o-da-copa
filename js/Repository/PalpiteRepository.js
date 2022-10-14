
import { db, isObjetoValido, isIdValido } from "../Repository";
import { ref, query, limitToFirst, limitToLast, set, get, remove } from "firebase/database";

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
    var resultado = {}
    if (isIdValido(id)) {
      const dbRef = query(ref(db, `${nomeColecao}/${id}`))
      await get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          var dados = snapshot.val()
          resultado = dados
        }
      }).catch((error) => {
        console.error(error);
      });
    } else {
      console.log("Erro: id não é válido")
    }
    return resultado
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
      let existe = Palpite.readById(obj.id)

      if (existe.id) {
        const dbRef = ref(db, `${nomeColecao}/${obj.id}`)
        set(dbRef, obj);
      } else {
        const result = confirm('O objeto não existe no cadastro, deseja criá-lo?')
        if (result) {
          Palpite.create(obj)
        } else {
          alert('O objeto não foi cadastrado!')
        }
      }
    } else {
      console.log("Erro: o objeto não é válido")
    }
  },
  delete: async (id) => {
    if (isIdValido(id)) {
      const dbRef = ref(db, `${nomeColecao}/${id}`)
      remove(dbRef).then(() => {
        console.log('removido');
      })
      .catch(() => {
        console.log('erro ao remover');
      })
    } else {
      console.log("Erro: não há objeto para deletar");
    }
  }
  // referência: https://www.educative.io/courses/complete-guide-firebase-web/gkJGzkWK7zk
}

export default Palpite;