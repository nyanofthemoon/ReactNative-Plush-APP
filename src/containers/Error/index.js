'use strict'

import React, { Component } from 'react'
import { Text } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'

import { goToHomeScene } from './../../actions'

import Container from './../../components/Container'

@connect(
  state => ({
    app : state.app
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired
  };

  render() {
    const {app} = this.props
    return (
      <Container header={false} footer={false} cover={'splash'}>
        <Text style={{fontSize: 20}}>Oops...</Text>
        <Text>{app.get('errorMessage')}</Text>
        <Button block success onPress={goToHomeScene}>Try Again</Button>
      </Container>
    )
  }
}