'use strict'

import React from 'react'
import { ScrollView, View } from 'react-native'
import { Title, Button, List, ListItem, Text, Thumbnail, Badge } from 'native-base'
import { connect } from 'react-redux'

import { goToContact, goToMatchFriendshipScene, goToMatchRelationshipScene } from './../../actions'

import renderIf from './../../helpers/renderIf'
import { genderIcon } from './../../helpers/icons'

import styles from './styles'

@connect(
  state => ({
    contact: state.contact
  })
)

export default class extends React.Component {

  static propTypes = {
    profile: React.PropTypes.object.isRequired,
    data   : React.PropTypes.object.isRequired
  }

  _renderRow(id) {
    if (profile) {
      let lastRead   = contact.getIn(['messages', id, 'last'])
      let badgeCount = 0
      let badgeStyle = styles.hidden
      if (lastRead && lastRead < new Date().getTime()) {
        badgeStyle = styles.badge
      }
      return (
        <ListItem key={id} button onPress={this._onPress.bind(this, id)} style={styles.container}>
          <View style={styles.row}>
            <Thumbnail size={40} style={styles.thumbnail} source={{uri:profile.profile.picture}}/>
            {genderIcon(profile.profile.gender, styles.gender)}
            <Text style={styles.text}>{profile.profile.nickname}</Text>
          </View>
          <Badge style={badgeStyle}>{badgeCount}</Badge>
        </ListItem>
      )
    } else {
      return <ListItem/>
    }
  }

  render() {
    if (this.props.data) {
      return
      <ScrollView scrollEnabled={true}>
        <List dataArray={this.props.data} renderRow={this._renderRow.bind(this)}/>
      </ScrollView>
    } else {
        return <View style={styles.emptyContainer}>
          <Title style={styles.title}>Start Conversation!</Title>
        </View>
    }
  }
}