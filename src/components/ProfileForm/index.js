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
    this.refs.registrationForm.refs.first_name.setValue(this.props.user.firstName)
    this.refs.registrationForm.refs.last_name.setValue(this.props.user.lastName)
    this.refs.registrationForm.refs.gender.setValue(this.props.user.gender)
    this.refs.registrationForm.refs.birthday.setDate(new Date(this.props.user.birthday))
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

  }
  resetForm(){

    this.refs.registrationForm.refs.first_name.setValue("");
    this.refs.registrationForm.refs.last_name.setValue("");
    this.refs.registrationForm.refs.other_input.setValue("");
    this.refs.registrationForm.refs.meeting.setDate(new Date());
    this.refs.registrationForm.refs.has_accepted_conditions.setValue(false);
  }

  render(){
    return (<ScrollView keyboardShouldPersistTaps={true} style={{paddingLeft:10,paddingRight:10}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField
          ref='first_name'
          label='First Name'
          placeholder='First Name'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.first_name.valid){
                return self.refs.registrationForm.refs.first_name.validationErrors.join("\n");
              }

            }
            // if(!!(self.refs && self.refs.first_name.valid)){
            // }
          })(this)}
          validationFunction={[(value)=>{
            /*
            you can have multiple validators in a single function or an array of functions
             */

            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            // Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name can't contain numbers";
            }

            return true;
          }, (value)=>{
            ///Initial state is null/undefined
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I can't stand number 4";
            }
            return true;
          }]}
        />
        <InputField ref='last_name' label='Last Name' placeholder='Last Name'/>
        <PickerField ref='gender'
                     label='Gender'
                     options={{
            "": '',
            M: 'Male',
            F: 'Female'
          }}/>
        <DatePickerField ref='birthday'
                         minimumDate={new Date('1/1/1900')}
                         maximumDate={new Date()}
                         placeholder='Birthday'/>
        <DatePickerField ref='meeting'
                         minimumDate={new Date('1/1/1900')}
                         maximumDate={new Date()} mode="datetime" placeholder='Meeting'/>
        <InputField
          multiline={true}
          ref='other_input'
          placeholder='Other Input'
          helpText='this is an helpful text it can be also very very long and it will wrap' />
        <SwitchField label='I accept Terms & Conditions'
                     ref="has_accepted_conditions"
                     helpText='Please read carefully the terms & conditions'/>


      </Form>

    </ScrollView>);
  }

}