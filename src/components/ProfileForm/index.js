import React from 'react';


// <Text>{JSON.stringify(this.state.formData)}</Text>

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,ScrollView,TouchableHighlight, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField,DatePickerField,TimePickerField
} from 'react-native-form-generator';

class CustomModal extends React.Component{
  handleClose(){
    this.props.onHidePicker && this.props.onHidePicker();
  }
  render(){
    return <Modal transparent={true}>
      <View style={{padding:20, flex:1, justifyContent:'center', backgroundColor:'rgba(43, 48, 62, 0.57)'}}>
        <View
          style={{
        backgroundColor:'white',
        borderRadius: 8,
        flexDirection:'column',

    }}
        >
          <Text style={{
        textAlign: 'center',
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        fontSize:18
      }}>A Custom Wrapper for your picker</Text>
          {this.props.children}

          <TouchableHighlight
            onPress={this.handleClose.bind(this)}
            underlayColor='#78ac05'>
            <View style={{
        flex:1, alignItems:'center'
      }}><Text style={{fontSize:19,padding:15,}}>Close</Text></View></TouchableHighlight>
        </View>
      </View>
    </Modal>
  }
}

class WrappedIcon extends React.Component {
  render() {
    return (
      <Icon {...this.props} />
    );
  }
}

export default class extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      formData:{
      }
    }
  }

  componentDidMount() {
    this.refs.registrationForm.refs.nickname.setValue(this.props.user.profile.nickname)
    this.refs.registrationForm.refs.gender.setValue(this.props.user.profile.gender)
    this.refs.registrationForm.refs.orientation.setValue(this.props.user.profile.orientation)
    this.refs.registrationForm.refs.friendship.setValue(this.props.user.profile.friendship)
    this.refs.registrationForm.refs.birthday.setDate(new Date(this.props.user.profile.birthday))
  }

  handleFormChange(formData){
    /*
     formData will contain all the values of the form,
     in this example.
     formData = {
     first_name:"",
     last_name:"",
     gender: '',
     birthday: Date,
     has_accepted_conditions: bool
     }
     */

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    //console.log(e, component);
  }
  openTermsAndConditionsURL(){
    alert('OPEN URL')

  }


  render(){
    return (<ScrollView keyboardShouldPersistTaps={true} style={{paddingLeft:10,paddingRight:10}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />

        <InputField ref='nickname' label='Nickname' placeholder='Nickname or Full Name'/>
        <DatePickerField ref='birthday'
                         minimumDate={new Date('1/1/1900')}
                         maximumDate={new Date()}
                         placeholder='Birthday'/>
        <PickerField ref='gender'
                     label='Gender'
                     options={{
            F: 'Woman',
            M: 'Man'
          }}/>

        <PickerField ref='orientation'
                     label='Orientation'
                     options={{
            O: 'Opposite Gender',
            S: 'Same Gender',
            A: 'All Genders'
          }}/>

        <PickerField ref='friendship'
                     label='Friendships'
                     options={{
            S: 'Same Gender',
            O: 'Opposite Gender',
            A: 'Any Genders'
          }}/>

        <InputField
          multiline={true}
          ref='other_input'
          placeholder='A little about you'
          helpText='this is an helpful text it can be also very very long and it will wrap' />
        <SwitchField label='I accept Terms & Conditions'
                     ref="has_accepted_conditions"
                     helpText='Please read carefully the terms & conditions'/>


      </Form>

    </ScrollView>);
  }

}