import Palpite from './PalpiteRepository';

var APP = {

  init: async function () {

    try {
      var idTest = 15
      var registros = await Palpite.read(true, 10);
      console.log('Registro', registros)

      registros = await Palpite.readById(idTest);
      console.log('Registro', registros)

      Palpite.create({nome: "gabriel"})

    } catch (e) {
      console.log(e)
    }

  },

}

APP.init();