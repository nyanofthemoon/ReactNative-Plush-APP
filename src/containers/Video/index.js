'use strict'

import React, { Component } from 'react';
import { View, Dimensions, Text, Vibration } from 'react-native'
import { Button } from 'native-base'
import { connect } from 'react-redux'
import Carousel from 'react-native-looped-carousel'
import {default as Sound} from 'react-native-sound'

import { goToHomeScene, updateMatch } from './../../actions'
import { getSocketId } from './../../helpers/socket'

import Container from './../../components/Container'
import RTCView from './../../components/RTCView'
import Timer from './../../components/Timer'
import MatchVote from './../../components/MatchVote'

import Config from './../../config'

import styles from './styles'

const notificationSound = new Sound('notification.mp3', Sound.MAIN_BUNDLE)

let adInterval = null

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

  _handlePositiveAudioVote() {
    updateMatch({
      'step'  : 'audio',
      'action': 'yes'
    })
  }
  _handleNegativeAudioVote() {
    updateMatch({
      'step'  : 'audio',
      'action': 'no'
    })
  }
  _handlePositiveVideoVote() {
    updateMatch({
      'step'  : 'video',
      'action': 'yes'
    })
  }
  _handleNegativeVideoVote() {
    updateMatch({
      'step'  : 'video',
      'action': 'no'
    })
  }

  _evaluateMatchResults(step, results) {
    let match = {
      positive: false,
      myself  : 'no',
      other   : 'no'
    }
    let socketId = '/#' + getSocketId()
    Object.keys(results[step]).map(function(key) {
      if ('yes' === results[step][key]) {
        if (key === socketId) {
          match.myself = 'yes'
        } else {
          match.other = 'yes'
        }
      }
    })
    if ('yes' === match.myself && match.other === 'yes') {
      match.positive = true
    }
    return match
  }

  _vibrate() {
    Vibration.vibrate()
    notificationSound.play()
  }

  render() {
    const {app, room} = this.props
    let status = room.get('status')
    switch(status) {
      default:
      case 'waiting':
      case 'audio':
        let header = true
        if ('audio' === status) {
          header = false
          this._vibrate()
        }
        return (
          <Container header={header} footer={false}>
            { 'audio' !== status ?
              (
                <View>
                  <Button success onPress={goToHomeScene}>Back</Button>
                  <Text>Waiting In Queue</Text>
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
                <Timer key='audio' milliseconds={room.get('timer')} />
              </View>
              )
            }
            <RTCView key='rtc_audio' data={{ mode: 'audio', kind: 'match', type: 'relationship', name: room.get('name'), flush: true }} socket={app.get('socket')} config={Config.webrtc} />
          </Container>
        )
        break
      case 'selection_audio':
        return (
          <Container header={false} footer={false}>
            <Text>Selection Audio</Text>
            <MatchVote step='audio' handlePositiveVote={this._handlePositiveAudioVote} handleNegativeVote={this._handleNegativeAudioVote} />
            <Timer key='selection_audio' milliseconds={room.get('timer')} />
          </Container>
        )
        break
      case 'results_audio':
        let matchAudio = this._evaluateMatchResults('audio', room.get('results').toJSON())
        return (
          <Container header={false} footer={false}>
            <Text>Result Audio</Text>
            <Text>{JSON.stringify(matchAudio)}</Text>
            <Text>You said {matchAudio.myself}</Text>
            <Text>Other said {matchAudio.other}</Text>
            { true === matchAudio.positive ?
              (
                <Timer key='results_audio' milliseconds={room.get('timer')} />
              ) : (
                <Button success onPress={goToHomeScene}>Back</Button>
              )
            }
          </Container>
        )
        break
      case 'video':
        return (
          <Container header={false} footer={false}>
            <RTCView key='rtc_video' data={{ mode: 'video', kind: 'match', type: 'relationship', name: room.get('name'), flush: false }} socket={app.get('socket')} config={Config.webrtc} />
            <Timer key='video' milliseconds={room.get('timer')} />
          </Container>
        )
        break
      case 'selection_video':
        return (
          <Container header={false} footer={false}>
            <Text>Selection Video</Text>
            <MatchVote step='video' handlePositiveVote={this._handlePositiveVideoVote} handleNegativeVote={this._handleNegativeVideoVote} />
            <Timer key='selection_video' milliseconds={room.get('timer')} />
          </Container>
        )
        break
      case 'results_video':
        let matchVideo = this._evaluateMatchResults('video', room.get('results').toJSON())
        return (
          <Container header={true} footer={false}>
            <Text>Result Video</Text>
            <Text>You said {matchVideo.myself}</Text>
            <Text>Other said {matchVideo.other}</Text>
            { true === matchVideo.positive ?
              (
                <Text>Congratulation! It's A Match!</Text>
              ) : (
                null
              )
            }
            <Button success onPress={goToHomeScene}>Back</Button>
          </Container>
        )
        break
      case 'terminated':
        return (
          <Container header={true} footer={false}>
            <Text>Terminated</Text>
            <Text>Sorry - Peer Left</Text>
            <Button success onPress={goToHomeScene}>Back</Button>
          </Container>
        )
        break
    }
  }

}