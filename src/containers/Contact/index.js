'use strict'

import React, { Component } from 'react'
import { Text } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'


import ScrollableTabView from 'react-native-scrollable-tab-view'

import Container from './../../components/Container'
import ProfileTab from './../../components/ProfileTab'
import ConversationTab from './../../components/ConversationTab'

import styles from './styles'

export default class extends React.Component {
  render() {
    let type = 'Relationship'
    return (
      <Container header={true} headerTitle={type}>
        <ScrollableTabView tabBarBackgroundColor='#f8f8f8' tabBarActiveTextColor='black' tabBarInactiveTextColor='black' tabBarUnderlineColor='black' tabBarTextStyle={styles.tabBarTextStyle}>
          <ProfileTab tabLabel='Profile' />
          <ConversationTab tabLabel='Conversation' />
        </ScrollableTabView>
      </Container>
    )
  }
}