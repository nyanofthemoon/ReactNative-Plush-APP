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
      <Container header={true} scene='contacts' headerTitle='Contact List'>
        <ScrollableTabView tabBarBackgroundColor={tabStyle.backgroundColor} tabBarActiveTextColor='orange' tabBarInactiveTextColor={tabStyle.color} tabBarUnderlineColor='orange' tabBarTextStyle={{fontFamily:tabStyle.fontFamily}}>
          <FriendTab tabLabel='Friendship' />
          <DateTab tabLabel='Relationship' />
        </ScrollableTabView>
      </Container>
    )
  }
}