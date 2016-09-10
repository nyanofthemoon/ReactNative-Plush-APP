'use strict'

import React from 'react'
import { ScrollView, View } from 'react-native'
import { Title, List, ListItem, Text } from 'native-base'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    id          : React.PropTypes.string.isRequired,
    profile     : React.PropTypes.object.isRequired,
    conversation: React.PropTypes.array.isRequired
  }

  _renderRow(message) {
    return
      <ListItem>
        <View style={styles.message}>
          <Text>{JSON.stringify(message)}</Text>
        </View>
      </ListItem>
  }

  render() {
    if (this.props.data && this.props.data.length > 0) {
      return (
        <ScrollView scrollEnabled={true}>
          <List dataArray={this.props.conversation} renderRow={this._renderRow.bind(this)}/>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView scrollEnabled={true} contentContainerStyle={{ flex:1, justifyContent:'center'}}>
          <Title style={styles.title}>Start Conversation!</Title>
        </ScrollView>
      )
    }
  }

}
