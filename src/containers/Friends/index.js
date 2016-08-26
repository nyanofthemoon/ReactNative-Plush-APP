'use strict'

import React, { Component } from 'react'
import { Text } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'


import ScrollableTabView from 'react-native-scrollable-tab-view'

import Container from './../../components/Container'
import FriendTab from './../../components/FriendTab'
import DateTab from './../../components/DateTab'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <Container header={true} footer={false}>
        <Header searchBar rounded style={styles.searchBar}>
          <InputGroup>
            <Icon name='ios-search' />
            <Input placeholder='Search' style={styles.searchInput} />
            <Icon name='ios-people' />
          </InputGroup>
          <Button transparent>
            Search
          </Button>
        </Header>
        <ScrollableTabView tabBarBackgroundColor='#f8f8f8' tabBarActiveTextColor='black' tabBarInactiveTextColor='black' tabBarUnderlineColor='black' tabBarTextStyle={styles.tabBarTextStyle}>
          <FriendTab tabLabel='Friendships' />
          <DateTab tabLabel='Relationships' />
        </ScrollableTabView>
      </Container>
    )
  }
}