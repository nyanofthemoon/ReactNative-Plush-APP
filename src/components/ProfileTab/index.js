'use strict'

import React from 'react'
import { ScrollView, View, Image } from 'react-native'
import { Card, CardItem, Button, Text } from 'native-base'

import { queryContact } from './../../actions'
import { genderIcon } from './../../helpers/icons'

import styles from './styles'

export default class extends React.Component {

  componentWillMount() {
    if (undefined === this.props.profile) {
      queryContact(this.props.id)
    } else {
      if ((new Date().getTime() - this.props.profile.lastUpdated) >= 86400) {
        queryContact(this.props.id)
      }
    }
  }

  render() {
    let headline = styles.hidden
    if (this.props.profile.profile.headline && this.props.profile.profile.headline.length > 1) {
      headline = null
    }
    let bio = styles.hidden
    if (this.props.profile.profile.bio && this.props.profile.profile.bio.length > 1) {
      bio = null
    }
    let country = styles.hidden
    if (this.props.profile.location.country) {
      country = null
    }
    let city = styles.hidden
    if (this.props.profile.location.city) {
      city = null
    }
    let diet = styles.hidden
    if (this.props.profile.profile.diet) {
      diet = null
    }
    let education = styles.hidden
    if (this.props.profile.profile.education) {
      education = null
    }
    let employment = styles.hidden
    if (this.props.profile.profile.employment) {
      employment = null
    }

    return (
      <ScrollView scrollEnabled={true}>
        <Card style={styles.container}>
          <CardItem cardBody style={styles.card}>
            <Image style={{ resizeMode: 'cover' }} source={{ uri: this.props.profile.profile.picture }} />
            <Text style={styles.hidden}></Text>
          </CardItem>
          <CardItem style={styles.card}>
            <Text style={[styles.headline, headline]}>{ this.props.profile.profile.headline }</Text>
            <View style={styles.head}>
              <Text style={styles.gender}>{ genderIcon(this.props.profile.profile.gender) }</Text>
              <Text style={styles.text}> { this.props.profile.profile.nickname }</Text>
            </View>
            <View style={styles.location}>
              <Text style={[styles.text, city]}>{ this.props.profile.location.city },</Text>
              <Text style={[styles.text, country]}> { this.props.profile.location.country }</Text>
            </View>
            <Text style={[styles.text, diet]}>{ this.props.profile.profile.diet } Diet</Text>
            <Text style={[styles.text, education]}>{ this.props.profile.profile.education } Education</Text>
            <Text style={[styles.text, employment]}>{ this.props.profile.profile.employment }</Text>
            <View>
              <Text style={[styles.text, bio, { marginTop: 20 }]}>{ this.props.profile.profile.bio }</Text>
            </View>
          </CardItem>
        </Card>
      </ScrollView>
    )
  }
}

/*
 <View style={styles.profile}>
 <Text style={[styles.text, city]}>Montreal{ this.props.profile.location.city }</Text>
 <Text style={[styles.text, country]}>Canada{ this.props.profile.location.country }</Text>
 </View>
 */