'use strict'

export default {

  relationship: {
    MS: [require('./relationship-mm.png')],
    FS: [require('./relationship-ff.png')],
    MO: [require('./relationship-mf.png')],
    FO: [require('./relationship-mf.png')],
    MA: [require('./relationship-mm.png'), require('./relationship-mf.png')],
    FA: [require('./relationship-ff.png'), require('./relationship-mf.png')]
  },

  friendship: {
    MS: [require('./friendship-mm.png')],
    FS: [require('./friendship-ff.png')],
    MO: [require('./friendship-mf.png')],
    FO: [require('./friendship-mf.png')],
    MA: [require('./friendship-mm.png'), require('./friendship-mf.png')],
    FA: [require('./friendship-ff.png'), require('./friendship-mf.png')]
  }

}