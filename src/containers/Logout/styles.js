'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  button: {
    width: 200
  },

  title: {
    padding      : 20,
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

  subtitle: {
    padding      : 20,
    marginBottom : 40,
    color        : 'yellow',
    fontFamily   : 'IndieFlower',
    fontSize     : 30,
    lineHeight   : 30,
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  },

  button: {
    marginBottom: 50
  }

})
