'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    //flexDirection: 'row',
    //alignItems: 'flex-start',
    //height: 200
  },
  footerContainer: {
    //marginTop: 5,
    //marginLeft: 10,
    //marginRight: 10,
    //marginBottom: 10,
    height: 100,
    backgroundColor: 'red'
  },
  footerText: {
    fontSize: 14,
    color: 'yellow',
  },

  emptyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : 28,
    lineHeight: 34
  }

})