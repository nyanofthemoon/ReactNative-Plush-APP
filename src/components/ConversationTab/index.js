'use strict'

import React from 'react'
import { ScrollView, View } from 'react-native'
import { Title, List, ListItem, Text } from 'native-base'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    //profile: React.PropTypes.object.isRequired,
    //data   : React.PropTypes.array.isRequired
  }

  _renderRow(data) {
    return
      <ListItem>
        <View style={styles.row}>
          <Text>AAA</Text>
        </View>
      </ListItem>
  }

  render() {
    if (this.props.data && this.props.data.length > 0) {
      return
        <ScrollView ref='scrollView' onContentSizeChange={(newSize)=>{ this.refs.scrollView.scrollTo(newSize) }}>
          <List dataArray={this.props.data} renderRow={this._renderRow.bind(this)}/>
        </ScrollView>
    } else {
        return
          <View style={styles.emptyContainer}>
            <Title style={styles.title}>Start Conversation!</Title>
          </View>
    }
  }
}
/*
 <ScrollView ref='scrollView' onContentSizeChange={(newSize)=>{ this.refs.scrollView.scrollTo(newSize) }}>
 <List dataArray={this.props.data} renderRow={this._renderRow.bind(this)}/>
 </ScrollView>
 */