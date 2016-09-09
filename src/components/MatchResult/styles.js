'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop    : 25
  },

  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -35
  },

  title: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : 28,
    lineHeight   : 35,
    marginBottom : 50
  },

  icon: {
    width : 105,
    height: 120,
    margin: 25
  },

  largeicon: {
    width : 100,
    height: 100,
    alignSelf: 'center'
  },

  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 75,
    width: 200,
    paddingTop: 25
  },


})