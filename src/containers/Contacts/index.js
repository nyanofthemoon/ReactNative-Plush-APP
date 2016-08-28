'use strict'

import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Container from './../../components/Container'
import FriendTab from './../../components/FriendTab'
import DateTab from './../../components/DateTab'

import styles from './styles'
const tabStyle = StyleSheet.flatten(styles.tab)

export default class extends React.Component {
  render() {
    return (
      <Container header={true} headerTitle='Contacts'>
        <ScrollableTabView tabBarBackgroundColor={tabStyle.backgroundColor} tabBarActiveTextColor={tabStyle.color} tabBarInactiveTextColor={tabStyle.color} tabBarUnderlineColor={tabStyle.color} tabBarTextStyle={tabStyle.container}>
          <FriendTab tabLabel='Friendships' />
          <DateTab tabLabel='Relationships' />
        </ScrollableTabView>
      </Container>
    )
  }
}