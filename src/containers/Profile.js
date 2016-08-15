'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { goToHomeScene } from './../actions'

import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Button from './../components/Button'

@connect(
  state => ({
    user: state.user
  })
)

export default class extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  render() {
    const {user} = this.props
    return (
      <ViewContainer>
        <Header showLogo={false} />
        <TextContainer>Profile Scene</TextContainer>
        <TextContainer>{JSON.stringify(user.toJSON())}</TextContainer>
        <Button text={'Home Button'} onPress={goToHomeScene} />
        <Footer />
      </ViewContainer>
    )
  }
}