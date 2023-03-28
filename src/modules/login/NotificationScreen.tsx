import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  LogBox,
  Image,
  Platform,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import LoginScreenPresenter from './LoginScreenPresenter';
import rootStore from '../../stores/RootStore';
import LoginStyle from '../../stylesheet/LoginStyle';

interface Props {
  navigation: any;
}

type MyState = {
  notificationStatus: any;
};

let NOTIFICATION_IMAGE = require('../../resources/Notification.png');

@inject('loginStore')
@observer
export class NotificationScreen extends Component<Props, MyState> {
  componentDidMount(): void {
    this.props.navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignSelf: 'center',
            }}>
            <Image
              style={LoginStyle.notificationImage}
              source={NOTIFICATION_IMAGE}
            />
          </View>
          <View style={{flex: 1.2, alignItems: 'center', marginTop: 20}}>
            <View style={{alignItems: 'center', flex: 2}}>
              <Text style={{fontSize: 20, fontWeight: '500'}}>
                Enable Call Alerts
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '300',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                Turn On all alert notifications to improve your call
                identification experience
              </Text>
            </View>
            <View style={{flex: 1.5, width: '100%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  rootStore._loginStore.notificationStatus = false;
                  if (rootStore._loginStore.firstTimeUser)
                    this.props.navigation.navigate('CreateProfile');
                  else this.props.navigation.navigate('Home');
                }}
                style={LoginStyle.notificationMayBe}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: 'mediumpurple',
                  }}>
                  Maybe Later
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  debugger;
                  // PermissionManager.requestPermission().then(() => {
                  debugger;
                  rootStore._loginStore.notificationStatus = true;
                  if (rootStore._loginStore.isFirstTimeUser)
                    this.props.navigation.navigate('CreateProfile');
                  else {
                    this.props.navigation.navigate('Home');
                  }
                  // }).catch(err => {
                  //   debugger
                  // })
                }}
                style={LoginStyle.notificationEnable}>
                <Text style={{fontSize: 16, fontWeight: '600', color: 'snow'}}>
                  Turn On
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NotificationScreen;
