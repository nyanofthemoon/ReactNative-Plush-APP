'use strict'

import React from 'react'
import { Text } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'

import { goToHomeScene } from './../actions'

import Container from './../components/Container'

@connect(
  state => ({
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  render() {
    const {user} = this.props
    return (
      <Container header={true} footer={true}>
        <Text>Profile Scene</Text>
        <Text>{JSON.stringify(user.toJSON())}</Text>
        <Button onPress={goToHomeScene}>Back</Button>
      </Container>
    )
  }
}