const express = require('express')
const webRouter = express.Router()

const fakeApi = () => {
  return {
    lovedChamps: [
      //   {
      //     name: 'Aatrox',
      //     id: 266,
      //     title: 'the Darkin Blade',
      //     image:
      //       'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg'
      //   },
      //   {
      //     name: 'Ahri',
      //     id: 103,
      //     title: 'the Nine-Tailed Fox',
      //     image:
      //       'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg'
      //   },
      //   {
      //     name: 'Akali',
      //     id: 84,
      //     title: 'the Fist of Shadow',
      //     image:
      //       'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg'
      //   }
    ],
    hatedChamps: [
      {
        name: 'Yasuo',
        id: 157,
        title: 'the Unforgiven',
        image:
          'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg'
      },
      {
        name: 'Darius',
        id: 122,
        title: 'the Hand of Noxus',
        image:
          'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg'
      },
      {
        name: 'Teemo',
        id: 17,
        title: 'the Swift Scout',
        image:
          'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Teemo_0.jpg'
      }
    ]
  }
}

webRouter.get('/', (req, res) => {
  res.render('datos', { nombre: 'Juan', edad: '23' })
})

webRouter.get('/champs', (req, res) => {
  res.render('champs', fakeApi())
})

module.exports = webRouter
