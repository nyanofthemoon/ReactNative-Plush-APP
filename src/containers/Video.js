'use strict'

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-looped-carousel'

import { goToHomeScene, updateMatch } from './../actions'
import { getSocketId } from './../helpers/socket'

import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Button from './../components/Button'
import RTCView from './../components/RTCView'
import Timer from './../components/Timer'
import MatchVote from './../components/MatchVote'

import Config from './../config'

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

  render() {
    const {app, room} = this.props
    let status = room.get('status')
    switch(status) {
      default:
      case 'waiting':
      case 'audio':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            { 'audio' !== status ?
              (
                <ViewContainer>
                  <Button text={'Home Button'} onPress={goToHomeScene}/>
                  <TextContainer>Waiting In Queue</TextContainer>
                  <Carousel delay={15000} style={this.state.size}>
                    <View style={[{backgroundColor:'#BADA55'}, this.state.size]}>
                      <TextContainer>Slide 1</TextContainer>
                    </View>
                    <View style={[{backgroundColor:'red'}, this.state.size]}>
                      <TextContainer>Slide 2</TextContainer>
                    </View>
                    <View style={[{backgroundColor:'blue'}, this.state.size]}>
                      <TextContainer>Slide 3</TextContainer>
                    </View>
                  </Carousel>
                </ViewContainer>
              ) : (
              <ViewContainer>
                <TextContainer>Audio Only</TextContainer>
                <Timer key='audio' milliseconds={room.get('timer')} />
              </ViewContainer>
            )
            }
            <RTCView key='rtc_audio' data={{ mode: 'audio', kind: 'match', type: 'relationship', name: room.get('name'), flush: true }} socket={app.get('socket')} config={Config.webrtc} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'selection_audio':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Selection Audio</TextContainer>
            <MatchVote step='audio' handlePositiveVote={this._handlePositiveAudioVote} handleNegativeVote={this._handleNegativeAudioVote} />
            <Timer key='selection_audio' milliseconds={room.get('timer')} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'results_audio':
        let matchAudio = this._evaluateMatchResults('audio', room.get('results').toJSON())
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Result Audio</TextContainer>
            <TextContainer>{JSON.stringify(matchAudio)}</TextContainer>
            <TextContainer>You said {matchAudio.myself}</TextContainer>
            <TextContainer>Other said {matchAudio.other}</TextContainer>
            { true === matchAudio.positive ?
              (
                <Timer key='results_audio' milliseconds={room.get('timer')} />
              ) : (
                <Button text={'Home Button'} onPress={goToHomeScene} />
              )
            }
            <Footer />
          </ViewContainer>
        )
        break
      case 'video':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <RTCView key='rtc_video' data={{ mode: 'video', kind: 'match', type: 'relationship', name: room.get('name'), flush: false }} socket={app.get('socket')} config={Config.webrtc} />
            <Timer key='video' milliseconds={room.get('timer')} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'selection_video':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Selection Video</TextContainer>
            <MatchVote step='video' handlePositiveVote={this._handlePositiveVideoVote} handleNegativeVote={this._handleNegativeVideoVote} />
            <Timer key='selection_video' milliseconds={room.get('timer')} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'results_video':
        let matchVideo = this._evaluateMatchResults('video', room.get('results').toJSON())
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Result Video</TextContainer>
            <TextContainer>You said {matchVideo.myself}</TextContainer>
            <TextContainer>Other said {matchVideo.other}</TextContainer>
            { true === matchVideo.positive ?
              (
                <TextContainer>Congratulation! It's A Match!</TextContainer>
              ) : (
                null
              )
            }
            <Button text={'Home Button'} onPress={goToHomeScene} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'terminated':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Terminated</TextContainer>
            <TextContainer>Sorry - Peer Left</TextContainer>
            <Button text={'Home Button'} onPress={goToHomeScene} />
            <Footer />
          </ViewContainer>
        )
        break
    }
  }

}