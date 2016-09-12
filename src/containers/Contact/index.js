'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer';

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

  constructor(props){
    super(props);
    this.state = {
      initialTab: 1
    }
  }

  componentWillMount() {
    const {app} = this.props
    if ('match' === app.get('previousScene')) {
      this.setState({
        initialTab: 0
      })
    }
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
      return 'New Contact'
    }
  }

  render() {
    const {app, user, contact} = this.props
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
    let currentSceneTab = app.get('currentSceneTab')
    if (0 == currentSceneTab) {
      footer = <BlockReportFooter id={id} redirect={goToContactsScene} />
    } else {
      footer = <SendMessageFooter id={id} />
    }
    return (
      <View style={{flex: 1}}>
        <Container header={true} footer={footer} headerTitle={this._getProfileType(id)}>
          <ScrollableTabView initialPage={this.state.initialTab} onChangeTab={this._onChangeTab} tabBarBackgroundColor={tabStyle.backgroundColor} tabBarActiveTextColor='orange' tabBarInactiveTextColor={tabStyle.color} tabBarUnderlineColor='orange' tabBarTextStyle={{fontFamily:tabStyle.fontFamily, fontSize:tabStyle.fontSize, lineHeight:tabStyle.lineHeight}} style={styles.container}>
            <ProfileTab tabLabel='Profile' id={id} profile={profile} />
            <ConversationTab tabLabel='Conversation' id={id} user={user.toJSON()} profile={profile} conversation={message} />
          </ScrollableTabView>
        </Container>
        <KeyboardSpacer/>
      </View>
    )
  }

}