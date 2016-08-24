import React from 'react'

import { Button } from 'native-base'
import { Form,InputField,PickerField } from 'react-native-form-generator'

export default class extends React.Component{

  componentDidMount() {
    this.refs.form.refs.nickname.setValue(this.props.user.profile.nickname)
    this.refs.form.refs.orientation.setValue(this.props.user.profile.orientation)
    this.refs.form.refs.friendship.setValue(this.props.user.profile.friendship)
  }

  _handleFormSubmit(){
    // let data = {}
    // this.props.handleUpdate(data)
  }

  render(){
    return (
        <Form ref='form'>

          <InputField ref='nickname' label='Nickname' placeholder='Nickname or Full Name'/>

          <PickerField ref='orientation'
            label='Relationships'
            options={{ O: 'Opposite Gender', S: 'Same Gender', A: 'Any Gender' }}
          />

          <PickerField ref='friendship'
            label='Friendships'
            options={{ S: 'Same Gender', O: 'Opposite Gender', A: 'Any Gender'}}
          />

          <InputField
            ref='headline'
            placeholder='Think of a fun headline!'
          />

          <InputField
            ref='bio'
            placeholder='What would you like for your profile bio?'
            multiline={true}
          />

          <Button info onPress={this._handleFormSubmit.bind(this)}>Save</Button>

        </Form>
    )
  }

}