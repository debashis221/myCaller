import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from './HomeScreenPresenter';
const {width, height} = Dimensions.get('window');

import Iconicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  value: number;
  isNumber: boolean;
};

@inject('homeStore')
@observer
export class CallScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      value: 12345678,
      isNumber: false,
    };
  }
  render() {
    let background = require('../../resources/background.png');
    let person = require('../../resources/person.png');

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <ImageBackground source={background} style={styles.background} />
        <View style={styles.viewContainer}>
          <Text style={styles.voiceText}>Voice call</Text>
          <Text style={styles.personName}>Jason</Text>
          <Text style={styles.voiceText}>Calling +91879063568</Text>
          <Text style={styles.voiceText}>5:36 | 120.20p</Text>
          <Image source={person} />
          {this.state.isNumber && (
            <View>
              <TextInput
                style={styles.input}
                defaultValue={String(this.state.value)}
                keyboardType="numeric"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          )}
          {this.state.isNumber ? (
            <View style={styles.numberContainer}>
              <View style={styles.number}>
                <Text style={styles.numberText}>1</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>2</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>3</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>4</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>5</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>6</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>7</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>8</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>9</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>*</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>0</Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>#</Text>
              </View>
            </View>
          ) : (
            <View style={styles.numberContainer}>
              <View style={styles.number}>
                <Text style={styles.numberText}>
                  <Iconicons name="volume-high" size={30} color={'grey'} />{' '}
                </Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>
                  <Iconicons name="volume-mute" size={30} color={'grey'} />
                </Text>
              </View>
              <View style={styles.number}>
                <Text style={styles.numberText}>
                  <Iconicons name="add" size={40} color={'grey'} />
                </Text>
              </View>
            </View>
          )}

          <View style={styles.keypadContainer}>
            <View style={styles.opacity}>
              <Text style={styles.numberText}>
                <Iconicons name="backspace" size={40} color={'grey'} />
              </Text>
            </View>
            <TouchableOpacity
              style={styles.number}
              onPress={() => this.setState({isNumber: !this.state.isNumber})}>
              <Text style={styles.numberText}>
                <Iconicons name="keypad" size={30} color={'grey'} />
              </Text>
            </TouchableOpacity>
            {this.state.isNumber && (
              <View style={styles.number}>
                <Text style={styles.numberText}>
                  <Iconicons name="backspace" size={40} color={'grey'} />
                </Text>
              </View>
            )}
            {!this.state.isNumber && (
              <View style={styles.opacity}>
                <Text style={styles.numberText}>
                  <Iconicons name="backspace" size={40} color={'grey'} />
                </Text>
              </View>
            )}
          </View>
          {!this.state.isNumber && (
            <View style={styles.hangupContainer}>
              <Text>
                <MaterialCommunity
                  name="phone-hangup"
                  size={30}
                  color={'white'}
                />{' '}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
  },
  backspace: {
    width: 55,
    height: 55,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  viewContainer: {
    width: width,
    height: height,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceText: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#ffffff',
    margin: 4,
  },
  personName: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  numberContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 282,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  keypadContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 282,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 50,
  },
  number: {
    width: 55,
    height: 55,
    borderRadius: 75,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  opacity: {
    width: 55,
    height: 55,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    opacity: 0,
  },
  numberText: {
    fontSize: 30,
    letterSpacing: 0,
    fontFamily: 'SFProDisplay-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  hangupContainer: {
    width: 55,
    height: 55,
    borderRadius: 75,
    backgroundColor: '#A93300',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    display: 'flex',
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    color: 'white',
  },
});
