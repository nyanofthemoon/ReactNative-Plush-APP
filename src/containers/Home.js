'use strict'

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { facebookConnectionSuccess, facebookConnectionFailure, goToFriendsScene, goToProfileScene, goToVideoScene } from './../actions'

import ViewContainer from './../components/ViewContainer'
import Header from './../components/Header'
import Button from './../components/Button'
import UserStatistics from './../components/UserStatistics'
import FacebookButton from './../components/FacebookButton'
import Footer from './../components/Footer'

@connect(
  state => ({
    app : state.app,
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  _test() {
    alert('ddd')
  }

  render() {
    const {app, user} = this.props
    return (
      <ViewContainer>
        <Header showLogo={false} />
        <Button text={'Friends Button'} onPress={goToFriendsScene} />
        <Button text={'Profile Button'} onPress={goToProfileScene} />
        <Button text={'Ready Button'} onPress={goToVideoScene} />
        <FacebookButton handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} />
        <Footer />
      </ViewContainer>
    )
  }
}