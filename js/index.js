import firebaseConfig from './config';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from "firebase/database";

const app = initializeApp(firebaseConfig);

var APP = {
  insert: function (key, id, data) {
    const db = getDatabase(app);
    set(ref(db, 'key/' + id), data);
  },
  read: function () {
    const dbRef = ref(getDatabase(app));
    get(child(dbRef, `matches`)).then((snapshot) => {
      if (snapshot.exists()) {
        var dados = snapshot.val();
        var resultado = APP.filtrarLista(dados, "Senegal");
        console.log(resultado);
      } else {
        console.log("Não há dados para serem exibidos");
      }
    }).catch((error) => {
      console.error(error);
    });
  },

  filtrarLista: function (lista, termo) {
    return lista.filter(function (item) {
      return item.team1 == termo || item.team2 == termo;
    });
  },

  init: function () {
    APP.read();
  }
}

APP.init();