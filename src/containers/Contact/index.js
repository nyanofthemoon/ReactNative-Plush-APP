'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native'
import { Header, InputGroup, Icon, Button, Input, Tabs, Title } from 'native-base'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import { goToContactsScene } from './../../actions'

import Container from './../../components/Container'
import ProfileTab from './../../components/ProfileTab'
import ConversationTab from './../../components/ConversationTab'
import BlockReportFooter from './../../components/BlockReportFooter'

import styles from './styles'
const tabStyle = StyleSheet.flatten(styles.tab)

@connect(
  state => ({
    app: state.app,
    user: state.user,
    contact: state.contact
  })
)

export default class extends React.Component {

  static propTypes = {
    app: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired
  }

  _getProfileId() {
    const {app} = this.props
    return app.get('currentSceneId')
  }

  _getProfileType() {
    const {user} = this.props
    let id = this._getProfileId()
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
    let id      = this._getProfileId()
    let profile = contact.getIn(['profiles', id]).toJSON()
    let message = contact.getIn(['messages', id])
    return (
      <Container header={true} footer={<BlockReportFooter id={app.get('currentSceneId')} redirect={goToContactsScene} />}  headerTitle={this._getProfileType()}>
        <ScrollableTabView tabBarBackgroundColor={tabStyle.backgroundColor} tabBarActiveTextColor='orange' tabBarInactiveTextColor={tabStyle.color} tabBarUnderlineColor='orange' tabBarTextStyle={{fontFamily:tabStyle.fontFamily}}>
          <ProfileTab tabLabel='Profile' profile={profile} />
          <ConversationTab tabLabel='Conversation' data={message} profile={profile} />
        </ScrollableTabView>
      </Container>
    )
  }
}