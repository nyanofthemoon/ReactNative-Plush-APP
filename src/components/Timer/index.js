'use strict'

import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      remaining: null,
      interval : null
    }
  }

  componentDidMount() {
    let that = this
    this.setState({
      remaining: (parseInt(this.props.milliseconds) + 1),
      interval : setInterval(function() {
        that._update()
      }, 1000)
    })
  }

  componentWillUnmount() {
    this._clearInterval()
  }

  _clearInterval() {
    clearInterval(this.state.interval)
    this.setState({
      remaining: 0,
      interval : null
    })
  }

  _update() {
    let remaining = this.state.remaining - 1000
    if (remaining > 99) {
      this.setState({
        remaining: remaining
      })
    } else {
      this._clearInterval()
    }
  }

  _mmss() {
    var date = new Date(this.state.remaining)
    var s = date.getSeconds()
    return date.getMinutes() + ':' + (s < 10 ? '0' : '') + s
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this._mmss()}</Text>
      </View>
    )
  }
}