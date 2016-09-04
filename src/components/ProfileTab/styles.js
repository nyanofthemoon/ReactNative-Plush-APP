'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent'
  },

  card: {
    borderBottomColor: 'transparent',
    marginTop: 0
  },

  text: {
    fontFamily: 'IndieFlower',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 2
  },

  headline: {
    fontFamily: 'IndieFlower',
    fontSize: 20,
    lineHeight: 24,
    paddingBottom: 10,
    marginBottom: 30,
    marginTop: -25
  },

  gender: {
    paddingTop: 10,
    marginTop: -6
  },

  location: {
    flexDirection: 'row'
  },

  hidden: {
    height:0,
    width:0,
  },

  head: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -20,
  },

  profile: {
    marginTop: 20
  }

})

