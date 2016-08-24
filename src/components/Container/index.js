'use strict'

import React, { Component } from 'react'
import{ AppState, Dimensions, StatusBar, View, Image } from 'react-native'
import { Container, Header, Content, Footer, Title, Button, Icon } from 'native-base'

import { AdMobInterstitial } from 'react-native-admob'

import { loadUserData, handleAppStateChange, handleAppMemoryWarning, canShowAd } from './../../actions'

import renderIf from './../../helpers/renderIf'

import Config from './../../config'

import theme  from './themes/default'
import styles from './styles'
import images from './images'

let adInterval
let adClosed

export default class extends Component {

  componentWillMount() {
    loadUserData()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', handleAppStateChange)
    AppState.removeEventListener('memoryWarning', handleAppMemoryWarning)
  }

  componentDidMount() {
    AppState.addEventListener('change', handleAppStateChange)
    AppState.addEventListener('memoryWarning', handleAppMemoryWarning)
    if (!adInterval) {
      adClosed = true
      if (Config.ads.test) {
        AdMobInterstitial.setTestDeviceID('EMULATOR')
      }
      AdMobInterstitial.setAdUnitID(Config.ads.interstitial.id)
      AdMobInterstitial.addEventListener('interstitialDidLoad', () => {})
      AdMobInterstitial.addEventListener('interstitialDidClose', () => { adClosed = true; AdMobInterstitial.requestAd(() => {})})
      AdMobInterstitial.addEventListener('interstitialDidFailToLoad', () => {})
      AdMobInterstitial.addEventListener('interstitialDidOpen', () => {})
      AdMobInterstitial.addEventListener('interstitialWillLeaveApplication', () => {})
      AdMobInterstitial.requestAd(() => {})
      adInterval = setInterval(function () {
        if (true === adClosed && true === canShowAd()) {
          AdMobInterstitial.showAd(() => {})
        }
      }, Config.ads.interstitial.interval)
    }
  }

  _getCoverSource() {
    if ('splash' === this.props.cover.type) {
        let gender      = this.props.cover.data.gender      || 'F'
        let orientation = this.props.cover.data.orientation || 'A'
        let length = images[this.props.cover.type][(gender+orientation)][this.props.cover.data.subtype].length
        return images.splash[(gender+orientation)][this.props.cover.data.subtype][Math.floor(Math.random()*length)]
    } else {
      return images[this.props.cover]
    }
  }

  render() {
    return (
      <Container key='container' theme={theme} style={styles.container}>
        {renderIf(this.props.header)(
          <Header key='header' style={styles.header}>
            <Title>Extreme Meetups</Title>
          </Header>
        )}
        <Content key='content' scrollEnabled={this.props.scrollEnabled || false}>
          <StatusBar style={styles.statusBar}/>
          { !this.props.cover ?
            (
              <View>
                {this.props.children}
              </View>
            ) : (
              <Image source={this._getCoverSource()} style={[styles.cover, {width: Dimensions.get('window').width, height: Dimensions.get('window').height}]}>
                {this.props.children}
              </Image>
            )
          }
        </Content>
        {renderIf(this.props.footer)(
          <Footer key='footer' style={styles.footer}>
          </Footer>
        )}
      </Container>
    )
  }
}