'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux'

import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <ViewContainer>
        <Header showLogo={true} />
        <Icon name='bug' size={256} color='black' style={{ paddingTop: 25, paddingBottom: 15 }} />
        <TextContainer>Oops !</TextContainer>
        <TextContainer>{app.get('errorMessage')}</TextContainer>
        <Footer />
      </ViewContainer>
    )
  }
}