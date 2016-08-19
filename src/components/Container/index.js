'use strict'

import React, { Component } from 'react'
import{ AppState, Dimensions, StatusBar, View, Image, NativeMethodsMixin } from 'react-native'
import { Container, Header, Content, Footer, Title, Button, Icon } from 'native-base'

import { AdMobBanner } from 'react-native-admob'

import { handleAppStateChange, handleAppMemoryWarning } from './../../actions'

import renderIf from './../../helpers/renderIf'

import Config from './../../config'

import styles from './styles'
import images from './images'

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = {
      width : Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', handleAppStateChange)
    AppState.removeEventListener('memoryWarning', handleAppMemoryWarning)
  }

  componentDidMount() {
    AppState.addEventListener('change', handleAppStateChange)
    AppState.addEventListener('memoryWarning', handleAppMemoryWarning)
  }

  _contentSizeDidChange(width, height) {
    this.setState({
      width : width,
      height: height
    })
  }

  render() {
    return (
      <Container key='container' style={styles.container}>
        {renderIf(this.props.header)(
          <Header key='header' style={styles.header}>
            <Title>Extreme Meetups</Title>
          </Header>
        )}
        <Content key='content' onContentSizeChange={this._contentSizeDidChange.bind(this)} scrollEnabled={this.props.scrollEnabled || false}>
          <StatusBar style={styles.statusBar}/>
          { !this.props.cover ?
            (
              <View>
                {this.props.children}
              </View>
            ) : (
              <Image source={images[this.props.cover]} style={[styles.cover, {width: this.state.width, height: this.state.height}]}>
                {this.props.children}
              </Image>
            )
          }
        </Content>
        {renderIf(this.props.footer)(
          <Footer key='footer' style={styles.footer}>
            { !Config.ads.test ?
              (
                <AdMobBanner key='ads-footer' bannerSize={Config.ads.footer.size} adUnitID={Config.ads.footer.id}/>
              ) : (
                <AdMobBanner key='ads-footer' bannerSize={Config.ads.footer.size} adUnitID={Config.ads.footer.id} testDeviceID={'EMULATOR'}/>
              )
            }
          </Footer>
        )}
      </Container>
    )
  }
}