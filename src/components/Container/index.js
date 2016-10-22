'use strict'

import React, { Component } from 'react'
import { AppState, Dimensions, StatusBar, View, Image, Text, TouchableHighlight } from 'react-native'
import { Container, Header, Content, Footer, Title, Button, Icon, Badge } from 'native-base'

import { AdMobInterstitial } from 'react-native-admob'

import { loadUserData, handleAppStateChange, handleAppMemoryWarning, canShowAd, goToContactsScene, goToHomeScene, goToProfileScene, goToLogoutScene, calculateUnreadMessages } from './../../actions'

import renderIf from './../../helpers/renderIf'

import Config from './../../config'

import theme  from './themes/default'
import styles from './styles'
import images from './../../helpers/images/covers'

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
        let gender      = this.props.cover.data.gender      || 'U'
        let orientation = this.props.cover.data.orientation || 'U'
        let length = images[this.props.cover.type][(gender+orientation)][this.props.cover.data.subtype].length
        return images.splash[(gender+orientation)][this.props.cover.data.subtype][Math.floor(Math.random()*length)]
    } else {
      return images[this.props.cover] || this.props.cover
    }
  }

  // icons : http://ionicframework.com/docs/v2/ionicons/
  render() {
    let count = ''
    if (this.props.header) {
      count = this.props.unread || calculateUnreadMessages()
      if (count < 1) {
        count = <Text></Text>
      } else {
        count = <View style={{backgroundColor: 'red', position: 'absolute', top: -10, right: -10, width: 24, height: 24, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5}}><Text style={{fontSize: 10, color: 'white', fontWeight: '900', lineHeight: 10}}>{count}</Text></View>
      }
    }
    return (
      <Container key='container' theme={theme} style={styles.container}>
        {renderIf(this.props.header)(
          <Header key='header' style={styles.header}>
              <Button onPress={goToHomeScene}>
                <Icon white name='md-cube' style={('home' === this.props.scene ? ( styles.selected ) : ( null ))} />
              </Button>
              <Button onPress={goToContactsScene}>
                <View>
                  <Icon name='md-chatboxes' style={('contacts' === this.props.scene ? ( styles.selected ) : ( null ))} />
                  {count}
                </View>
              </Button>
              <Title style={styles.title}>{this.props.headerTitle || 'Plush!'} </Title>
              <Button onPress={goToProfileScene}>
                <Icon name='md-settings' style={('profile' === this.props.scene ? ( styles.selected ) : ( null ))} />
              </Button>
          </Header>
        )}
        <Content key='content' scrollEnabled={this.props.scrollEnabled || false}>
          <StatusBar style={styles.statusBar}/>
          { !this.props.cover ?
            (
              <View style={styles.content}>
                {this.props.children}
              </View>
            ) : (
              <Image source={this._getCoverSource()} style={[styles.cover, {width: Dimensions.get('window').width, height: Dimensions.get('window').height}]}>
                {this.props.children}
              </Image>
            )
          }
        </Content>
        { this.props.footer ?
          (
            <Footer key='footer' style={styles.footer}>
              {this.props.footer}
            </Footer>
          ) : (
            null
          )
        }
      </Container>
    )
  }
}