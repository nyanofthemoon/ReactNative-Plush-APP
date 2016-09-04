'use strict'

import { StyleSheet, Dimensions } from 'react-native'
import base from './../../components/Container/styles'

export default StyleSheet.create({

  container: {
    height: Dimensions.get('window').height - 75
  },

  tab: StyleSheet.flatten(base.tab)

})