'use strict'

import React from 'react'
import { NavigationExperimental } from 'react-native'
import { connect } from 'react-redux'

import Login from './Login'
import Home from './Home'

const { CardStack } = NavigationExperimental

@connect(
  state    => state,
  dispatch => ({ dispatch })
)

export default class extends React.Component {
  static propTypes = {
    routes  : React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  handleNavigation = action => {
    this.props.dispatch(action)
  }

  renderScene = props => {
    switch (props.scene.key) {
      case 'scene_login':
        return (<Login navigate={this.handleNavigation} />)
      case 'scene_home':
        return (<Home navigate={this.handleNavigation} />)
      default:
        return null
    }
  }

  render() {
    return (
      <CardStack
        direction='horizontal'
        navigationState={this.props.routes}
        renderScene={this.renderScene}
      />
    )
  }
}
