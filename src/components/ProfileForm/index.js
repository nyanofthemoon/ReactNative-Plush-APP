import React from 'react'

import { Button } from 'native-base'
import { Form,InputField,PickerField,Separator } from 'react-native-form-generator'

import styles from './styles'

export default class extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data:{}
    }
  }

  componentDidMount() {
    this.refs.form.refs.nickname.setValue(this.props.user.profile.nickname)
    this.refs.form.refs.orientation.setValue(this.props.user.profile.orientation)
    this.refs.form.refs.friendship.setValue(this.props.user.profile.friendship)
    this.refs.form.refs.diet.setValue(this.props.user.profile.diet)
    this.refs.form.refs.education.setValue(this.props.user.profile.education)
    this.refs.form.refs.employment.setValue(this.props.user.profile.employment)
    this.refs.form.refs.headline.setValue(this.props.user.profile.headline)
    this.refs.form.refs.bio.setValue(this.props.user.profile.bio)
  }

  handleFormChange(data){
    this.setState({data:data})
  }

  getData() {
    return this.state.data
  }

  render(){
    return (
        <Form ref='form' style={styles.container} onChange={this.handleFormChange.bind(this)}>
          <InputField ref='nickname' label='Nickname' placeholder='Nickname or Full Name' labelStyle={styles.label} style={styles.value} />
          <PickerField ref='orientation' labelStyle={styles.label} valueStyle={[styles.value, styles.select]}
                       label='Relationships'
            options={{ O: 'Opposite Gender', S: 'Same Gender', A: 'Any Gender' }}
          />
          <PickerField ref='friendship' labelStyle={styles.label} valueStyle={[styles.value, styles.select]}
            label='Friendships'
            options={{ S: 'Same Gender', O: 'Opposite Gender', A: 'Any Gender'}}
          />
          <PickerField ref='diet' labelStyle={styles.label} valueStyle={[styles.value, styles.select]}
                       label='Regular Diet'
                       options={{ healthy: 'Healthy', unhealthy: 'Unhealthy', vegetarian: 'Vegetarian', vegan: 'Vegan', other: 'Other'}}
          />
          <PickerField ref='education' labelStyle={styles.label} valueStyle={[styles.value, styles.select]}
                       label='Education'
                       options={{ 'Secondary': 'Secondary', 'Post-Secondary': 'Post-Secondary', 'College': 'College', 'University': 'University', autodidact: 'Autodidact'}}
          />
          <PickerField ref='employment' labelStyle={styles.label} valueStyle={[styles.value, styles.select]}
                       label='Employment'
                       options={{ 'Student': 'Student', 'Unemployed': 'Unemployed', 'Employed': 'Employed', 'Freelancer': 'Freelancer', 'Stay-At-Home': 'Stay-At-Home'}}
          />
          <InputField labelStyle={styles.label} style={styles.value}
            ref='headline'
            placeholder='Think of a short and catchy headline!'
            maxLength={50}
          />
          <InputField style={[styles.bio, styles.value]}
            ref='bio'
            placeholder='Your most complete bio, shorthened.'
            multiline={true}
            maxLength={256}
          />
        </Form>
    )
  }

}