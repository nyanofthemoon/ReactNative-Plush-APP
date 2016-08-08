'use strict'

import React, { Component } from 'react';

import { goToHomeScene } from './../actions'

import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Button from './../components/Button'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class extends React.Component {
  render() {
    return (
      <ViewContainer>
        <Header showLogo={true} />
        <Icon name='bug' size={256} color='black' style={{ paddingTop: 25, paddingBottom: 15 }} />
        <TextContainer>Error Scene</TextContainer>
        <TextContainer message={this.props.message || 'Oops!'} />
        <Button text={'Home Button'} onPress={goToHomeScene} />
        <Footer />
      </ViewContainer>
    )
  }
}