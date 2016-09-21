'use strict'

import React, { Component } from 'react';
import { View, Text, Vibration, Alert, Image, Dimensions } from 'react-native'
import { Title, Button } from 'native-base'
import { connect } from 'react-redux'
import { default as Sound } from 'react-native-sound'
var Spinner = require('react-native-spinkit')

import { goToContactsScene, calculateUnreadMessages, hangupCall } from './../../actions'

import Container from './../../components/Container'
import RTCView from './../../components/RTCView'
import CallFooter from './../../components/CallFooter'

import Config from './../../config'

import slides from './../../helpers/images/tutorial'

import styles from './styles'

const notificationSound = new Sound('notification.mp3', Sound.MAIN_BUNDLE)

@connect(
  state => ({
    app    : state.app,
    contact: state.contact,
    ring   : state.ring
  })
)

export default class extends React.Component {
  static propTypes = {
    app    : React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    ring   : React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      accepted: false
    }
  }

  _vibrate() {
    Vibration.vibrate()
    notificationSound.play()
  }

  _confirmHangup() {
    Alert.alert(
      'Hangup Confirmation',
      'Are you sure you wish to HANGUP and leave this call?',
      [
        { text: 'No...' },
        { text: 'YES!', onPress: () => hangupCall() }
      ]
    )
  }

  _acceptCall() {
    this.setState({
      accepted: true
    })
  }

  _rejectCall() {
    const {ring} = this.props
    let name = ring.get('name') || null
    hangupCall(name)
  }

  render() {
    const {app, ring} = this.props
    switch(ring.get('status')) {
      default:
        return (
          <Container footer={<CallFooter hangup={this._confirmHangup.bind(this)}  active={true} />}>
            <RTCView key='call' data={{ mode: 'video', kind: 'call', id: app.get('currentSceneId') }} localStream={app.get('localStream')} socket={app.get('socket')} config={Config.webrtc}/>
          </Container>
        )
      case 'waiting':
        if (false === this.state.accepted) {
          this._vibrate()
          const {contact} = this.props
          let profile = contact.getIn(['profiles', ring.get('initiator')])
          return (
            <Container header={false} footer={<CallFooter accept={this._acceptCall.bind(this)} reject={this._rejectCall.bind(this)} active={false} />}>
              <View style={{flex:1, height: (Dimensions.get('window').height-55), backgroundColor:'#262672', alignItems:'center', justifyContent:'space-around'}}>
              <Spinner size={45} type='ThreeBounce' style={{ alignSelf:'center'}} color='#FFFFFF'/>
              <Text style={styles.slideTextDetail}>Someone Is Calling!</Text>
              <Image style={{ height: 250, width: 250, resizeMode: 'cover', alignSelf: 'center', borderRadius: 125}} source={{uri: profile.getIn(['profile', 'picture'])} } />
              <Text style={styles.slideText}>{profile.getIn(['profile', 'nickname'])}</Text>

              </View>
            </Container>
          )
        } else {
          return (
            <Container header={false} footer={<CallFooter hangup={this._confirmHangup.bind(this)}  active={true} />} unread={calculateUnreadMessages()}>
              <RTCView key='call' data={{ mode: 'video', kind: 'call', name: ring.get('name') }} localStream={app.get('localStream')} socket={app.get('socket')} config={Config.webrtc}/>
            </Container>
          )
        }
      case 'busy':
        return (
          <Container header={true} headerTitle={'Unavailable'} unread={calculateUnreadMessages()}>
            <Text>Busy Or Unavailable</Text>
          </Container>
        )
      case 'inactive':
        return (
          <Container header={true} headerTitle={'Call Ended'} unread={calculateUnreadMessages()}>
            <Text>Ended</Text>
          </Container>
        )
      }
  }

}