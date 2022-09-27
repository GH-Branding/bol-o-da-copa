import Palpite from './PalpiteRepository';

var APP = {

  init: async function () {

    Palpite.update({
      id: 1
    })

    try {

      var idTest = 5


      var registros = await Palpite.read(true, 10);
      console.log('Registro',registros)

      registros = await Palpite.readById(idTest);
      console.log(registros)

    } catch (e) {
      console.log(e)
    }

  },

}

APP.init();