'use strict'

import React from 'react'

import { Title, Button } from 'native-base'

import { facebookConnectionLogout, goToHomeScene } from './../../actions'

import Container from './../../components/Container'
import FacebookButton from './../../components/FacebookButton'

import styles from './styles'

export default class extends React.Component {
  render() {
    return (
      <Container header={false} footer={false} cover={'splashGrayscale'}>
        <Title style={styles.title}>Extreme Meetups</Title>
        <Title style={styles.subtitle}>We're sad to see you go!</Title>
        <Button block style={styles.button}><Button success large onPress={goToHomeScene}> Wait! Go Back...</Button></Button>
        <Button block><FacebookButton handleLogout={facebookConnectionLogout}/></Button>
      </Container>
    )
  }
}