'use strict'

import React from 'react'
import { View } from 'react-native'
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
    contact: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    list: React.PropTypes.object.isRequired
  }

  _onPress(id) {
    goToContact(id)
  }

  _renderRow(id) {
    const {contact} = this.props
    let profile = contact.getIn(['profiles', id]).toJSON()
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
    //const {contact} = this.props
    if (Object.keys(this.props.list).length > 0) {
      return <List dataArray={this.props.list} renderRow={this._renderRow.bind(this)}/>
    } else {
      if (this.props.type === 'relationship') {
        return <View style={styles.emptyContainer}>
          <Title style={styles.title}>It's time to meet people.</Title>
          <Button large info style={styles.ready} onPress={goToMatchRelationshipScene}>I'm Ready</Button>
        </View>
      } else {
        return <View style={styles.emptyContainer}>
          <Title style={styles.title}>It's time to make friends.</Title>
          <Button large success style={styles.ready} onPress={goToMatchFriendshipScene}>Let's Go!</Button>
        </View>
      }
    }
  }
}