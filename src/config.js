'use strict'

module.exports = {

  // paid version will have another id - force people to have the latest version
  // paid this version will be a different app for 0.99$ which will not have any ads
  // https://identitysafe.norton.com/password-generator
  application: {
    mode   : 'free',
    version: '1.0',
    token  : 'dr7p4Kaja53#-xaY7remuthU7es*ucAjW_EcenUh-t@#SpE3e_uBuswef-a*atuSbrEW#e2aprEx2pusPubra_ru@#eruWrAp3n2HE$rA#2+uwu2eStUqu2r2z$vAVUg5*zeqU4wepr+kaT=aWr8+reh5phaduVuQaFr6P5XacrarUdR2vE+w6CHutHusUs4#exa8ADed5@est7de6EhapHej4pr*4Ra!E6re7raq@wrus?f=e#aqAZufrEwru?R'
  },

  webrtc: {
    'iceServers': [
      {'url': 'stun:stun.l.google.com:19302'},
      {'url': 'stun:stun1.l.google.com:19302'},
      {'url': 'stun:stun2.l.google.com:19302'},
      {'url': 'stun:stun3.l.google.com:19302'},
      {'url': 'stun:stun4.l.google.com:19302'}
    ]
  },

  google: {
    geocodingApiKey: 'AIzaSyBX4aDbdxRjqlJe-6GCi33eaP8J91KaTww'
  },

  ads: {
    test  : true,
    interstitial: {
      id      : 'ca-app-pub-5170625817624589/6144279753',
      interval: (5 * 60000)
    }
  },

  environment: {
    //name    : 'development',
    //protocol: 'http',
    //host    : 'localhost',
    //port    : ':8888'
    name    : 'development',
    protocol: 'https',
    host    : 'camroulette-api.herokuapp.com',
    port    : ''
  }

}