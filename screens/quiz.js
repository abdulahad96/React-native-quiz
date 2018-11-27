import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { white } from 'ansi-colors';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizArr: [],
      startQuiz: false,
      qNo: 0,
      ans: 0,
    };
  }

  componentDidMount() {
    fetch(
      'https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple'
    )
      .then(response => response.json())
      .then(responseJson => {
        let x = this.state.quizArr;
        x.push(responseJson);
        this.setState({ quizArr: x });
      })
      .catch(error => {
        console.error(error);
      });
  }

  confirmationAlert() {
    return Alert.alert(
      'Start Quiz!',
      'Do you want to start the quiz?',
      [
        {
          text: 'no',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'yes', onPress: () => this.setState({ startQuiz: true }) },
      ],
      { cancelable: false }
    );
  }

  next(e, b, l) {
    let {ans, qNo, quizArr} = this.state;
    e === b && this.setState({ ans: 1 + ans})
    this.setState({ qNo: 1 + qNo})
    if(qNo === l) {
      console.log('result Des : ', ans)
    }
  }

  render() {
    const { quizArr, startQuiz, qNo , ans} = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
        
        {
          quizArr &&
          quizArr.map((v) => {
            return v.results.map((a, i) => {
              let arr = [...a.incorrect_answers]
              let random = Math.floor((Math.random() * 2-1) + 1)
              arr.splice(random, 0, a.correct_answer);
              return (
                i === qNo && <View key={i} style={styles.container}>
                  <Text style={{ 
                   backgroundColor: 'gray',
                   padding: 8,
                   marginBottom: 10, 
                   width: '40%', 
                   fontSize: 17,
                   color: 'white',
                   fontWeight: 'bold',
                   borderRadius: 10,
                   textAlign: 'center'
                   }}>
                    Question # {i + 1}
                  </Text>

                  <Text style={styles.quizQ}>
                    {a.question}
                  </Text>
                  <Text>
                    {"\n"}
                   
                  </Text>
                  {
                    arr.map((b, n) => {
                      return (
                        <TouchableOpacity
                          key={n}
                          onPress={this.next.bind(this, a.correct_answer, b, v.results.length-1)}
                          style={styles.nxtBtn}
                        >
                          <Text style={styles.btnTxt}>
                            {b}
                          </Text>
                        </TouchableOpacity>

                      )
                    })
                  }
                </View>
              );
            });
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'column',
    padding: 15,
    margin: 10,elevation: 5
  },
  quizQ: {
    backgroundColor: 'gray',
    color: 'white',
    padding: 10,
    fontSize: 17,
    fontWeight: '400',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  options: {
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 20,
    paddingEnd: 20
  },
  nxtBtn: {
    width: 'auto',
    padding: 12,
    backgroundColor: 'gray',
    justifyContent: 'flex-start',
    margin: 5,
    elevation: 5,
    marginStart: 20,
    marginEnd: 30,
    borderRadius: 10
  },
  btnTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  }
});
