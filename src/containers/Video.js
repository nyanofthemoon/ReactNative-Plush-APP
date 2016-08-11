'use strict'

import React, { Component } from 'react';
import { Dimensions } from 'react-native'

import { connect } from 'react-redux'

import { goToHomeScene } from './../actions'

import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Button from './../components/Button'
import RTCView from './../components/RTCView'
import Timer from './../components/Timer'

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
  };

  _peerJoinedAudio() {
    //this.setState({
    //  status: 'audio'
    //})
  }

  _peerJoinedVideo() {
    //this.setState({
    //  status: 'video'
    //})
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
                  <TextContainer>[ Interstitial Ad ]</TextContainer>
                </ViewContainer>
              ) : (
                <ViewContainer>
                  <TextContainer>Audio Only</TextContainer>
                  <Timer key='audio' milliseconds={room.get('timer')} />
                </ViewContainer>
              )
            }
            <RTCView key='rtc_audio' data={{ type: 'audio', kind: 'match' }} socket={app.get('socket')} config={Config.webrtc} peerJoined={this._peerJoinedAudio} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'selection_audio':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Selection Audio</TextContainer>
            <Timer key='selection_audio' milliseconds={room.get('timer')} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'results_audio':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Result Audio</TextContainer>
            <Timer key='results_audio' milliseconds={room.get('timer')} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'video':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <RTCView key='rtc_video' data={{ type: 'video', kind: 'match', name: room.get('name') }} socket={app.get('socket')} config={Config.webrtc} peerJoined={this._peerJoinedVideo} />
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
            <Timer key='selection_video' milliseconds={room.get('timer')} />
            <Footer />
          </ViewContainer>
        )
        break
      case 'results_video':
        return (
          <ViewContainer>
            <Header showLogo={false} />
            <TextContainer>Result Video</TextContainer>
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