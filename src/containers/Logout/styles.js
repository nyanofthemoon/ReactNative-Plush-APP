'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  centered: {
    alignSelf: 'center'
  },

  bottomPadded: {
    marginBottom: 30
  },

  title: {
    paddingTop   : 20,
    marginLeft   : 30,
    color        : 'white',
    fontFamily   : 'PermanentMarker',
    fontSize     : 75,
    lineHeight   : 70
  },

  subtitle: {
    paddingTop   : 20,
    marginBottom : 75,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 25,
    lineHeight   : 25
  },

  shadowed: {
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  },

  logout: {
    width: 182,
    height: 75
  }

})
