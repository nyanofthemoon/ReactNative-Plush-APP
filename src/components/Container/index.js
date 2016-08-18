'use strict'

import React, { Component } from 'react'
import{ AppState, StatusBar, View, Image } from 'react-native'
import { Container, Header, Content, Footer, Title, Button, Icon } from 'native-base'

import { handleAppStateChange, handleAppMemoryWarning } from './../../actions'

import renderIf from './../../helpers/renderIf'
import image from './../../helpers/image'

import styles from './styles'

export default class extends Component {

  componentWillUnmount() {
    AppState.removeEventListener('change', handleAppStateChange)
    AppState.removeEventListener('memoryWarning', handleAppMemoryWarning)
  }

  componentDidMount() {
    AppState.addEventListener('change', handleAppStateChange)
    AppState.addEventListener('memoryWarning', handleAppMemoryWarning)
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar style={styles.statusBar}/>
        {renderIf(this.props.header)(
          <Header style={styles.header}>
            <Title>Extreme Meetups</Title>
          </Header>
        )}
        <Content>
          { !this.props.cover ?
            (
              <View>
                {this.props.children}
              </View>
            ) : (
              <Image source={image[this.props.cover]} style={styles.cover}>
                {this.props.children}
              </Image>
            )
          }
        </Content>
        {renderIf(this.props.footer)(
          <Footer style={styles.footer}>
            <Title>[ Bottom Advertisement ]</Title>
          </Footer>
        )}
      </Container>
    )
  }
}