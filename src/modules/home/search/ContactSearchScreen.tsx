import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  LogBox,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from '../HomeScreenPresenter';
import SearchStyle from '../../../stylesheet/SearchStyle';
import ContactSearchStyle from '../../../stylesheet/ContactSearchStyle';
import rootStore from '../../../stores/RootStore';
import OctIcon from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {RestClient, Utils} from '../../../services';
import {AlertsModel} from '../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  searchValue: string;
  listData: any;
};

const windowHeight = Dimensions.get('window').height;

@inject('homeStore')
@observer
export class ContactSearchScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      searchValue: '',
      listData: [],
    };
  }
  renderHeader = () => {
    return (
      <View style={ContactSearchStyle.headerContainer}>
        <View style={ContactSearchStyle.searchContainer}>
          <OctIcon
            name="search"
            size={20}
            color="gray"
            style={{marginLeft: 10, alignSelf: 'center'}}
          />
          <TextInput
            value={this.state.searchValue}
            onChangeText={async value => {
              Keyboard.dismiss;
              let payload = {
                os: Platform.OS,
                deviceId: rootStore._loginStore['uuid'],
                deviceName: rootStore._loginStore['deviceName'],
                versionCode: '1',
                code: 'react',
                mobile: rootStore._loginStore.mobileNumber,
                otp: rootStore._loginStore.otp,
                countryCode: rootStore._loginStore.countryCodeValue.code,
                searchNumber: value,
                token: rootStore._loginStore.token,
              };

              let encryptedData = await Utils.mapWrapper(payload);
              console.log('Login data ' + encryptedData);
              debugger;
              RestClient.connectServer(
                rootStore._loginStore.urlData.searchNumber,
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
                      this.setState({
                        listData: data.searchData,
                        searchValue: value,
                      });
                    }
                  } else {
                    AlertsModel.showAlert(
                      `${result.status}: ${JSON.parse(result.data.resText)}`,
                    );
                  }
                })
                .catch(err => {
                  AlertsModel.showAlert(
                    'Failed to search phone number. Please try again ',
                  );
                });
            }}
            placeholder="Search any number"
            placeholderTextColor={'gray'}
            style={{fontSize: 16, fontWeight: '500', marginLeft: '2%', width: '100%', color: 'gray'}}
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            maxLength={10}
          />
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center', marginLeft: '2%'}}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Text style={{color: 'mediumpurple', fontSize: 16, fontWeight: '500'}}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderBody = () => {
    return (
      <View style={{flex: 0.9, width: '95%', justifyContent: 'center'}}>
        {this.state.listData.length === 0 ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              alignSelf: 'center',
              marginLeft: 10,
              marginRight: 10,
              color: 'gray',
            }}>
            Oops!! Looks like there is no data
          </Text>
        ) : (
          <ScrollView style={{marginTop: 15, flex: 1}}>
            {this.state.listData.map((item, index) => (
              <View key={`${index}`} style={SearchStyle.listItemContainer}>
                <View style={SearchStyle.listProfileIcon}>
                  {item.profileIcon ? (
                    <Image
                      source={{
                        uri: `data:image/png;base64,${item.profileIcon}`,
                      }}
                      style={{height: 55, width: 55, borderRadius: 1000}}
                      resizeMode="stretch"
                    />
                  ) : (
                    <Text
                      style={{fontSize: 14, fontWeight: '600', color:'gray'}}>{`${item.name
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
                style={{justifyContent: "center"}}
                  onPress={() => {
                    this.props.navigation.navigate('Contact', {
                      item,
                      isSearch: true,
                    });
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
        )}
      </View>
    );
  };

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column'}}>
          {this.renderHeader()}
          {this.renderBody()}
        </View>
      </SafeAreaView>
    );
  }
}
export default ContactSearchScreen;
