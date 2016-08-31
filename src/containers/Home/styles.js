'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
  },

  title: {
    paddingTop   : 20,
    marginLeft   : 30,
    color        : 'white',
    fontFamily   : 'Condiment',
    fontSize     : 75,
    lineHeight   : 90,
    letterSpacing: 3
  },

  subtitle: {
    paddingTop   : 60,
    marginBottom : 75,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 25,
    lineHeight   : 25
  },

  centered: {
    alignSelf: 'center'
  },

  shadowed: {
    shadowColor  : 'black',
    shadowOpacity: 10,
    shadowRadius : 2,
    shadowOffset : {
      height: 5,
      width: 0
    }
  }

})
