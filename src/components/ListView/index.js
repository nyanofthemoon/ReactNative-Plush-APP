'use strict'

import React from 'react'
import { Text, View, ListView } from 'react-native'
import { ListItem } from 'native-base'

import styles from './styles'

export default class extends React.Component {
  constructor(props) {
    super(props)
    let dataSource  = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    let initialData = this.props.data      || []
    let renderRow   = this.props.renderRow || this._renderRow
    this.state = {
      dataSource: dataSource.cloneWithRows(initialData),
      renderRow : renderRow
    }
  }

  _renderRow(row) {
    return (
      <ListItem>
        <Text style={styles.row}>{JSON.stringify(row)}</Text>
      </ListItem>
    )
  }

  render() {
    return (
      <ListView style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(row) => { return this.state.renderRow(row) } }
      ></ListView>
    )
  }
}