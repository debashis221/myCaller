import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  LogBox,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import LoginScreenPresenter from './LoginScreenPresenter';
import LoginStyle from '../../stylesheet/LoginStyle';
import ContactStyle from '../../stylesheet/ContactStyle';
import rootStore from '../../stores/RootStore';
import {SvgUri} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {RestClient, Utils} from '../../services';
import Snackbar from 'react-native-snackbar';
import {AlertsModel} from '../../components';
import {Overlay} from 'react-native-elements';



interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  mobileNumber: String;
  countryCodeValue: any;
  searchString: String;
  searchCodeValues: any;
  FCMToken:String;

};

@inject('loginStore')
@observer
export class LoginScreen extends Component<Props, MyState> {
  presenter = new LoginScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      mobileNumber: '',
      countryCodeValue: rootStore._loginStore.countryCodeValue,
      searchString: '',
      searchCodeValues: [],
      FCMToken:''
    };

    

  }

 


  
  
  componentDidMount() {


   

   
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  renderCountryCodeItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          rootStore._loginStore.countryCodeValue = item;
          this.setState({
            countryCodeValue: rootStore._loginStore.countryCodeValue,
            searchString: '',
            searchCodeValues: [],
          });
          this.RBSheet.close();
        }}
        style={LoginStyle.countryCodeButton}>
        <View style={LoginStyle.imageContainer}>
          <SvgUri
            width={20}
            height={20}
            uri={item.flag.replace(/\\"/g, '"')}
            onError={error => {
              return null;
            }}
          />
          <Text
            style={
              LoginStyle.countryCodeButtonText
            }>{`${item.country} (+${item.code})`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _keyExtractor = (item, index) => index;

  renderBottomSheet = () => {
    let data;
    if (this.state.searchCodeValues.length > 0) {
      data = this.state.searchCodeValues;
    } else data = rootStore._loginStore.countryCodeValues;

    return (
      <View style={{flex: 1}}>
        <View style={LoginStyle.bottomSheetSearch}>
          <OctIcon
            name="search"
            size={20}
            color="gray"
            style={{marginLeft: 10}}
          />
          <TextInput
            style={{
              width: '80%',
              height: '100%',
              textAlign: 'justify',
              color: 'gray',
              fontSize: 16,
              fontWeight: '600',
            }}
            returnKeyLabel="Done"
            returnKeyType="done"
            onSubmitEditing={() => {
              if (this.state.searchString.length > 0) {
                let searchCodeValues =
                  rootStore._loginStore.countryCodeValues.filter(item => {
                    return item.country.includes(this.state.searchString);
                  });
                this.setState({searchCodeValues});
              } else {
                this.setState({searchCodeValues: []});
              }
              Keyboard.dismiss;
            }}
            onChangeText={text => {
              this.setState({searchString: text});
            }}
            value={this.state.searchString}
            placeholder="Search Country"
            placeholderTextColor={'gray'}
            maxLength={20}
          />
        </View>
        <FlatList
          data={data}
          renderItem={item => this.renderCountryCodeItem(item)}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  };

  renderChild = () => {
    return (
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row'}}
        onPress={() => {
          this.RBSheet.open();
        }}>
        <View style={LoginStyle.imageContainer}>
          <SvgUri
            width={20}
            height={20}
            uri={this.state.countryCodeValue.flag.replace(/\\"/g, '"')}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              marginLeft: 20,
              color: 'gray',
            }}>{`${this.state.countryCodeValue.country} (+${this.state.countryCodeValue.code})`}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight: 10,
          }}>
          <Icon name="chevron-thin-right" size={20} color="gray" />
        </View>
      </TouchableOpacity>
    );
  };

  renderISDCode = () => {
    return (
      <View style={LoginStyle.countryCodeContainer}>
        <Text style={LoginStyle.label}>Country</Text>
        <View style={LoginStyle.countryCodeBoxContainer}>
          {this.renderChild()}
          <RBSheet
            ref={ref => {
              if (ref !== null) this.RBSheet = ref;
            }}
            height={400}
            dragFromTopOnly={true}
            closeOnDragDown={true}
            closeOnPressMask={true}>
            {this.renderBottomSheet()}
          </RBSheet>
        </View>
      </View>
    );
  };

  renderPhoneNumber = () => {
    return (
      <View style={LoginStyle.phoneNumberContainer}>
        <Text style={LoginStyle.label}>Phone Number</Text>
        <View style={LoginStyle.textViewContainer}>
          <TextInput
            style={{
              marginLeft: 10,
              textAlign: 'left',
              fontWeight: '600',
              color: 'gray',
            }}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss;
            }}
            onChangeText={text => {
              this.setState({mobileNumber: text});
              rootStore._loginStore.mobileNumber = text;
            }}
            value={this.state.mobileNumber}
            placeholder="Your Phone Number"
            placeholderTextColor={'lightgray'}
            maxLength={10}
          />
        </View>
      </View>
    );
  };

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
            {'Initiating Otp Please Wait..'}
          </Text>
          <ActivityIndicator
            style={{marginTop: 10}}
            size="large"
            color="white"
          />
        </Overlay>
        <View style={LoginStyle.container}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={LoginStyle.heading}>Enter your phone number</Text>
            <Text style={LoginStyle.subHeading}>
              MyCaller will send you a one-time password via SMS to verify your
              number
            </Text>
            {this.renderISDCode()}
            {this.renderPhoneNumber()}
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              disabled={
                rootStore._loginStore.mobileNumber &&
                rootStore._loginStore.mobileNumber.length === 10
                  ? false
                  : true
              }
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
                // console.log('Login data ' + encryptedData);

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
                      this.props.navigation.navigate('Otp');
                    } else {
                      AlertsModel.showAlert(
                        `${result.status}: ${result.data.resText}`,
                      );
                    }
                    this.setState({isLoading: false});
                  })
                  .catch(err => {
                    AlertsModel.showAlert(
                      `Unable to reach server. Please contact admin!`,
                    );
                    this.setState({isLoading: true});
                  });
                this.setState({isLoading: true});
              }}>
              <View
                style={
                  rootStore._loginStore.mobileNumber &&
                  rootStore._loginStore.mobileNumber.length === 10
                    ? LoginStyle.button
                    : LoginStyle.disabledButton
                }>
                <Text style={{color: 'snow', fontSize: 15, fontWeight: '600'}}>
                  Continue 
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
