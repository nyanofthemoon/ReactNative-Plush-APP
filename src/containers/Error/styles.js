'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  centered: {
    alignSelf: 'center'
  },

  title: {
    paddingTop   : 20,
    marginLeft   : 30,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 75,
    lineHeight   : 70
  },

  subtitle: {
    paddingTop   : 20,
    marginBottom : 75,
    color        : 'red',
    fontFamily   : 'IndieFlower',
    fontSize     : 30,
    lineHeight   : 30
  },

  message: {
    marginTop    : 25,
    padding      : 10,
    color        : 'red',
    fontFamily   : 'VarelaRound-Regular',
    fontSize     : 12,
    lineHeight   : 12
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
