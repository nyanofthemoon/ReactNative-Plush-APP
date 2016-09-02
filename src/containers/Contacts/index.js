'use strict'

import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'
import { connect } from 'react-redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Container from './../../components/Container'
import ContactTab from './../../components/ContactTab'

import styles from './styles'
const tabStyle = StyleSheet.flatten(styles.tab)

@connect(
  state => ({
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
  }

  render() {
    const {user} = this.props
    return (
      <Container header={true} scene='contacts' headerTitle='Contact List'>
        <ScrollableTabView tabBarBackgroundColor={tabStyle.backgroundColor} tabBarActiveTextColor='orange' tabBarInactiveTextColor={tabStyle.color} tabBarUnderlineColor='orange' tabBarTextStyle={{fontFamily:tabStyle.fontFamily}}>
          <ContactTab tabLabel='Friendship' type='friendship' list={user.getIn(['contacts','friendship']).toJSON()} />
          <ContactTab tabLabel='Relationship' type='relationship' list={user.getIn(['contacts','relationship']).toJSON()} />
        </ScrollableTabView>
      </Container>
    )
  }
}