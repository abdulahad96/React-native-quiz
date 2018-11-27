import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';
import FaceCam from './screens/camera'
import Quiz from './screens/quiz.js'

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    faceDetected: false
  };

  faceDetected() {
    this.setState({ faceDetected: true })
    console.log("ye raha");
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, faceDetected } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ImageBackground
            source={{
              uri: 'https://www.desktopbackground.org/p/2010/07/29/56023_abstract-3d-white-geometric-background-white-seamless-texture-w_1000x1000_h.jpg',
              cache: 'only-if-cached',
            }}
            style={{ flex: 1 }}
          >
            {
              faceDetected ? <Quiz /> : <FaceCam faceDetected={this.faceDetected.bind(this)} />

            }
          </ImageBackground>
        </View>
      );
    }
  }
}