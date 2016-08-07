'use strict'

import React from 'react'
import { Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { facebookConnectionSuccess, facebookConnectionFailure } from './../actions'
import StatusBarBackground from './../components/StatusBarBackground'
import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import ListViewContainer from './../components/ListViewContainer'
import Icon from 'react-native-vector-icons/FontAwesome';

@connect(
  state => ({
    app : state.app,
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    app     : React.PropTypes.object.isRequired,
    user    : React.PropTypes.object.isRequired
  };

  render() {
    const {app, user} = this.props
    return (
      <ViewContainer>
        <StatusBarBackground/>
        <TextContainer>Audio Scene</TextContainer>
      </ViewContainer>
    )
  }
}