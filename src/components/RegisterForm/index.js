import React from 'react'

import { View, Image, Alert, Text, DatePickerIOS } from 'react-native'
import { Button } from 'native-base'
import { Form,InputField,PickerField } from 'react-native-form-generator'
var validator = require('validator')

import styles from './styles'

export default class extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      birthday: '12/01/1920',
      data:{}
    }
  }

  handleFormChange(data){
    this.setState({data:data})
  }

  onDateChange = (date) => {
    this.setState({
      birthday: (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear()
    })
  }

  getData() {
    if (true === this._validateForm()) {
      this.state.data.birthday = this.state.birthday
      return this.state.data
    }
    return false
  }

  _validateForm() {
    let messages = []
    if (!this.state.data.email || !validator.isEmail(this.state.data.email)) {
      messages.push('Invalid email')
    }
    if (!this.state.data.password || !validator.isLength(this.state.data.password,{min:5})) {
      messages.push('Password length must be >= 5')
    }
    if (!this.state.data.first_name || !validator.isLength(this.state.data.first_name,{min:2})) {
      messages.push('First Name is required')
    }
    if (!this.state.data.last_name || !validator.isLength(this.state.data.last_name,{min:2})) {
      messages.push('Last Name is required')
    }
    if (!this.state.data.gender || validator.isEmpty(this.state.data.gender)) {
      messages.push('Gender is required')
    }
    if (!this.state.birthday || '12/01/1920' == this.state.birthday) {
      messages.push('Birthday is required')
    } else {
      let today     = new Date()
      var birth     = new Date(this.state.birthday)
      var age       = today.getFullYear() - birth.getFullYear()
      var age_month = today.getMonth() - birth.getMonth()
      var age_day   = today.getDate() - birth.getDate()
      if ((age == 17 && age_month <= 0 && age_day <= 0) || age < 17) {
        messages.push('Must be 17+ to sign up')
      }
    }
    if (messages.length != 0) {
      Alert.alert(
        'Sign Up Details',
        messages.join('\n')
      )
      return false
    }
    return true
  }

  render() {
    return (
      <Form ref='form' style={[styles.container, { marginTop: 10}]} onChange={this.handleFormChange.bind(this)}>
        <InputField ref='email' keyboardType='email-address' label='Email' placeholder='you@mail.com' maxLength={128} labelStyle={styles.label} valueStyle={styles.value} style={styles.value} containerStyle={styles.container} />
        <InputField ref='password' label='Password' placeholder='secret password' secureTextEntry={true} maxLength={32} labelStyle={styles.label} valueStyle={styles.value} style={styles.value} containerStyle={styles.container} />
        <InputField ref='first_name' label='First Name' maxLength={64} labelStyle={styles.label} valueStyle={styles.value} style={styles.value} containerStyle={styles.container} />
        <InputField ref='last_name' label='Last Name' maxLength={64} labelStyle={styles.label} valueStyle={styles.value} style={styles.value} containerStyle={styles.container} />
        <PickerField ref='gender' labelStyle={styles.label} valueStyle={[styles.value, styles.select]} containerStyle={styles.container} pickerWrapper={<View style={{backgroundColor:'#a3a3c2'}} />}
                     label='Gender' options={{ 'M':'Man', 'F': 'Woman'}}
        />
        <View style={{paddingLeft:10, paddingRight:10}}>
          <Text style={styles.label}>Birthday</Text>
          <View style={{backgroundColor:'#a3a3c2'}}>
          <DatePickerIOS
            mode="date"
            onDateChange={this.onDateChange}
            date={new Date(this.state.birthday)}
            maximumDate={new Date()}
            minimumDate={new Date('12/01/1920')}
          />
          </View>
        </View>
        <View style={styles.warningContainer}>
          <Text style={styles.warning}>Some of this information will be used to find matching profiles. Confirm the accuracy of the information as it cannot be modified after creating your account!</Text>
        </View>
      </Form>
    )
  }

}