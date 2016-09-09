'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  card: {
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
  },

  cardItem: {
    borderBottomColor: 'transparent',
    padding: 10
  },

  picture: {
    resizeMode: 'cover',
    height:200,
    marginBottom: 10
  },

  headline: {
    fontFamily: 'IndieFlower',
    fontSize: 20,
    lineHeight: 24,
    paddingBottom: 10,
    marginTop: -25
  },

  text: {
    fontFamily: 'IndieFlower',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 2,
  },

  info: {
    marginTop: 5
  },

  bio: {
    marginTop: 15
  },

  hidden: {
    height:0,
    width:0
  }

})

