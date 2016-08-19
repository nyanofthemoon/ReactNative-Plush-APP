'use strict'

import React from 'react'

import { facebookConnectionLogout } from './../../actions'

import Container from './../../components/Container'
import FacebookButton from './../../components/FacebookButton'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <Container header={true} footer={true} cover={'splash'}>
        <FacebookButton handleLogout={facebookConnectionLogout} />
      </Container>
    )
  }
}