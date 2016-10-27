'use strict'

import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      initial : null,
      dd      : 0,
      hh      : 0,
      mm      : 0,
      ss      : 0,
      interval: null
    }
  }

  componentDidMount() {
    let that = this
    this.setState({
      initial : parseInt(this.props.start),
      interval: setInterval(function() {
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
      initial: null
    })
  }

  _update() {
    let delta = Math.abs(this.state.initial - new Date().getTime()) / 1000
    let dd = Math.floor(delta / 86400)
    delta -= dd * 86400
    let hh = Math.floor(delta / 3600) % 24
    delta -= hh * 3600
    let mm = Math.floor(delta / 60) % 60
    delta -= mm * 60
    let ss = Math.floor(delta % 60)
    if (dd >= 1 || hh >= 1 || mm >= 1 || ss >= 1) {
      this.setState({
        dd: dd,
        hh: hh >= 10 ? hh : '0' + hh,
        mm: mm >= 10 ? mm : '0' + mm,
        ss: ss >= 10 ? ss : '0' + ss
      })
    } else {
      this._clearInterval()
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.textContainer}><Text style={styles.text}>{this.state.dd}</Text></View>
          <View><Text style={styles.separator}>:</Text></View>
          <View style={styles.textContainer}><Text style={styles.text}>{this.state.hh}</Text></View>
          <View><Text style={styles.separator}>:</Text></View>
          <View style={styles.textContainer}><Text style={styles.text}>{this.state.mm}</Text></View>
          <View><Text style={styles.separator}>:</Text></View>
          <View style={styles.textContainer}><Text style={styles.text}>{this.state.ss}</Text></View>
        </View>
        <View style={[styles.containerLegend, {marginTop: 1}]}>
          <View style={styles.legendContainer}><Text style={styles.legendText}>days</Text></View>
          <View><Text style={styles.legendSeparator}></Text></View>
          <View style={styles.legendContainer}><Text style={styles.legendText}>hours</Text></View>
          <View><Text style={styles.legendSeparator}></Text></View>
          <View style={styles.legendContainer}><Text style={styles.legendText}>minutes</Text></View>
          <View><Text style={styles.legendSeparator}></Text></View>
          <View style={styles.legendContainer}><Text style={styles.legendText}>seconds</Text></View>
        </View>
      </View>
    )
  }
}