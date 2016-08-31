'use strict'

import React from 'react'
import { Text } from 'react-native'
import { List, ListItem, InputGroup, Input, Picker, CheckBox, Item, Icon, Button } from 'native-base'
import { connect } from 'react-redux'

import Container from './../../components/Container'
import ProfileForm from './../../components/ProfileForm'

import { goToLogoutScene } from './../../actions'

import styles from './styles'

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
      <Container header={true} scene='profile' headerTitle='Profile' scrollEnabled={true}>
        <ProfileForm user={user.toJSON()}/>
        <Button danger onPress={goToLogoutScene}>Logout</Button>
      </Container>
    )
  }
}