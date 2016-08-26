'use strict'

import React, { Component } from 'react'
import { Text } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'

import { goToHomeScene } from './../../actions'

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
        <Tabs>
          <FriendTab tabLabel='Friends' />
          <DateTab tabLabel='Dates' />
        </Tabs>


        <Button success onPress={goToHomeScene}>Back</Button>
      </Container>
    )
  }
}