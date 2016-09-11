'use strict'

import React from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { Title, List, ListItem, Text } from 'native-base'

import InvertibleScrollView from 'react-native-invertible-scroll-view'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    id          : React.PropTypes.string.isRequired,
    profile     : React.PropTypes.object.isRequired,
    conversation: React.PropTypes.array.isRequired
  }

  _renderRow(message) {
    if (message.id) {
      return (
        <ListItem style={styles.listItem}>
          <View style={styles.contactMessageContainer}>
            <Text style={styles.contactMessage}>{message.text}</Text>
          </View>
        </ListItem>
      )
    } else {
      return (
      <ListItem style={styles.listItem}>
        <View style={styles.selfMessageContainer}>
          <Text style={styles.selfMessage}>{message.text}</Text>
        </View>
      </ListItem>
      )
    }
  }

  render() {
    if (this.props.conversation && this.props.conversation.length > 0) {
      return (
        <List style={{ marginBottom: 55, marginLeft: -5, marginRight: 10 }}
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          dataArray={this.props.conversation} renderRow={this._renderRow.bind(this)}
        />
      )
    } else {
      return (
        <View style={{ flex:1, justifyContent:'center'}}>
          <Title style={styles.title}>Start Conversation!</Title>
        </View>
      )
    }
  }

}
