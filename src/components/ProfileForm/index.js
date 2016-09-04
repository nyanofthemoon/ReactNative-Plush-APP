import React from 'react'

import { View } from 'react-native'
import { Button } from 'native-base'
import { Form,InputField,PickerField,SwitchField } from 'react-native-form-generator'

import styles from './styles'

//@TODO Fix placeholder color
//@TODO Fix select text color

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

  render() {
    return (
      <Form ref='form' style={styles.container} onChange={this.handleFormChange.bind(this)}>
        <InputField ref='nickname' label='Nickname' placeholder='Nickname or Full Name' maxLength={25} labelStyle={styles.label} style={styles.value} containerStyle={styles.container} />
        <PickerField ref='education' labelStyle={styles.label} valueStyle={[styles.value, styles.select]} containerStyle={styles.value} containerStyle={styles.container}
                     label='Education'
                     options={{ 'Secondary': 'Secondary', 'Post-Secondary': 'Post-Secondary', 'College': 'College', 'University': 'University', autodidact: 'Autodidact'}}
        />
        <PickerField ref='employment' labelStyle={styles.label} valueStyle={[styles.value, styles.select]} containerStyle={styles.value} containerStyle={styles.container}
                     label='Employment'
                     options={{ 'Student': 'Student', 'Unemployed': 'Unemployed', 'Employed': 'Employed', 'Freelancer': 'Freelancer', 'Stay-At-Home': 'Stay-At-Home'}}
        />
        <PickerField ref='diet' labelStyle={styles.label} valueStyle={[styles.value, styles.select]} containerStyle={styles.container}
                     label='Regular Diet'
                     options={{ healthy: 'Healthy', unhealthy: 'Unhealthy', vegetarian: 'Vegetarian', vegan: 'Vegan', other: 'Other'}}
        />
        <PickerField ref='orientation' labelStyle={styles.label} valueStyle={[styles.value, styles.select]} containerStyle={styles.container}
                     label='Relationships'
                     options={{ O: 'Opposite Gender', S: 'Same Gender', A: 'Any Gender' }}
        />
        <PickerField ref='friendship' labelStyle={styles.label} valueStyle={[styles.value, styles.select]} containerStyle={styles.container}
                     label='Friendships'
                     options={{ S: 'Same Gender', O: 'Opposite Gender', A: 'Any Gender'}}
        />
        <InputField labelStyle={styles.label} style={styles.value} containerStyle={styles.container}
          ref='headline'
          placeholder='Think of a short and catchy headline!'
          maxLength={32}
        />
        <InputField style={[styles.bio, styles.value]} containerStyle={styles.container}
          ref='bio'
          placeholder='Your most complete bio, shorthened.'
          multiline={true}
          maxLength={300}
        />
      </Form>
    )
  }

}