'use strict'

import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height - 100
  },

  label: {
    fontFamily: 'IndieFlower',
    fontSize: 20,
    marginTop: 7
  },

  value: {
    fontFamily: 'Comfortaa',
    fontSize: 15,
    marginTop: 2,
    color: '#262672'
  },

  select: {
    paddingRight: 0,
    marginRight: 0
  },

  bio: {
    marginBottom: 175
  }

})

