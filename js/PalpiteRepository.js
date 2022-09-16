import firebaseConfig from './config';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";

// Docs: https://firebase.google.com/docs/database/web/read-and-write
const app = initializeApp(firebaseConfig);

const Palpite = {
    create: () => {
        const db = getDatabase(app);
        const dbRef = ref(getDatabase(app));
        get(child(dbRef, `palpites`)).then((snapshot) => {
          if (snapshot.exists()) {
            let dados = snapshot.val();
            var id_ultimo = 1
            let data = {
                "jogo_id": 1,
                "usuario_id": 1,
                "penaltis": false,
                "placar1": 1,
                "placar2": 2
            }
            if (dados && dados.length) {
                id_ultimo = dados[dados.length-1].id
            } 
            data.id = id_ultimo + 1
            set(ref(db, 'palpites/' + data.id), data);
          } else {
            console.log("Não há dados para serem exibidos");
          }
        }).catch((error) => {
          console.error(error);
        });
    },
    read: () => {
        const dbRef = ref(getDatabase(app));
        get(child(dbRef, `palpites`)).then((snapshot) => {
          if (snapshot.exists()) {
            var dados = snapshot.val();
            console.log(dados);
          } else {
            console.log("Não há dados para serem exibidos");
          }
        }).catch((error) => {
          console.error(error);
        });
    },
    update: (id) => {
        //valida se o id é um número!
        //pega um registro que já existe no banco com id X
        //altera ele
        //manda salvar
    },
    delete: (id) => {
        //valida se o id é um número!
        //pega um registro que já existe no banco com id X
        //manda deletar
    }
}

export default Palpite;