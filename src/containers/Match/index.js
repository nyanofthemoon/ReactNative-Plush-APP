'use strict'

import React, { Component } from 'react';
import { View, Dimensions, Text, Vibration, Image } from 'react-native'
import { Title, Button } from 'native-base'
import { connect } from 'react-redux'
import Carousel from 'react-native-looped-carousel'
import Drawer from 'react-native-drawer'
import { default as Sound } from 'react-native-sound'
var Spinner = require('react-native-spinkit')

import { updateMatch, goToHomeScene } from './../../actions'
import { getSocketId } from './../../helpers/socket'

import Container from './../../components/Container'
import RTCView from './../../components/RTCView'
import Timer from './../../components/Timer'
import MatchVote from './../../components/MatchVote'
import MatchVoteDrawer from './../../components/MatchVoteDrawer'
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

  closeVoteDrawer() {
    this._drawer.close()
  }

  openVoteDrawer() {
    this._drawer.open()
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
          <Container header={header} footer={footer} headerTitle={<Spinner size={45} type='ThreeBounce' style={{ alignSelf:'center'}} color='#FFFFFF'/>}>
            { 'audio' !== status ?
              (
                <View>
                  <Carousel delay={15000} style={this.state.size}>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Huh?</Text>
                      <Text style={styles.slideText}>Waiting For Next Plush</Text>
                      <Text style={styles.slideTextDetail}>In the meantime, you should put your headphones on! You could also swipe through this 10 Steps Tutorial...</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 1</Text>
                      <Text style={styles.slideText}>Find Quiet Location</Text>
                      <Text style={styles.slideTextDetail}>It's important to find the location where you feel most comfortable and where you can be yourself.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 2</Text>
                      <Text style={styles.slideText}>Sit Comfortably</Text>
                      <Text style={styles.slideTextDetail}>You're about to engage with another person for up to 5 minutes. You might want to find a comfortable "best angle" position kind of thing. ;)</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 3</Text>
                      <Text style={styles.slideText}>Put On Headphones !</Text>
                      <Text style={styles.slideTextDetail}>This is required in order to provide a quality conversation. Otherwise no one is going to have any fun during the Plush (and that sucks).</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 4</Text>
                      <Text style={styles.slideText}>Prepare Yourself</Text>
                      <Text style={styles.slideTextDetail}>Someone matching your profile might join at any given time.</Text>
                      <Text style={styles.slideTextDetail}>Always be courteous to other members. This is a self-managed community where you will be blocked and reported.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 5</Text>
                      <Text style={styles.slideText}>Voice Plush!</Text>
                      <Text style={styles.slideText}>You have 1 minute.</Text>
                      <Text style={styles.slideTextDetail}>Shy? It's OK- this is a blind match! Take it slow and get to know each other for the first time by sound only.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 6</Text>
                      <Text style={styles.slideText}>Initial Thoughts</Text>
                      <Text style={styles.slideTextDetail}>Did you enjoy your Plush?</Text>
                      <Text style={styles.slideTextDetail}>Share your thoughts by selecting an emoticon. Left side represents negative feelings, the middle is neutral and the right side are positives.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 7</Text>
                      <Text style={styles.slideText}>Initial Outcome</Text>
                      <Text style={styles.slideTextDetail}>Did both parties enjoy the Plush?</Text>
                      <Text style={styles.slideTextDetail}>If so, congrats! You can continue to the Video Plush! Otherwise, just try again with someone else.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 8</Text>
                      <Text style={styles.slideText}>Video Plush!</Text>
                      <Text style={styles.slideText}>You have 3 minutes.</Text>
                      <Text style={styles.slideTextDetail}>This is it! You both enjoyed the last Plush! Now it's time to see each other for the first time.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 9</Text>
                      <Text style={styles.slideText}>Final Thoughts</Text>
                      <Text style={styles.slideTextDetail}>Did you enjoy your Plush?</Text>
                      <Text style={styles.slideTextDetail}>Share your thoughts by selecting an emoticon. Left side represents negative feelings, the middle is neutral and the right side are positives.</Text>
                    </View>
                    <View style={styles.slideTextContainer}>
                      <Text style={styles.slideTextHeader}>Step 10</Text>
                      <Text style={styles.slideText}>Final Outcome</Text>
                      <Text style={styles.slideTextDetail}>Did both parties enjoy the Plush?</Text>
                      <Text style={styles.slideTextDetail}>If so, congrats! This is the final matching step and you are both added to your respective contact list. Otherwise, there's plenty of fish in the sea!</Text>
                    </View>
                  </Carousel>
                </View>
              ) : (
                <View></View>
              )
            }
            <Drawer
              type="overlay"
              negotiatePan={true}
              acceptPan={true}
              captureGestures={true}
              panThreshold={0.25}
              panOpenMask={0.25}
              panCloseMask={0.25}
              closedDrawerOffset={0}
              side="left"
              content={<MatchVoteDrawer key='audio' step='audio' type={app.get('matchMode')} handleVote={this._handleVote} />}
            >
              <RTCView key='rtc' data={{ mode: 'audio', kind: 'match', type: app.get('matchMode'), name: room.get('name'), stealth: app.get('matchIsStealth')}} localStream={app.get('localStream')} socket={app.get('socket')} config={Config.webrtc} />
            </Drawer>

          </Container>
        )
        break
      case 'selection_audio':
        this._vibrate()
        footer = <Timer key='selection_audio' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <Title style={styles.title}>How do you feel after this plush?</Title>
            <MatchVote key='audio' step='audio' type={app.get('matchMode')} votes={room.getIn(['results', 'audio'])} handleVote={this._handleVote} />
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
            <Drawer
              type="overlay"
              negotiatePan={true}
              acceptPan={true}
              captureGestures={true}
              panThreshold={0.25}
              panOpenMask={0.25}
              panCloseMask={0.25}
              closedDrawerOffset={0}
              side="left"
              content={<MatchVoteDrawer key='video' step='video' type={app.get('matchMode')} handleVote={this._handleVote} />}
            >
            <RTCView key='rtc' data={{ mode: 'video', kind: 'rematch', type: app.get('matchMode'), name: room.get('name'), stealth: app.get('matchIsStealth') }} localStream={app.get('localStream')} socket={app.get('socket')} config={Config.webrtc} />
            </Drawer>
          </Container>
        )
        break
      case 'selection_video':
        this._vibrate()
        footer = <Timer key='selection_video' milliseconds={room.get('timer')} />
        return (
          <Container header={true} footer={footer} headerTitle='Your Thoughts'>
            <Title style={styles.title}>How do you feel after this plush?</Title>
            <MatchVote key='video' step='video' type={app.get('matchMode')} votes={room.getIn(['results', 'video'])} handleVote={this._handleVote} />
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