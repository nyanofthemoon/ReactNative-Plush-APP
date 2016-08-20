'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
  },

  title: {
    paddingLeft  : 40,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 75,
    lineHeight   : 75,
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  },

  centered: {
    alignSelf: 'center'
  },

  bottomPadded: {
    marginBottom: 50
  }

})
