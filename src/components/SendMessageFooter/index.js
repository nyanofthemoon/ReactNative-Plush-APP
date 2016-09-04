'use strict'

import React from 'react'
import { View } from 'react-native'
import { Button } from 'native-base'
import { Form, InputField } from 'react-native-form-generator'

import { messageUser } from './../../actions'

import styles from './styles'

export default class extends React.Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      data:{}
    }
  }

  handleFormChange(data){
    this.setState({data:data})
  }

  _sendMessage() {
    if (this.state.data.message.length >= 2) {
      messageUser(this.props.id, this.state.data.message)
      this.refs.form.refs.message.setValue('')
    }
  }

  render() {
      return (
        <Form ref='form' style={styles.container} onChange={this.handleFormChange.bind(this)}>
          <InputField ref='message' placeholder='Type your message here' style={styles.value} containerStyle={styles.value} />
          <Button info style={styles.reportButton} onPress={this._sendMessage.bind(this)}>Send</Button>
        </Form>
      )
  }
}