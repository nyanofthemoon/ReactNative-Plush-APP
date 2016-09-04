'use strict'

import React, { Component } from 'react'
import { Title, Button } from 'native-base'
import { connect } from 'react-redux'

import styles from './styles'

import Container from './../../components/Container'

@connect(
  state => ({
    app : state.app
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired
  };

  render() {
    const {app} = this.props
    return (
      <Container header={false} cover={'error'}>
        <Title style={[styles.title, styles.shadowed]}>Plush !</Title>
        <Title style={[styles.subtitle, styles.shadowed]}>Uhh? That was strange...</Title>
        <Title style={[styles.message, styles.shadowed]}>{app.get('errorMessage')}</Title>
      </Container>
    )
  }
}