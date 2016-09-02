'use strict'

import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
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
  }

  _saveProfile() {
    // this.refs.form
  }

  render() {
    const {user} = this.props
    let footer = (
      <View style={styles.container}>
        <Button danger style={styles.logoutButton} onPress={goToLogoutScene}>Logout</Button>
        <Button success style={styles.saveButton} onPress={this._saveProfile}>Save</Button>
      </View>
    )
    return (
      <Container header={true} footer={footer} scene='profile' headerTitle='Personal Profile' scrollEnabled={true}>
        <ProfileForm ref='form' user={user.toJSON()}/>
      </Container>
    )
  }
}