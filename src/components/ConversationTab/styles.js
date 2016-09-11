'use strict'

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

  title: {
    fontFamily: 'IndieFlower',
    fontSize  : 28,
    lineHeight: 34
  },

  listItem: {
    borderBottomColor: 'transparent',
    padding: 0,
    marginTop: 10
  },

  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  contactMessageContainer: {
    backgroundColor: '#262672',
    borderRadius: 6,
    padding: 10,
    flex: 1,
    flexWrap:'wrap',
    flexDirection:'row'
  },

  contactMessage: {
    color: '#DDD',
    fontFamily: 'Comfortaa',
    fontSize: 14,
    flexWrap: 'wrap',
    marginBottom: 3
  },

  contactPicture: {
    height:40,
    width:40,
    borderRadius: 20,
    marginLeft: 8
  },

  selfMessageContainer: {
    borderRadius: 6,
    backgroundColor: '#DDD',
    padding: 10,
    flex: 1,
    flexWrap:'wrap',
    flexDirection:'row'
  },

  selfMessage: {
    color: 'black',
    fontFamily: 'Comfortaa',
    fontSize: 12,
    letterSpacing: 0.5,
    flexWrap: 'wrap',
    marginTop: -2,
    marginBottom: 3
  },

  selfPicture: {
    height:40,
    width:40,
    borderRadius: 20,
    marginRight: 8
  }

})