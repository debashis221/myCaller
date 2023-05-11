import React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from './HomeScreenPresenter';
import Iconicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  value: number;
};

@inject('homeStore')
@observer
export class ProtectScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      value: 12345678,
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View />
          <View>
            <TextInput
              style={styles.input}
              defaultValue={String(this.state.value)}
              keyboardType="numeric"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
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
              <Text style={styles.numberText}>C</Text>
            </View>
            <View style={styles.number}>
              <Text style={styles.numberText}>0</Text>
            </View>
            <View style={styles.backspace}>
              <Iconicons name="backspace" size={40} color={'gray'} />
            </View>
          </View>
          <View style={styles.actionsContainer}>
            <View style={styles.callButton}>
              <Iconicons name="call" size={30} color={'#FFFFFF'} />
            </View>
            <View style={styles.callButton}>
              <Iconicons name="videocam" size={30} color={'#FFFFFF'} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default ProtectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    backgroundColor: '#FFFFFF',
    width: width,
    height: height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  number: {
    width: 60,
    height: 60,
    borderRadius: 75,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  numberText: {
    fontSize: 30,
    letterSpacing: 0,
    fontFamily: 'SFProDisplay-Regular',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backspace: {
    width: 60,
    height: 60,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  callButton: {
    width: 60,
    height: 60,
    borderRadius: 70,
    backgroundColor: '#00A968',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
});
