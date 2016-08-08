'use strict'

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { facebookConnectionSuccess, facebookConnectionFailure } from './../actions'
import ViewContainer from './../components/ViewContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
import Slider from './../components/Slider'
import FacebookButton from './../components/FacebookButton'

@connect(
  state => ({
    app: state.app
  })
)

export default class extends React.Component {
  static propTypes = {
    app: React.PropTypes.object.isRequired
  }

  render() {
    const {app} = this.props
    return (
      <ViewContainer>
        <Header showLogo={true} />
        <FacebookButton handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} />
        <Slider />
        <Footer />
      </ViewContainer>
    )
  }
}