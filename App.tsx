import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';

import React, {Component, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginScreen,
  OtpScreen,
  NotificationScreen,
  CreateProfileScreen,
} from './src/modules/login';
import {
  MoreScreen,
  PremiumScreen,
  ProtectScreen,
  SearchScreen,
} from './src/modules/home';
import {
  WhoViewedMyProfileScreen,
  ContactUsScreen,
  EditProfileScreen,
} from './src/modules/home/more';
import {StorageFactory} from './src/database';
import {Contacts} from './src/database/models';
import {ContactScreen, ContactSearchScreen} from './src/modules/home/search';
import HomeStyle from './src/stylesheet/HomeStyle';
import rootStore from './src/stores/RootStore';
import {Utils, RestClient} from './src/services';
import Iconicons from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AlertsModel} from './src/components';
import {getUniqueId, getDeviceName} from 'react-native-device-info';
import MainStack from './Component/Navigation/StackNavigation';

const windowWidth = Dimensions.get('window').width;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MoreStackNavigator() {
  return (
    <Provider homeStore={rootStore._homeStore}>
      <Stack.Navigator>
        <Stack.Screen
          name="More"
          component={MoreScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WVMPS"
          component={WhoViewedMyProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contact"
          component={ContactUsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Logout"
          component={LoginStack}
          options={{headerShown: false, tabBarVisible: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
}

function PremiumStackNavigator() {
  return (
    <Provider homeStore={rootStore._homeStore}>
      <Stack.Navigator>
        <Stack.Screen
          name="Premium"
          component={PremiumScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
}

function ProtectStackNavigator() {
  return (
    <Provider homeStore={rootStore._homeStore}>
      <Stack.Navigator>
        <Stack.Screen
          name="Protect"
          component={ProtectScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
}

function SearchStackNavigator() {
  return (
    <Provider homeStore={rootStore._homeStore}>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContactSearch"
          component={ContactSearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
}

function HomeTabs() {
  return (
    <Provider homeStore={rootStore._homeStore}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'mediumpurple',
          inactiveTintColor: 'lightgray',
          labelStyle: {fontSize: 13},
          showLabel: false,
          tabBarActiveBackgroundColor: 'mediumpurple',
          tabBarInactiveBackgroundColor: 'lightgray',
        }}>
        <Tab.Screen
          name="Search"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={[
                  HomeStyle.tabBarIcon,
                  {backgroundColor: focused ? '#ECE6EE' : ''},
                ]}>
                <OctIcon
                  name="search"
                  size={20}
                  color={focused ? 'mediumpurple' : '#C2C2C2'}
                />
                <Text
                  style={[
                    HomeStyle.tabBarText,
                    {color: focused ? 'mediumpurple' : '#C2C2C2'},
                  ]}>
                  Search
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Protect"
          component={ProtectStackNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={[
                  HomeStyle.tabBarIcon,
                  {backgroundColor: focused ? '#ECE6EE' : ''},
                ]}>
                <Iconicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={focused ? 'mediumpurple' : '#C2C2C2'}
                />
                <Text
                  style={[
                    HomeStyle.tabBarText,
                    {color: focused ? 'mediumpurple' : '#C2C2C2'},
                  ]}>
                  Protect
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreStackNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={[
                  HomeStyle.tabBarIcon,
                  {backgroundColor: focused ? '#ECE6EE' : ''},
                ]}>
                <OctIcon
                  name="three-bars"
                  size={20}
                  color={focused ? 'mediumpurple' : '#C2C2C2'}
                />
                <Text
                  style={[
                    HomeStyle.tabBarText,
                    {color: focused ? 'mediumpurple' : '#C2C2C2'},
                  ]}>
                  More
                </Text>
              </View>
            ),
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={MainStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={[
                  HomeStyle.tabBarIcon,
                  {backgroundColor: focused ? '#ECE6EE' : ''},
                ]}>
                <Entypo
                  name="chat"
                  size={20}
                  color={focused ? 'mediumpurple' : '#C2C2C2'}
                />
                <Text
                  style={[
                    HomeStyle.tabBarText,
                    {color: focused ? 'mediumpurple' : '#C2C2C2'},
                  ]}>
             Chat
                </Text>
              </View>
            ),
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
}

function LoginStack() {
  return (
    <Provider loginStore={rootStore._loginStore}>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfileScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
}

function HomeStack() {
  return (
    <Provider loginStore={rootStore._loginStore}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Provider>
  );
}

type MyState = {
  isLogin: boolean;
  keyData: object;
  token: string;
};

interface Props {
  navigation: any;
}

export class App extends Component<Props, MyState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLogin: false,
      keyData: undefined,
      token: undefined,
    };
  }

  componentDidMount() {
    var text = '';
    var possible = '0123456789qwertyuiopasdfghjklzxcvbnm';
    for (var i = 0; i < 30; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    getUniqueId().then(uniqueId => {
      debugger;
      getDeviceName().then(deviceName => {
         let obj = {
           os: Platform.OS,
           deviceId: uniqueId,
           deviceName: deviceName,
           versionCode: '1',
           code: 'react',
         };
         rootStore._loginStore['uuid'] = uniqueId;
         rootStore._loginStore['deviceName'] = deviceName;
         console.log('imei ' + uniqueId);
         console.log('keys Data before api : ', rootStore._loginStore.keyData);
         StorageFactory.createAll([Contacts])
           .then(() => {
             AsyncStorage.getItem('keyData').then(data => {
               if (data === null) {
                 RestClient.getKeysData(obj)
                   .then(async data => {
                     debugger;
                     let str: string = data as string;
                     let json = JSON.parse(Utils.decodeData(str));
                     if (json.resCode === '200') {
                       debugger;
                       console.log('keys Data response', json);

                       rootStore._loginStore.keyData = json;
                       rootStore._loginStore.countryCodeValues = json.data;
                       rootStore._loginStore.countryCodeValue =
                         json.data.length > 0 && json.data[0];
                       rootStore._loginStore.urlData = json.urlData;
                       rootStore._homeStore.moreData = json.moreData;
                       rootStore._loginStore['deviceName'] = deviceName;

                       await AsyncStorage.setItem(
                         'loginData',
                         JSON.stringify({isLogin: true, deviceName}),
                       );
                       await AsyncStorage.setItem(
                         'keyData',
                         JSON.stringify(json),
                       );
                       await AsyncStorage.setItem('deviceID', uniqueId);

                       this.getData(json);
                     } else {
                       AlertsModel.showAlert(
                         `${json.resCode} : ${json.resText}`,
                       );
                     }
                   })
                   .catch(err => {
                     AlertsModel.showAlert(`${json.resCode} : ${json.resText}`);
                   });
               } else {
                 this.getData(JSON.parse(data));
               }
             });
           })
           .catch(err => {
             AlertsModel.showAlert(
               `Database malfunction Please Contact Admin!`,
             );
           });
      })
     
    });

    // if (!rootStore._loginStore.countryCodeValues) {
    //   RestClient.getISDCodes().then(result => {
    //     if (!result) {
    //       this.setState({isLogin: true});
    //       return;
    //     }
    //     rootStore._loginStore.countryCodeValues = result.data;

    //     let countryCodeValue = rootStore._loginStore.countryCodeValues.filter(
    //       item => item.country === 'India',
    //     );

    //     rootStore._loginStore.countryCodeValue =
    //       countryCodeValue && countryCodeValue[0];
    //     this.setState({isLogin: true});
    //   });
    // } else this.setState({isLogin: true});
  }

  getData = async data => {
    try {
      const value = await AsyncStorage.getItem('loginData');
      let loginData = value !== null ? JSON.parse(value) : {};

      console.log('login saved value : ---------- ', value);

      rootStore._loginStore.keyData = data;
      rootStore._loginStore.countryCodeValues = data.data;
      rootStore._loginStore.countryCodeValue =
        data.data.length > 0 && data.data[0];
      rootStore._loginStore.urlData = data.urlData;
      rootStore._homeStore.moreData = data.moreData;
      rootStore._loginStore.deviceName = loginData.deviceName;
      rootStore._loginStore.otpSize = 6;

      if (loginData.isLogin) {
        rootStore._loginStore.isLogin = true;
        rootStore._loginStore.token = loginData.token;
        rootStore._loginStore.mobileNumber = loginData.mobileNumber;
        this.setState({isLogin: true, keyData: data, token: loginData.token});
        return rootStore._loginStore.isLogin;
      } else {
        rootStore._loginStore.isLogin = false;
        rootStore._loginStore.token = loginData.token;
        rootStore._loginStore.mobileNumber = loginData.mobileNumber;
        this.setState({isLogin: false, keyData: data, token: loginData.token});
        return rootStore._loginStore.isLogin;
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {
    debugger;
    return (
      <Provider rootStore={rootStore}>
        <NavigationContainer>
          {this.state.isLogin ? (
            this.state.token ? (
              <HomeTabs />
            ) : (
              <LoginStack />
            )
          ) : (
            <View />
          )}
        </NavigationContainer>
      </Provider>
    );
  }
}

global.Promise.Create = resolver => {
  let _promise = {};

  let promise = new Promise((resolve, reject) => {
    _promise.resolve = resolve;
    _promise.reject = reject;
    resolver && resolver(resolve, reject);
  });

  promise.resolve = _promise.resolve;
  promise.reject = _promise.reject;

  return promise;
};

export default App;
