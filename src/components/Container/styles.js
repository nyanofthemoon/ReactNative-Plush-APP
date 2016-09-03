'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  statusBar: {
    backgroundColor: '#262672'
  },

  header: {
    backgroundColor: '#262672'
  },

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : 28,
    lineHeight: 34,
    marginTop : 16,
    marginLeft: -28
  },

  tab: {
    backgroundColor: '#262672',
    color: 'white',
    fontFamily: 'Comfortaa'
  },

  container: {
    backgroundColor: 'rgba(25, 25, 76, 0.7)'
  },

  content: {
    height: Dimensions.get('window').height - 120
  },

  footer: {
    backgroundColor: 'rgba(25, 25, 76, 0.9)'
  },

  cover: {
    resizeMode     : 'cover',
    alignItems     : 'center',
    justifyContent : 'center'
  },

  selected: {
    color: 'orange'
  }

})