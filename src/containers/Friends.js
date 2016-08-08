'use strict'

import React, { Component } from 'react';

import { goToHomeScene } from './../actions'

import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Button from './../components/Button'

export default class extends React.Component {
  render() {
    return (
      <ViewContainer>
        <Header showLogo={false} />
        <TextContainer>Friends Scene</TextContainer>
        <Button text={'Home'} onPress={goToHomeScene} />
        <Footer />
      </ViewContainer>
    )
  }
}