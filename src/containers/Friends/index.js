'use strict'

import React, { Component } from 'react'
import { Text } from 'react-native'
import { Button } from 'native-base'

import { goToHomeScene } from './../../actions'

import Container from './../../components/Container'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <Container header={true} footer={true}>
        <Text>Friends Scene</Text>
        <Button success onPress={goToHomeScene}>Back</Button>
      </Container>
    )
  }
}