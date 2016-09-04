'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width
  },

  reportButton: {
    marginTop: 5,
    width: 60,
    height: 45,
    marginLeft: 10
  },

  value: {
    fontFamily: 'Comfortaa',
    fontSize: 14,
    width: Dimensions.get('window').width - 79,
    marginLeft: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#262672',
    color: 'orange',
    borderBottomColor: 'transparent'
  }

})