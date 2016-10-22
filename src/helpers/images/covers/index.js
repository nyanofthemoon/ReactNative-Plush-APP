'use strict'

export default {

  splash: {
    MS: {
      login : [require('./splash-gay-1.png'), require('./splash-gay-2.png')],
      logout: [require('./splash-gay-1-grayscale.png'), require('./splash-gay-2-grayscale.png')]
    },
    FS: {
      login : [require('./splash-lesbian-1.png'), require('./splash-lesbian-2.png')],
      logout: [require('./splash-lesbian-1-grayscale.png'), require('./splash-lesbian-2-grayscale.png')]
    },
    MO: {
      login : [require('./splash-straight-1.png')],
      logout: [require('./splash-straight-1-grayscale.png')]
    },
    FO: {
      login : [require('./splash-straight-1.png')],
      logout: [require('./splash-straight-1-grayscale.png')]
    },
    MA: {
      login : [require('./splash-straight-1.png'), require('./splash-gay-2.png')],
      logout: [require('./splash-straight-1-grayscale.png'), require('./splash-gay-2-grayscale.png')]
    },
    FA: {
      login : [require('./splash-straight-1.png'), require('./splash-lesbian-2.png')],
      logout: [require('./splash-straight-1-grayscale.png'), require('./splash-lesbian-2-grayscale.png')]
    },
    UU: {
      login : [require('./splash-lesbian-2.png')],
      logout: [require('./splash-lesbian-2-grayscale.png')]
    }
  },

  error: require('./error.png')

}