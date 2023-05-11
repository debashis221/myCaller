import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  LogBox,
  PermissionsAndroid,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from './HomeScreenPresenter';
import {ContactsConnector} from '../../database/Connectors';
import {Contacts} from '../../database/models';
import LoginStyle from '../../stylesheet/LoginStyle';
import ContactStyle from '../../stylesheet/ContactStyle';
import SearchStyle from '../../stylesheet/SearchStyle';
import rootStore from '../../stores/RootStore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OctIcons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from 'react-native-simple-bottom-sheet';
import {Overlay} from 'react-native-elements';
import {RestClient, Utils} from '../../services';
import {AlertsModel} from '../../components';
import messaging from '@react-native-firebase/messaging';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  isOpen: boolean;
  searchValue: string;
  listData: any;
  FCMToken:String;
};

const windowHeight = Dimensions.get('window').height;

let MY_CALLER_IMAGE = require('../../resources/MyCaller.png');
let GLOBE_IMAGE = require('../../resources/globe.png');

@inject('homeStore')
@observer
export class SearchScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {

  

    super(props);

    this.state = {
      isLoading: true,
      isOpen: false,
      searchValue: '',
      listData: [],
      FCMToken:'',
    };
    if(this.requestUserPermission()){
      messaging()
      .getToken()
      .then( async(fcmToken)=>{
         console.log('FCM TOKEN ..........login ui .....', fcmToken);
         this.setState({FCMToken:fcmToken});

         let payload = {
          os: Platform.OS,
          deviceId: rootStore._loginStore['uuid'],
          deviceName: rootStore._loginStore['deviceName'],
          versionCode: '1',
          code: 'react',
          mobile: rootStore._loginStore.mobileNumber,
          countryCode: rootStore._loginStore.countryCodeValue.code,
          fcmToken: this.state.FCMToken
        };
        console.log('pay load .....',payload);
        

        let encryptedData = await Utils.mapWrapper(payload);
        // console.log('Login data ' + encryptedData);

        RestClient.connectServer(
          rootStore._loginStore.urlData.login,
          encryptedData,
        )
          .then(result => {
    
            
          })
          .catch(err => {
           
       
          });
    
      
      });
    }
    else{
      console.log('Not Authorization status :',authStatus);
      
    }
  
  
  
  }

   


    async  requestUserPermission  () {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status false:', authStatus);
  
      return(  
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
    
      );
    };



  renderHeader = () => {
    return (
      <View style={SearchStyle.headerContainer}>
        <Image style={SearchStyle.appName} source={MY_CALLER_IMAGE} />
        <Image style={SearchStyle.headerIcon} source={GLOBE_IMAGE} />
      </View>
    );
  };

  renderBody = () => {
    let firstname, lastname;
    if (rootStore._homeStore.profileData) {
      firstname = rootStore._homeStore.profileData.name.split(' ')[0];
      lastname = rootStore._homeStore.profileData.name.split(' ').pop();
    }
    return (
      <View style={SearchStyle.bodyContainer}>
        <Text style={SearchStyle.bodyHeading}>Welcome,</Text>
        {rootStore._homeStore.profileData ? (
          <Text
            style={
              SearchStyle.bodySubHeading
            }>{`${firstname} ${lastname}`}</Text>
        ) : null}
      </View>
    );
  };

  renderSearchBox = () => {
    return (
      <View style={SearchStyle.searchBoxContainer}>
        <View style={SearchStyle.searchBoxLayout}>
          <OctIcons
            name="search"
            size={20}
            color="gray"
            style={{marginLeft: 10, alignSelf: 'center'}}
          />
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              this.props.navigation.navigate('ContactSearch');
            }}>
            <Text style={[SearchStyle.searchBoxInput, {color: 'gray'}]}>
              {'Search any number'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderBottomSheet = () => {
    let data = this.state.listData;
    return (
      <BottomSheet
        isOpen
        sliderMaxHeight={windowHeight * 0.75}
        sliderMinHeight={50}>
        {onScrollEndDrag => (
          <View>
            <View style={SearchStyle.bottonmSheetHeaderContainer}>
              <Text style={SearchStyle.bottonSheetHeaderText}>Recents</Text>
              <TouchableOpacity
                onPress={() => {
                  debugger;
                }}>
                <AntDesign name={'closecircle'} size={20} color={'gray'} />
              </TouchableOpacity>
            </View>
            <ScrollView
              onScrollEndDrag={onScrollEndDrag}
              style={{marginTop: 15}}>
              {data.map((item, index) => (
                <View key={`${index}`} style={SearchStyle.listItemContainer}>
                  <View style={SearchStyle.listProfileIcon}>
                    {item.profileIcon ? (
                      <Image
                        source={{
                          uri: `data:image/png;base64,${item.profileIcon}`,
                        }}
                        style={{height: 53, width: 53, borderRadius: 1000}}
                        resizeMode="stretch"
                      />
                    ) : (
                      <Text
                        style={{fontSize: 14, fontWeight: '600'}}>{`${item.name
                        .split(' ')[0]
                        .charAt(0)}${
                        item.name.split(' ').length === 1
                          ? ''
                          : item.name.split(' ').pop().charAt(0)
                      }`}</Text>
                    )}
                  </View>
                  <View style={SearchStyle.listContactContainer}>
                    <Text
                      style={{fontSize: 16, fontWeight: '600', color: 'gray'}}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        marginTop: 5,
                        color: 'gray',
                      }}>
                      {item.number}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() => {
                      this.props.navigation.navigate('Contact', {item});
                    }}>
                    <Icon
                      name="navigate-next"
                      size={30}
                      color="lightgray"
                      style={SearchStyle.listNavigation}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </BottomSheet>
    );
  };

  fetchData = () => {
    let contactsConnector = new ContactsConnector();
    let filter = `key CONTAINS '${rootStore._loginStore.mobileNumber}' AND number != null `;

    this.setState({isLoading: true});
    contactsConnector
      .fetchContacts(filter)
      .then(results => {
        this.setState({listData: results, isLoading: false});
      })
      .catch(err => {
        this.setState({isLoading: false});
        AlertsModel.showAlert(`Failed to fetch data`);
      });
  };

  componentDidMount() {
    this.props.navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });

    let payload = {
      os: Platform.OS,
      deviceId: rootStore._loginStore['uuid'],
      deviceName: rootStore._loginStore['deviceName'],
      versionCode: '1',
      code: 'react',
      token: rootStore._loginStore.token,
      countryCode: rootStore._loginStore.countryCodeValue.code,
      mobile: rootStore._loginStore.mobileNumber,
    };

    Utils.mapWrapper(payload).then(encryptedData => {
      RestClient.connectServer(
        rootStore._loginStore.urlData.profile,
        encryptedData,
      )
        .then(async result => {
          if (result.status === 200) {
            debugger;
            let data = JSON.parse(result.data);
            if (data.status === 'FAILED') {
              AlertsModel.showAlert(`${data.status}: ${data.resText}`);
            } else if (data.status === 'SUCCESS') {
              debugger;
              rootStore._homeStore.profileData = data.profileData;
            }
          } else {
            AlertsModel.showAlert(
              `${result.status}: ${JSON.parse(result.data.resText)}`,
            );
          }
          this.fetchData();
          this.props.navigation.addListener('focus', () => {
            this.fetchData();
          });
        })
        .catch(err => {
          this.setState({isLoading: false});
          AlertsModel.showAlert('Failed to Fetch Profile. Please try again ');
        });
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Overlay
          fullScreen={false}
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
          isVisible={this.state.isLoading}
          overlayStyle={ContactStyle.loading}
          backdropStyle={{opacity: 0.1, backgroundColor: 'black'}}>
          <Text style={ContactStyle.loadingText}>
            {'Hold On Pulling Data.. '}
          </Text>
          <ActivityIndicator
            style={{marginTop: 10}}
            size="large"
            color="white"
          />
        </Overlay>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderSearchBox()}
        {this.state.isLoading ? null : this.renderBottomSheet()}
      </View>
    );
  }
}
export default SearchScreen;
