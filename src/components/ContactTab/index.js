'use strict'

import { mapValues } from 'lodash'

import React from 'react'
import { ScrollView, View } from 'react-native'
import { Column as Col, Row } from 'react-native-flexbox-grid'
import { Title, Button, List, ListItem, Text, Thumbnail, Badge, Icon } from 'native-base'
import { connect } from 'react-redux'

import { goToContact, initiateCall, goToMatchFriendshipScene, goToMatchRelationshipScene } from './../../actions'

import renderIf from './../../helpers/renderIf'
import { genderIcon } from './../../helpers/icons'

import styles from './styles'

@connect(
  state => ({
    contact: state.contact,
    availability: state.availability
  })
)

export default class extends React.Component {

  static propTypes = {
    availability: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    list: React.PropTypes.object.isRequired
  }

  _onPress(id) {
    goToContact(id)
  }

  _onInitiateCall(id) {
    initiateCall({ id: id })
  }

  _renderRow(id) {
    const {contact, availability} = this.props
    let profile = contact.getIn(['profiles', id])
    if (profile) {
      profile = profile.toJSON()
      let badgeCount = contact.getIn(['count', id])
      let badgeStyle = styles.badge
      if (!badgeCount || badgeCount < 1) {
        badgeStyle = styles.hidden
      }
      let online
      let callButton = null
      if (!availability.getIn(['online', id])) {
        online = '#AAAAAA'
        callButton = <Button bordered style={{paddingLeft:10, paddingRight:30}}><Icon style={{ color:'#AAAAAA' }} name='ios-call-outline' /></Button>
      } else {
        online = '#FFFFFF'
        callButton = <Button bordered style={{paddingLeft:10, paddingRight:30}} onPress={this._onInitiateCall.bind(this, id)}><Icon style={{ color:'white' }} name='ios-call' /></Button>
      }
      return (
        <ListItem key={id} button onPress={this._onPress.bind(this, id)} style={styles.listItem}>
          <Row style={{ flex: 1 }} nowrap>
            <Col sm={1} style={{ justifyContent: 'center' }}>
              {genderIcon(profile.profile.gender, styles.gender)}
            </Col>
            <Col sm={2}>
              <Thumbnail style={{ marginLeft: 6 }} size={40} source={{uri:profile.profile.picture}}/>
            </Col>
            <Col sm={7} style={{ justifyContent: 'center' }}>
              <Text style={[styles.nickname, { color: online, marginLeft: 2 }]}>{profile.profile.nickname}</Text>
            </Col>
            <Col sm={1} style={{ justifyContent: 'center' }}>
              <Badge style={badgeStyle}>{badgeCount}</Badge>
            </Col>
            <Col sm={1} style={{ justifyContent: 'center' }}>
              {callButton}
            </Col>
          </Row>
        </ListItem>
      )
    } else {
      return <ListItem key={id}><View></View></ListItem>
    }
  }

  _sortListByMessageCount() {
    const {contact} = this.props
    let unreads = mapValues(contact.get('count').toJSON(), parseInt);
    let oldList = JSON.parse(JSON.stringify(this.props.list))
    let newList = {}
    Object.keys(unreads).forEach(function(unread) {
      newList[unread] = unread
      delete(oldList[unread])
    })
    Object.keys(oldList).forEach(function(old) {
      newList[old] = old
    })
    return newList
  }

  render() {
    if (this.props.list && Object.keys(this.props.list).length > 0) {
      let orderedList = this._sortListByMessageCount()
      return <ScrollView>
        <List dataArray={orderedList} renderRow={this._renderRow.bind(this)}/>
      </ScrollView>
    } else {
      if (this.props.type === 'relationship') {
        return <View style={{ flex:1 }}>
          <Col style={{ flex: 1, justifyContent:'center'}}>
            <Title style={styles.title}>No Contacts Yet.</Title>
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