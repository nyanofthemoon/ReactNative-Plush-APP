'use strict'

import React, { Component } from 'react';
import { View, Dimensions, Text, Vibration, Image } from 'react-native'
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

import slides from './../../helpers/images/tutorial'

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
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Huh?</Text>
                      <Text style={styles.slideText}>You are currently waiting in line for someone else to join in.</Text>
                      <Text style={styles.slideText}>Stay here or lose your spot!</Text>
                      <Text style={styles.slideTextDetail}>In the meantime, you can put your headphones on and swipe through our 10 Steps Tutorial.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 1</Text>
                      <Text style={styles.slideText}>Find Quiet Location</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 2</Text>
                      <Text style={styles.slideText}>Sit Comfortably</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 3</Text>
                      <Text style={styles.slideText}>Put On Headphones !</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 4</Text>
                      <Text style={styles.slideText}>Be Prepared</Text>
                      <Text style={styles.slideTextDetail}>Someone might join your Plush at any given time.</Text>
                      <Text style={styles.slideTextDetail}>Remember to always be kind and courteous to other members or you will be blocked and reported.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 5</Text>
                      <Text style={styles.slideText}>Voice Plush</Text>
                      <Text style={styles.slideText}>You have 1 minute.</Text>
                      <Text style={styles.slideTextDetail}>Shy? It's OK- this is a blind match! Get to know eachother for the first time by voice only.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 6</Text>
                      <Text style={styles.slideText}>Initial Thoughts</Text>
                      <Text style={styles.slideTextDetail}>Did you enjoy the Plush?</Text>
                      <Text style={styles.slideTextDetail}>Share your thoughts by selecting an emoticon. Left side represents negative feelings, the middle is neutral and the right side are positives.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 7</Text>
                      <Text style={styles.slideText}>Initial Outcome</Text>
                      <Text style={styles.slideTextDetail}>Did both parties enjoy the Plush?</Text>
                      <Text style={styles.slideTextDetail}>If so, congrats! You can continue. Otherwise, just try again!</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 8</Text>
                      <Text style={styles.slideText}>Video Plush</Text>
                      <Text style={styles.slideText}>You have 3 minutes.</Text>
                      <Text style={styles.slideTextDetail}>This is it! Get to see eachother for the first time.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 9</Text>
                      <Text style={styles.slideText}>Final Thoughts</Text>
                      <Text style={styles.slideTextDetail}>Did you enjoy the Plush?</Text>
                      <Text style={styles.slideTextDetail}>Share your thoughts by selecting an emoticon. Left side represents negative feelings, the middle is neutral and the right side are positives.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 10</Text>
                      <Text style={styles.slideText}>Final Outcome</Text>
                      <Text style={styles.slideTextDetail}>Did both of you enjoy the video plush?</Text>
                      <Text style={styles.slideTextDetail}>If so, congrats! You are added to your respective contact lists. Otherwise, just try again!</Text>
                    </View>
                  </Carousel>
                </View>
              ) : (
              <View></View>
              )
            }
            <RTCView key='rtc' data={{ mode: 'audio', kind: 'match', type: app.get('matchMode'), name: room.get('name'), stealth: app.get('matchIsStealth')}} localStream={app.get('localStream')} socket={app.get('socket')} config={Config.webrtc} />
          </Container>
        )
        break
      case 'selection_audio':
        this._vibrate()
        footer = <Timer key='selection_audio' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <Title style={styles.title}>How do you feel after this plush?</Title>
            <MatchVote key='audio' step='audio' type={app.get('matchMode')} handleVote={this._handleVote} />
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
            <RTCView key='rtc' data={{ mode: 'video', kind: 'rematch', type: app.get('matchMode'), name: room.get('name'), stealth: app.get('matchIsStealth') }} localStream={app.get('localStream')} socket={app.get('socket')} config={Config.webrtc} />
          </Container>
        )
        break
      case 'selection_video':
        this._vibrate()
        footer = <Timer key='selection_video' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <Title style={styles.title}>How do you feel after this plush?</Title>
            <MatchVote key='video' step='video' type={app.get('matchMode')} handleVote={this._handleVote} />
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
            <MatchResult step='video' type={app.get('matchMode')} results={room.get('results').toJSON()} scores={room.get('scores').toJSON()} id={app.get('currentSceneId')} />
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