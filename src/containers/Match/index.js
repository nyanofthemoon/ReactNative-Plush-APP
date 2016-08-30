'use strict'

import React, { Component } from 'react';
import { View, Dimensions, Text, Vibration } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import Carousel from 'react-native-looped-carousel'
import {default as Sound} from 'react-native-sound'

import { updateMatch } from './../../actions'
import { getSocketId } from './../../helpers/socket'

import Container from './../../components/Container'
import RTCView from './../../components/RTCView'
import Timer from './../../components/Timer'
import MatchVote from './../../components/MatchVote'
import MatchResult from './../../components/MatchResult'
import LatestOutcome from './../../components/LatestOutcome'

import Config from './../../config'

import styles from './styles'

const notificationSound = new Sound('notification.mp3', Sound.MAIN_BUNDLE)

@connect(
  state => ({
    app : state.app,
    room: state.room
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired,
    room: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    let {width, height} = Dimensions.get('window');
    this.state = {
      size: {width: width, height: height}
    }
  }

  _handleVote(step, feeling) {
    updateMatch({
      step   : step,
      feeling: feeling
    })
  }

  _vibrate() {
    Vibration.vibrate()
    notificationSound.play()
  }

  render() {
    const {app, room} = this.props
    let status = room.get('status')
    let footer = null
    switch(status) {
      default:
      case 'waiting':
      case 'audio':
        let header = true
        footer = <LatestOutcome />
        if ('audio' === status) {
          header = false
          footer = <Timer key='audio' milliseconds={room.get('timer')} />
          this._vibrate()
        }
        return (
          <Container header={header} footer={footer} headerTitle='Waiting Room'>
            { 'audio' !== status ?
              (
                <View>
                  <Carousel delay={60000} style={this.state.size}>
                    <View style={[{backgroundColor:'lightgreen'}, this.state.size]}>
                      <Text>Slide 1</Text>
                    </View>
                    <View style={[{backgroundColor:'pink'}, this.state.size]}>
                      <Text>Slide 2</Text>
                    </View>
                    <View style={[{backgroundColor:'lightblue'}, this.state.size]}>
                      <Text>Slide 3</Text>
                    </View>
                  </Carousel>
                </View>
              ) : (
              <View>
                <Text>Audio Only</Text>
              </View>
              )
            }
            <RTCView key='rtc_audio' data={{ mode: 'audio', kind: 'match', type: app.get('matchMode'), name: room.get('name'), flush: true }} socket={app.get('socket')} config={Config.webrtc} />
          </Container>
        )
        break
      case 'selection_audio':
        footer = <Timer key='selection_audio' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <MatchVote step='audio' type={app.get('matchMode')} handleVote={this._handleVote} />
            <Timer key='selection_audio' milliseconds={room.get('timer')} />
          </Container>
        )
        break
      case 'results_audio':
        if (room.getIn(['scores', 'audio']) >= 1) {
          footer = <Timer key='results_audio' milliseconds={room.get('timer')} />
        }
        return (
          <Container header={true} footer={footer} headerTitle='The Outcome'>
            <MatchResult step='audio' results={room.get('results').toJSON()} scores={room.get('scores').toJSON()} />
          </Container>
        )
        break
      case 'video':
        footer = <Timer key='video' milliseconds={room.get('timer')} />
        return (
          <Container header={false}>
            <RTCView key='rtc_video' footer={footer} data={{ mode: 'video', kind: 'match', type: app.get('matchMode'), name: room.get('name'), flush: false }} socket={app.get('socket')} config={Config.webrtc} />
          </Container>
        )
        break
      case 'selection_video':
        footer = <Timer key='selection_video' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <MatchVote step='video' type={app.get('matchMode')} handleVote={this._handleVote} />
          </Container>
        )
        break
      case 'results_video':
        return (
          <Container header={true} footer={footer} headerTitle='The Outcome'>
            <MatchResult step='video' results={room.get('results').toJSON()} scores={room.get('scores').toJSON()} />
          </Container>
        )
        break
      case 'terminated':
        return (
          <Container header={true} headerTitle='Oops!'>
            <Text>Sorry - Peer Left</Text>
          </Container>
        )
        break
    }
  }

}