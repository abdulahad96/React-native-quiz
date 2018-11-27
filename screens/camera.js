import React from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet,} from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';

export default class FaceCam extends React.Component {

  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      start: false,
      photo: null
    };
  }

  x() {
    this.props.faceDetected()
  }

  snap = async () => {

    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
    }else{
      console.log('ok')
    }
  };

  render() {
    const { start , photo } = this.state;
    return (
      <View style={styles.content}>
        {
          start ? <Camera style={{ flex: 1 }} type={this.state.type}
            // onFacesDetected={() => this.x()}
            faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate
            }}
            ref={ref => { this.camera = ref; }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap.bind(this)}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Snap{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
            :
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TouchableOpacity
              onPress={() => this.setState({ start: true })}
              style={{
              }}
            >
              <Text style={{
                padding: 25,
                borderRadius: 20,
                fontSize: 20,
                fontWeight: 'bold',
                width: 'auto',
                color: 'white',
                backgroundColor: 'gray',
                margin: 5,
                elevation: 10,
                marginStart: 20,
                marginEnd: 30,
              }}>
                Start Quiz
              </Text>
            </TouchableOpacity>
            </View>
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  content:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
  },
});