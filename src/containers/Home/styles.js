'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 40
  },

  title: {
    marginLeft   : 30,
    color        : 'white',
    fontFamily   : 'MidnightConstellations',
    fontSize     : 95,
    lineHeight   : 100,
    paddingRight : 30
  },

  subtitle: {
    paddingTop   : 70,
    marginBottom : 75,
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 26,
    lineHeight   : 28,
    marginLeft   : 10,
    marginRight  : 10
  },

  buttonText: {
    fontSize: 38,
    lineHeight: 34
  },

  button: {
    alignSelf: 'center',
    height: 150,
    width: 250
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
