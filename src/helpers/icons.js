'use strict'

import React from 'react'
import { Icon } from 'native-base'

export function genderIcon(gender, style) {
  if ('M' === gender) {
    return <Icon name='md-male' style={[{color:'#87CEFA'}, style]} />
  } else {
    return <Icon name='md-female' style={[{color:'#F08080'}, style]} />
  }
}