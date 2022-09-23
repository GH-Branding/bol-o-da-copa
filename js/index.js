import Palpite from './PalpiteRepository';

var APP = {

  init: async function () {

    try {

      var idTest = 5

      var registros = await Palpite.read(true, 10);
      console.log(registros)

      registros = await Palpite.readById(idTest);
      console.log(registros)

    } catch (e) {
      console.log(e)
    }

  },

}

APP.init();