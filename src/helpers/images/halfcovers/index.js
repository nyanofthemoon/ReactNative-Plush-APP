'use strict'

export default {

  relationship: {
    MS: [require('./relationship-mm.png'), require('./relationship-mm2.png')],
    FS: [require('./relationship-ff.png'), require('./relationship-ff2.png')],
    MO: [require('./relationship-mf.png'), require('./relationship-mf2.png'), require('./relationship-mf3.png')],
    FO: [require('./relationship-mf.png'), require('./relationship-mf2.png'), require('./relationship-mf3.png')],
    MA: [require('./relationship-mm.png'), require('./relationship-mm2.png'), require('./relationship-mf.png'), require('./relationship-mf3.png')],
    FA: [require('./relationship-ff.png'), require('./relationship-ff2.png'), require('./relationship-mf.png'), require('./relationship-mf3.png')]
  },

  friendship: {
    MS: [require('./friendship-mm.png'), require('./friendship-mm2.png')],
    FS: [require('./friendship-ff.png'), require('./friendship-ff2.png')],
    MO: [require('./friendship-mf.png'), require('./friendship-mf2.png')],
    FO: [require('./friendship-mf.png'), require('./friendship-mf2.png')],
    MA: [require('./friendship-mm.png'), require('./friendship-mf.png')],
    FA: [require('./friendship-ff.png'), require('./friendship-mf.png')]
  }

}