'use strict'

import React, { Component } from 'react';
import { View, Dimensions, Text, Vibration } from 'react-native'
import { Title, Button } from 'native-base'
import { connect } from 'react-redux'
import Carousel from 'react-native-looped-carousel'
import { default as Sound } from 'react-native-sound'

import { updateMatch, goToHomeScene } from './../../actions'
import { getSocketId } from './../../helpers/socket'

import Container from './../../components/Container'
import RTCView from './../../components/RTCView'
import Timer from './../../components/Timer'
import MatchVote from './../../components/MatchVote'
import MatchResult from './../../components/MatchResult'
import LatestOutcome from './../../components/LatestOutcome'
import BlockReportFooter from './../../components/BlockReportFooter'

import Config from './../../config'

import styles from './styles'

const notificationSound = new Sound('notification.mp3', Sound.MAIN_BUNDLE)

@connect(
  state => ({
    app         : state.app,
    room        : state.room,
    notification: state.notification
  })
)

export default class extends React.Component {
  static propTypes = {
    app         : React.PropTypes.object.isRequired,
    room        : React.PropTypes.object.isRequired,
    notification: React.PropTypes.object.isRequired
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
    const {app, room, notification} = this.props

    // @TODO app.get('matchIsStealth')

    let status = room.get('status')
    let footer = null
    switch(status) {
      default:
      case 'waiting':
      case 'audio':
        let header = true
        footer = <LatestOutcome key={notification.getIn(['data', 'lastUpdated'])} data={notification.get('data')}/>
        if ('audio' === status) {
          header = false
          footer = <Timer key='audio' notify={true} milliseconds={room.get('timer')} />
          this._vibrate()
        }
        return (
          <Container header={header} footer={footer} headerTitle='Waiting Room'>
            { 'audio' !== status ?
              (
                <View>
                  <Carousel delay={10000} style={this.state.size}>
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
            <RTCView key='rtc' data={{ mode: 'audio', kind: 'match', type: app.get('matchMode'), name: room.get('name'), stealth: app.get('matchIsStealth'), flush: false }} socket={app.get('socket')} config={Config.webrtc} />
          </Container>
        )
        break
      case 'selection_audio':
        footer = <Timer key='selection_audio' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <Title style={styles.title}>How do you feel after this plush?</Title>
            <MatchVote step='audio' type={app.get('matchMode')} handleVote={this._handleVote} />
            <Timer key='selection_audio' milliseconds={room.get('timer')} />
          </Container>
        )
        break
      case 'results_audio':
        if (room.getIn(['scores', 'audio']) >= 1) {
          footer = <Timer key='results_audio' milliseconds={room.get('timer')} />
        } else {
          footer = <BlockReportFooter id={this.props.currentSceneId} />
        }
        return (
          <Container header={true} footer={footer} headerTitle='The Outcome'>
            <MatchResult step='audio' type={app.get('matchMode')} results={room.get('results').toJSON()} scores={room.get('scores').toJSON()} currentSceneId={app.get('currentSceneId')} />
          </Container>
        )
        break
      case 'video':
        footer = <Timer key='video' notify={true} milliseconds={room.get('timer')} />
        return (
          <Container header={false} footer={footer}>
            <RTCView key='rtc' data={{ mode: 'video', kind: 'rematch', type: app.get('matchMode'), name: room.get('name'), stealth: app.get('matchIsStealth'), flush: false }} socket={app.get('socket')} config={Config.webrtc} />
          </Container>
        )
        break
      case 'selection_video':
        footer = <Timer key='selection_video' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <Title style={styles.title}>How do you feel after this plush?</Title>
            <MatchVote step='video' type={app.get('matchMode')} handleVote={this._handleVote} />
          </Container>
        )
        break
      case 'results_video':
        if (room.getIn(['scores', 'video']) >= 2) {
          footer = null
        } else {
          footer = <BlockReportFooter id={this.props.currentSceneId} />
        }
        return (
          <Container header={true} footer={footer} headerTitle='The Outcome'>
            <MatchResult step='video' type={app.get('matchMode')} results={room.get('results').toJSON()} scores={room.get('scores').toJSON()} currentSceneId={app.get('currentSceneId')} />
          </Container>
        )
        break
      case 'terminated':
        return (
          <Container header={true} footer={<BlockReportFooter style={{ marginTop: 50 }} id={app.get('currentSceneId')} redirect={goToHomeScene} />} headerTitle='Escaped !'>
            <Title style={{ marginTop: 25 }}>Your Match Left Early...</Title>
            <Text style={{ color: 'white', padding: 25 }}>Sorry, it appears that your match had to leave in the middle of your conversation.</Text>
            <Text style={{ color: 'white', paddingLeft: 25, paddingRight: 25 }}>Please assume positive intent as a random life event might have happened to your match!</Text>
            <Text style={{ color: 'white', padding: 25 }}>If you feel you have been OFFENDED or ANNOYED by this member in any way, you can choose to BLOCK them and prevent any future communication.</Text>
            <Text style={{ color: 'white', paddingLeft: 25, paddingRight: 25 }}>If you feel you have been ABUSED or BULLIED by this member in any way, you can choose to REPORT them to the community and prevent any future communication.</Text>
          </Container>
        )
        break
    }
  }

}