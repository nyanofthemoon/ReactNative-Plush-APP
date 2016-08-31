'use strict'

import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  itemLeft: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginLeft: 40
  },

  itemRight: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    marginLeft: 50
  },

  icon: {
    width : 35,
    height: 40,
    marginLeft: -10,
    marginRight: 5
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  }

})