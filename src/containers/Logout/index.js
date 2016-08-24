'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { Title, Button } from 'native-base'

import { facebookConnectionLogout, goToHomeScene } from './../../actions'

import Container from './../../components/Container'
import FacebookButton from './../../components/FacebookButton'

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

  render() {
    const {user} = this.props
    return (
      <Container header={false} footer={false} cover={{type: 'splash', data:{subtype: 'logout', gender:user.get('gender'), orientation:user.get('orientation')}}}>
        <Title style={[styles.title, styles.shadowed]}>Extreme Meetups</Title>
        <Title style={[styles.subtitle, styles.shadowed]}>We're sad to see you go !</Title>
        <Button success large style={[styles.centered, styles.shadowed, styles.bottomPadded]} onPress={goToHomeScene}> Wait! Go Back...</Button>
        <FacebookButton style={styles.centered} handleLogout={facebookConnectionLogout}/>
      </Container>
    )
  }
}