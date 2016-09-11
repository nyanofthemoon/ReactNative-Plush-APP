'use strict'

import React from 'react'
import { ScrollView, View } from 'react-native'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import { Title, Button, List, ListItem, Text, Thumbnail, Badge } from 'native-base'
import { connect } from 'react-redux'

import { goToContact, goToMatchFriendshipScene, goToMatchRelationshipScene } from './../../actions'

import renderIf from './../../helpers/renderIf'
import { genderIcon } from './../../helpers/icons'


import styles from './styles'

@connect(
  state => ({
    contact: state.contact
  })
)

export default class extends React.Component {

  static propTypes = {
    contact: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    list: React.PropTypes.object.isRequired
  }

  _onPress(id) {
    goToContact(id)
  }

  _renderRow(id) {
    const {contact} = this.props
    let profile = contact.getIn(['profiles', id])
    if (profile) {
      profile = profile.toJSON()
      let badgeCount = contact.getIn(['count', id])
      let badgeStyle = styles.badge
      if (!badgeCount || badgeCount < 1) {
        badgeStyle = styles.hidden
      }
      return (
        <ListItem key={id} button onPress={this._onPress.bind(this, id)} style={styles.listItem}>
          <Row style={{ flex: 1 }} nowrap>
            <Col sm={1} style={{ justifyContent: 'center' }}>
              {genderIcon(profile.profile.gender, styles.gender)}
            </Col>
            <Col sm={2}>
              <Thumbnail style={{marginLeft:5}} size={40} source={{uri:profile.profile.picture}}/>
            </Col>
            <Col sm={8} style={{ justifyContent: 'center' }}>
              <Text style={styles.nickname}>{profile.profile.nickname}</Text>
            </Col>
            <Col sm={1} style={{ justifyContent: 'center' }}>
              <Badge style={badgeStyle}>{badgeCount}</Badge>
            </Col>
          </Row>
        </ListItem>
      )
    } else {
      return <ListItem key={id}><View></View></ListItem>
    }
  }

  render() {
    if (this.props.list && Object.keys(this.props.list).length > 0) {
      return <ScrollView>
        <List dataArray={this.props.list} renderRow={this._renderRow.bind(this)}/>
      </ScrollView>
    } else {
      if (this.props.type === 'relationship') {
        return <View style={{ flex:1 }}>
          <Col style={{ flex: 1, justifyContent:'center'}}>
            <Title style={styles.title}>It's time to meet people.</Title>
            <Button large info style={styles.button} onPress={goToMatchRelationshipScene}>
              <Text style={styles.title}>I'm Ready.</Text>
            </Button>
          </Col>
        </View>
      } else {
        return <View style={{ flex:1 }}>
          <Col style={{ flex: 1, justifyContent:'center'}}>
            <Title style={styles.title}>It's time to make friends.</Title>
            <Button large info style={styles.button} onPress={goToMatchFriendshipScene}>
              <Text style={styles.title}>Let's Go!</Text>
            </Button>
          </Col>
        </View>
      }
    }
  }
}