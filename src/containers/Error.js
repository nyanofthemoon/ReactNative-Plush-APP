'use strict'

import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

import StatusBarBackground from './../components/StatusBarBackground'
import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'

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
        <TextContainer>Error Scene</TextContainer>
      </ViewContainer>
    )
  }
}