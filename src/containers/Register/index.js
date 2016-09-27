'use strict'

import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Title, Button } from 'native-base'
import { connect } from 'react-redux'

import { goToHomeScene, loginUsingPlushAccount, createPlushAccount } from './../../actions'

import styles from './styles'

import Container from './../../components/Container'
import LoginForm from './../../components/LoginForm'
import RegisterForm from './../../components/RegisterForm'

@connect(
  state => ({
    app : state.app
  })
)

export default class extends React.Component {
  static propTypes = {
    app : React.PropTypes.object.isRequired
  };

  _logIn() {
    let data = this.refs.login.getData()
    if (false !== data) {
      loginUsingPlushAccount(data)
    }
  }

  _signUp() {
    let data = this.refs.signup.getData()
    if (false !== data) {
      createPlushAccount(data)
    }
  }

  render() {
    const {app} = this.props
    return (
      <Container header={false} footer={<View style={styles.container}><Button warning style={styles.button} onPress={goToHomeScene}>Go Back</Button></View>}>
        <ScrollView scrollEnabled={true}>
          <View style={styles.loginForm}>
            <Title style={styles.header}>Log In Using Plush!</Title>
            <LoginForm ref='login' />
            <View style={styles.container}>
              <Button success style={styles.button} onPress={this._logIn.bind(this)}>Log in</Button>
            </View>
          </View>
          <View style={styles.registerForm}>
            <Title style={styles.header}>Create Plush! Account</Title>
            <RegisterForm ref='signup'/>
            <View style={styles.container}>
              <Button success style={styles.button} onPress={this._signUp.bind(this)}>Create Account</Button>
            </View>
          </View>
        </ScrollView>
      </Container>
    )
  }
}