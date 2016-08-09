'use strict'

if (!window.navigator.userAgent) {
  window.navigator.userAgent = 'react-native';
}

const io = require('socket.io-client/socket.io')

import React from 'react'

// check imports
import { Text, TouchableHighlight, View, TextInput, ListView, Dimensions } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

var WebRTC = require('react-native-webrtc');
var { RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia } = WebRTC;

import ViewContainer from './../ViewContainer'
import TextContainer from './../TextContainer'
import Button from './../Button'

import styles from './styles'


// might not need this
function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

@connect(
  state => ({
    app : state.app,
    user: state.user
  })
)

export default class extends React.Component {

  static propTypes = {
    app     : React.PropTypes.object.isRequired,
    user    : React.PropTypes.object.isRequired,
    socket  : React.PropTypes.object.isRequired,
    config  : React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    this.state = {
      pcPeers: {},
      localStream: null,
      info: 'Initializing',
      status: 'init',
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
      textRoomConnected: false,
      textRoomData: [],
      textRoomValue: '',
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height
    }
  }


  componentWillMount() {
  }

  componentDidMount() {
    let that = this
    this._getLocalStream(true, function(stream) {
      that.setState({
        localStream: stream,
        selfViewSrc: stream.toURL(),
        status     : 'connect',
        info       : 'Waiting For Someone'
      })
      that.props.socket.emit('join', '', function(socketIds){
        for (const i in socketIds) {
          const socketId = socketIds[i];
          that._createPC(socketId, true);
        }
      });
    });
    this.props.socket.on('exchange', function(data) {
      that._exchange(data);
    });
    this.props.socket.on('leave', function(socketId) {
      that._leave(socketId);
    });
  }

  _logError(message) {
    //alert(message)
  }

  _getStats() {
    let that = this
    const pc = this.state.pcPeers[Object.keys(this.state.pcPeers)[0]];
    if (pc.getRemoteStreams && pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
      const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
      pc.getStats(track, function(report) {
      }, that._logError);
    }
  }

  _createPC(socketId, isOffer) {
    let that = this
    const pc = new RTCPeerConnection(this.props.config);

    let newPeers = this.state.pcPeers
    newPeers[socketId] = pc;
    this.setState({ pcPeers: newPeers })

    pc.onicecandidate = function (event) {
      console.log('onicecandidate', event.candidate);
      if (event.candidate) {
        that.props.socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
      }
    };

    function createOffer() {
      pc.createOffer(function(desc) {
        pc.setLocalDescription(desc, function () {
          that.props.socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
        }, that._logError);
      }, that._logError);
    }

    pc.onnegotiationneeded = function () {
      if (isOffer) {
        createOffer();
      }
    }

    pc.oniceconnectionstatechange = function(event) {
      if (event.target.iceConnectionState === 'completed') {
        setTimeout(() => {
          that._getStats();
        }, 1000);
      }
      if (event.target.iceConnectionState === 'connected') {
        createDataChannel();
      }
    };

    pc.onaddstream = function (event) {
      that.setState({info: 'One peer join!'});
      const remoteList = that.state.remoteList;
      remoteList[socketId] = event.stream.toURL();
      that.setState({ remoteList: remoteList });
    };

    pc.addStream(that.state.localStream);
    function createDataChannel() {
      if (pc.textDataChannel) {
        return;
      }
      const dataChannel = pc.createDataChannel('text');

      dataChannel.onmessage = function (event) {
        //console.log("dataChannel.onmessage:", event.data);
        that._receiveTextData({user: socketId, message: event.data});
      };

      dataChannel.onopen = function () {
        console.log('dataChannel.onopen');
        that.setState({textRoomConnected: true});
      };

      pc.textDataChannel = dataChannel;
    }
    return pc;
  }

  _getLocalStream(isFront, callback) {
    let that = this
    MediaStreamTrack.getSources(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (const i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.id;
        }
      }
      getUserMedia({
        "audio": true,
        "video": {
          optional: [{sourceId: videoSourceId}]
        }
      }, function (stream) {
        callback(stream);
      }, that._logError);
    });
  }

  _exchange(data) {
    let that = this
    const fromId = data.from;
    let pc;
    if (fromId in this.state.pcPeers) {
      pc = this.state.pcPeers[fromId];
    } else {
      pc = this._createPC(fromId, false);
    }
    if (data.sdp) {
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
        if (pc.remoteDescription.type == "offer")
          pc.createAnswer(function(desc) {
            pc.setLocalDescription(desc, function () {
              that.props.socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
            }, that._logError);
          }, that._logError);
      }, that._logError);
    } else {
      pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }

  _leave(socketId) {
    const pc = this.state.pcPeers[socketId];
    if (pc) {
      pc.close();

      let newPeers = this.state.pcPeers
      delete newPeers[socketId];
      this.setState({
        pcPeers: newPeers
      })

      const remoteList = container.state.remoteList;
      delete remoteList[socketId]
      container.setState({remoteList: remoteList});
      container.setState({info: 'One peer leave!'});
    }
  }

  _receiveTextData(data) {
    const textRoomData = this.state.textRoomData.slice();
    textRoomData.push(data);
    this.setState({textRoomData, textRoomValue: ''});
  }

  _textRoomPress() {
    if (!this.state.textRoomValue) {
      return
    }
    const textRoomData = this.state.textRoomData.slice();
    textRoomData.push({user: 'Me', message: this.state.textRoomValue});
    for (const key in this.state.pcPeers) {
      const pc = this.state.pcPeers[key];
      pc.textDataChannel.send(this.state.textRoomValue);
    }
    this.setState({textRoomData, textRoomValue: ''});
  }

  _renderTextRoom() {
    return (
      <View style={styles.listViewContainer}>
        <ListView
          dataSource={this.ds.cloneWithRows(this.state.textRoomData)}
          renderRow={rowData => <Text>{`${rowData.user}: ${rowData.message}`}</Text>}
        />
        <TextInput
          style={{width: 200, height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={value => this.setState({textRoomValue: value})}
          value={this.state.textRoomValue}
        />
        <TouchableHighlight
          onPress={this._textRoomPress}>
          <Text>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    //const {app, user} = this.props
    var that = this
    return (
      <ViewContainer style={styles.container}>
        <Text style={styles.welcome}>{this.state.info}</Text>
        {this.state.textRoomConnected && this._renderTextRoom()}
        { this.state.status == 'ready' ?
          (<View>
            <TouchableHighlight>
              <Text style={{color: 'black'}}>[ CLICK ME TO JOIN ROOM ]</Text>
            </TouchableHighlight>
          </View>) : null
        }
        <RTCView streamURL={this.state.selfViewSrc} style={[styles.selfView, {width: this.state.windowWidth, height: (this.state.windowHeight/2)}]} />
        {
          mapHash(this.state.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={[styles.remoteView, {width: that.state.windowWidth, height: (that.state.windowHeight/2)}]}/>
          })
        }
      </ViewContainer>
    )
  }
}

