'use strict'

import React from 'react'
import { Dimensions, ScrollView, View, Image } from 'react-native'
import { Title, List, ListItem, Text } from 'native-base'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import InvertibleScrollView from 'react-native-invertible-scroll-view'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    id          : React.PropTypes.string.isRequired,
    profile     : React.PropTypes.object.isRequired,
    user        : React.PropTypes.object.isRequired,
    conversation: React.PropTypes.array.isRequired
  }

  _renderRow(message) {
    if (message.id) {
      return (
        <ListItem style={styles.listItem}>
          <View style={styles.listItemContainer}>
            <Col sm={10} style={styles.contactMessageContainer}>
              <Text style={styles.contactMessage}>{message.text}</Text>
            </Col>
            <Col sm={2} style={styles.contactPictureContainer}>
              <Image style={styles.contactPicture} source={{uri:this.props.profile.profile.picture}}/>
            </Col>
          </View>
        </ListItem>
      )
    } else {
      return (
      <ListItem style={styles.listItem}>
        <View style={styles.listItemContainer}>
          <Col sm={2} style={styles.selfPictureContainer}>
            <Image style={styles.selfPicture} source={{uri:this.props.user.profile.picture}}/>
          </Col>
          <Col sm={10} style={styles.selfMessageContainer}>
            <Text style={styles.selfMessage}>{message.text}</Text>
          </Col>
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
