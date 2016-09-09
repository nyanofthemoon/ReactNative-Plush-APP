'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  audio: {
    alignSelf: 'center',
    color: 'white',
    marginTop: 60,
    fontSize: 50,
    fontFamily:'IndieFlower'
  },

  mini: {
    alignSelf: 'flex-end',
    width: 90,
    height: 120,
    position: 'absolute'
  },

  hidden: {
    height: 0,
    width: 0
  }

})