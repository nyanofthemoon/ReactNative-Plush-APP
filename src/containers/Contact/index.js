'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import { goToContactsScene, goToTab } from './../../actions'

import Container from './../../components/Container'
import ProfileTab from './../../components/ProfileTab'
import ConversationTab from './../../components/ConversationTab'
import BlockReportFooter from './../../components/BlockReportFooter'
import SendMessageFooter from './../../components/SendMessageFooter'

import styles from './styles'
const tabStyle = StyleSheet.flatten(styles.tab)

@connect(
  state => ({
    app    : state.app,
    user   : state.user,
    contact: state.contact
  })
)

export default class extends React.Component {

  static propTypes = {
    app: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    goToTab(0)
  }

  _onChangeTab(e) {
    goToTab(e.i)
  }

  _getProfileType(id) {
    const {user} = this.props
    if (user.getIn(['contacts', 'relationship', id])) {
      return 'Relationship'
    } else if (user.getIn(['contacts', 'friendship', id])) {
      return 'Friendship'
    } else {
      return 'Unknown'
    }
  }

  render() {
    const {app, contact} = this.props
    let id      = app.get('currentSceneId')
    let profile = contact.getIn(['profiles', id])
    if (!profile) {
      profile = {}
    } else {
      profile = profile.toJSON()
    }
    let message = contact.getIn(['messages', id])
    if (!message) {
      message = []
    } else {
      message = message.toJSON()
    }
    let footer
    if (0 == app.get('currentSceneTab')) {
      footer = <BlockReportFooter id={app.get('currentSceneId')} redirect={goToContactsScene} />
    } else {
      footer = <SendMessageFooter id={app.get('currentSceneId')} />
    }
    return (
      <Container header={true} footer={footer} headerTitle={this._getProfileType(id)}>
        <ScrollableTabView onChangeTab={this._onChangeTab} tabBarBackgroundColor={tabStyle.backgroundColor} tabBarActiveTextColor='orange' tabBarInactiveTextColor={tabStyle.color} tabBarUnderlineColor='orange' tabBarTextStyle={{fontFamily:tabStyle.fontFamily}} style={styles.container}>
          <ProfileTab tabLabel='Profile' id={id} profile={profile} />
          <ConversationTab tabLabel='Conversation' id={id} profile={profile} conversation={message} />
        </ScrollableTabView>
      </Container>
    )
  }

}