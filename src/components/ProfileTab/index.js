'use strict'

import React from 'react'
import { ScrollView, View, Image } from 'react-native'
import { Column as Col, Row } from 'react-native-flexbox-grid'
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
      diet = styles.info
    }
    let education = styles.hidden
    if (this.props.profile.profile.education) {
      education = styles.info
    }
    let employment = styles.hidden
    if (this.props.profile.profile.employment) {
      employment = styles.info
    }

    return (
      <ScrollView scrollEnabled={true}>
        <Card style={styles.card}>
          <CardItem cardBody style={styles.cardItem}>
            <Image style={styles.picture} source={{ uri: this.props.profile.profile.picture }} />
            <Text style={styles.hidden}></Text>
          </CardItem>
          <CardItem style={styles.cardItem}>
            <Row>
              <Text style={[styles.headline, headline]}>{ this.props.profile.profile.headline }</Text>
            </Row>
            <Row nowrap>
              <Col sm={1}>
                { genderIcon(this.props.profile.profile.gender) }
              </Col>
              <Col sm={11} style={{ justifyContent:'center'}}>
                <Text style={styles.text}>{ this.props.profile.profile.nickname }</Text>
              </Col>
            </Row>
            <Row style={styles.info}>
              <Text style={[styles.text, city]}>{ this.props.profile.location.city },</Text>
              <Text style={[styles.text, country]}> { this.props.profile.location.country }</Text>
            </Row>
            <Row style={diet}>
              <Text style={styles.text}>{ this.props.profile.profile.diet } Diet</Text>
            </Row>
            <Row style={education}>
              <Text style={styles.text}>{ this.props.profile.profile.education } Education</Text>
            </Row>
            <Row style={employment}>
              <Text style={styles.text}>{ this.props.profile.profile.employment }</Text>
            </Row>
            <Row style={styles.info}>
              <Text style={[styles.text, styles.bio]}>{ this.props.profile.profile.bio }</Text>
            </Row>
          </CardItem>
        </Card>
      </ScrollView>
    )
  }
}