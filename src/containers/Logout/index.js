'use strict'

import React from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import { Title, Button } from 'native-base'

import { facebookConnectionLogout, goToProfileScene, plushConnectionLogout } from './../../actions'

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

  /*
  _confirmErase() {
    Alert.alert(
      'Erase Confirmation',
      'Are you sure you wish to PERMANENTLY erase your profile and contacts? You will not be able to recover your information.',
      [
        { text: 'No...' },
        { text: 'YES!', onPress: () => eraseAllData() }
      ]
    )
  }
  */

  render() {
    const {user} = this.props
    let logoutButton = <FacebookButton style={styles.centered} handleLogout={facebookConnectionLogout}/>
    if ('plush' === user.get('provider')) {
      logoutButton = <Button danger style={[styles.centered, styles.plushLogout]} onPress={plushConnectionLogout}>Plush! Logout</Button>
    }
    return (
      <Container header={false} cover={{type: 'splash', data:{subtype: 'logout', gender:user.getIn(['profile', 'gender']), orientation:user.getIn(['profile', 'orientation'])}}}>
        <Title style={[styles.title, styles.shadowed]}>Plush!</Title>
        <Title style={[styles.subtitle, styles.shadowed]}>Take it easy. Bye!</Title>
        <Button info large style={[styles.centered, styles.shadowed, styles.bottomPadded, styles.logout]} onPress={goToProfileScene}>I'm Not Done</Button>
        {logoutButton}
      </Container>
    )
  }
}