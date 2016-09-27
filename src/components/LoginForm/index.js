import React from 'react'

import { View, Image, Alert } from 'react-native'
import { Button } from 'native-base'
import { Form,InputField } from 'react-native-form-generator'
var validator = require('validator')

import styles from './styles'

export default class extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data:{}
    }
  }

  handleFormChange(data){
    this.setState({data:data})
  }

  getData() {
    if (true === this._validateForm()) {
      return this.state.data
    }
    return false
  }

  _validateForm() {
    let messages = []
    if (!this.state.data.email || !validator.isEmail(this.state.data.email)) {
      messages.push('Email is required')
    }
    if (!this.state.data.password || validator.isEmpty(this.state.data.password)) {
      messages.push('Password is required')
    }
    if (messages.length != 0) {
      Alert.alert(
        'Log In Details',
        messages.join('\n')
      )
      return false
    }
    return true
  }

  render() {
    return (
      <Form ref='form' style={[styles.container, { marginTop: 10}]} onChange={this.handleFormChange.bind(this)}>
        <InputField ref='email' label='Email' placeholder='you@mail.com' maxLength={128} labelStyle={styles.label} valueStyle={styles.value} style={styles.value} containerStyle={styles.container} />
        <InputField ref='password' label='Password' placeholder='secret password' maxLength={32} labelStyle={styles.label} valueStyle={styles.value} style={styles.value} containerStyle={styles.container} />
      </Form>
    )
  }

}