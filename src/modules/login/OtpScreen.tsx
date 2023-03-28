import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  LogBox,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import LoginScreenPresenter from './LoginScreenPresenter';
import LoginStyle from '../../stylesheet/LoginStyle';
import ContactStyle from '../../stylesheet/ContactStyle';
import rootStore from '../../stores/RootStore';
import {AlertsModel, RnOtpTimer} from '../../components';
import {RestClient, Utils} from '../../services';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Overlay} from 'react-native-elements';

interface Props {
  navigation: any;
}

type MyState = {
  otp: any;
  isLoading: boolean;
};

@inject('loginStore')
@observer
export class OtpScreen extends Component<Props, MyState> {
  presenter = new LoginScreenPresenter(this.props.navigation);
  otpTextInput = [];

  constructor(props: Props) {
    super(props);

    this.state = {
      otp: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.otpTextInput[0].focus();
  }

  renderOtp = () => {
    const inputs = Array(parseInt(rootStore._loginStore.otpSize)).fill(0);
    const otpScreen = inputs.map((item, index) => {
      return (
        <View style={LoginStyle.otpBox}>
          <TextInput
            style={{textAlign: 'center', height: 50, color: 'gray'}}
            keyboardType="numeric"
            onChangeText={value => {
              this.focusNext(index, value);
            }}
            onKeyPress={e => {
              this.focusPrevious(e.nativeEvent.key, index);
            }}
            ref={ref => {
              this.otpTextInput[index] = ref;
            }}
          />
        </View>
      );
    });
    return <View style={LoginStyle.otpContainer}>{otpScreen}</View>;
  };

  focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0) {
      this.otpTextInput[index - 1].focus();
    }
  }

  focusNext(index, value) {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.otp;
    otp[index] = value;
    this.setState({otp});
    rootStore._loginStore.otp = otp.join('');
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Overlay
          fullScreen={false}
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
          isVisible={this.state.isLoading}
          overlayStyle={ContactStyle.loading}
          backdropStyle={{opacity: 0.1, backgroundColor: 'black'}}>
          <Text style={ContactStyle.loadingText}>
            {'Validating Otp Please Wait..'}
          </Text>
          <ActivityIndicator
            style={{marginTop: 10}}
            size="large"
            color="white"
          />
        </Overlay>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={LoginStyle.container}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={LoginStyle.heading}>Enter OTP</Text>
              <Text style={LoginStyle.subHeading}>
                {`MyCaller will send you a one-time password via SMS to verify your number +${rootStore._loginStore.countryCodeValue.code} ${rootStore.loginStore.mobileNumber}`}
              </Text>
              {this.renderOtp()}
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <RnOtpTimer
                minute={1}
                second={0}
                onPress={async () => {
                  let payload = {
                    os: Platform.OS,
                    deviceId: rootStore._loginStore['uuid'],
                    deviceName: rootStore._loginStore['deviceName'],
                    versionCode: '1',
                    code: 'react',
                    mobile: rootStore._loginStore.mobileNumber,
                    countryCode: rootStore._loginStore.countryCodeValue.code,
                  };

                  let encryptedData = await Utils.mapWrapper(payload);
                  console.log('Login data ' + encryptedData);

                  RestClient.connectServer(
                    rootStore._loginStore.urlData.login,
                    encryptedData,
                  )
                    .then(result => {
                      if (result.status === 200) {
                        let data = JSON.parse(result.data);
                        Snackbar.show({
                          text: `${data.resText}`,
                          duration: Snackbar.LENGTH_LONG,
                        });
                      } else {
                        AlertsModel.showAlert(
                          `${result.status}: ${result.data.resText}`,
                        );
                      }
                    })
                    .catch(err => {
                      AlertsModel.showAlert(
                        `Unable to reach server. Please contact admin!`,
                      );
                    });
                }}
                fontsize={20}
                textcolor={'gray'}
                labelfontsize={20}
                labelcolor={'mediumpurple'}
              />
              <TouchableOpacity
                onPress={async () => {
                  let payload = {
                    os: Platform.OS,
                    deviceId: rootStore._loginStore['uuid'],
                    deviceName: rootStore._loginStore['deviceName'],
                    versionCode: '1',
                    code: 'react',
                    mobile: rootStore._loginStore.mobileNumber,
                    otp: rootStore._loginStore.otp,
                    countryCode: rootStore._loginStore.countryCodeValue.code,
                  };

                  let encryptedData = await Utils.mapWrapper(payload);
                  console.log('Login data ' + encryptedData);

                  RestClient.connectServer(
                    rootStore._loginStore.urlData.login,
                    encryptedData,
                  )
                    .then(async result => {
                      if (result.status === 200) {
                        let data = JSON.parse(result.data);
                        if (data.status === 'FAILED') {
                          AlertsModel.showAlert(
                            `${data.status}: ${data.resText}`,
                          );
                        } else if (data.status === 'SUCCESS') {
                          await AsyncStorage.setItem(
                            'loginData',
                            JSON.stringify({
                              token: data.token,
                              isLogin: true,
                              mobileNumber: rootStore._loginStore.mobileNumber,
                            }),
                          );
                          rootStore._loginStore.token = data.token;
                          rootStore._loginStore.isFirstTimeUser =
                            data.firstTimeUser === 'yes' ? true : false;
                          this.props.navigation.navigate('Notification');
                        }
                        this.setState({isLoading: false});
                      } else {
                        AlertsModel.showAlert(
                          `${result.status}: ${JSON.parse(
                            result.data.resText,
                          )}`,
                        );
                      }
                    })
                    .catch(err => {
                      AlertsModel.showAlert(
                        'Failed to Login. Please try again ',
                      );
                      this.setState({isLoading: true});
                    });
                  this.setState({isLoading: true});
                }}
                disabled={
                  rootStore._loginStore.otp &&
                  rootStore._loginStore.otp.length ===
                    parseInt(rootStore._loginStore.otpSize)
                    ? false
                    : true
                }>
                <View
                  style={
                    rootStore._loginStore.otp &&
                    rootStore._loginStore.otp.length ===
                      parseInt(rootStore._loginStore.otpSize)
                      ? LoginStyle.button
                      : LoginStyle.disabledButton
                  }>
                  <Text
                    style={{color: 'snow', fontSize: 15, fontWeight: '600'}}>
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default OtpScreen;
