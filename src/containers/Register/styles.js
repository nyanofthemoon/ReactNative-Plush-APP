'use strict'

import { StyleSheet, Dimensions } from 'react-native'

import { getCorrectFontSizeForResolution } from './../../helpers/font'

export default StyleSheet.create({
  button: {
    width: Dimensions.get('window').width - 10,
    height: 45,
    marginTop: 5
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  loginForm: {
    paddingTop: 55,
    paddingBottom: 40,
    marginBottom: 50,
    backgroundColor: '#262672'
  },

  registerForm: {
  },

  header: {
    color        : 'white',
    fontFamily   : 'IndieFlower',
    fontSize     : getCorrectFontSizeForResolution(24),
    lineHeight   : getCorrectFontSizeForResolution(30)
  },
})
