'use strict'

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Carousel from 'react-native-looped-carousel'

import { facebookConnectionSuccess, facebookConnectionFailure } from './../actions'
import ViewContainer from './../components/ViewContainer'
import TextContainer from './../components/TextContainer'
import Header from './../components/Header'
import Footer from './../components/Footer'
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

  constructor(props) {
    super(props)
    let {width, height} = Dimensions.get('window');
    this.state = {
      size: {width: width, height: (height / 2)}
    }
  }

  render() {
    const {app} = this.props
    return (
      <ViewContainer>
        <Header showLogo={true} />
        <FacebookButton handleSuccess={facebookConnectionSuccess} handleFailure={facebookConnectionFailure} />

        <Carousel delay={10000} style={this.state.size}>
          <View style={[{backgroundColor:'#BADA55'}, this.state.size]}>
            <TextContainer>Slide 1</TextContainer>
          </View>
          <View style={[{backgroundColor:'red'}, this.state.size]}>
            <TextContainer>Slide 2</TextContainer>
          </View>
          <View style={[{backgroundColor:'blue'}, this.state.size]}>
            <TextContainer>Slide 3</TextContainer>
          </View>
        </Carousel>

        <Footer />
      </ViewContainer>
    )
  }
}