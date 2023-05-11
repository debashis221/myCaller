import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  Keyboard,
  LogBox,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreenPresenter from './HomeScreenPresenter';
import MoreStyle from '../../stylesheet/MoreStyle';
import HomeStyle from '../../stylesheet/HomeStyle';
import ContactStyle from '../../stylesheet/ContactStyle';
import rootStore from '../../stores/RootStore';
import Icon from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import Utils from '../../services/Utils';
import {ContactsConnector} from '../../database/Connectors';
import {Overlay} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import {StackActions} from '@react-navigation/native';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
};

const windowWidth = Dimensions.get('window').width;

@inject('homeStore')
@observer
export class MoreScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  _keyExtractor = (item, index) => index;

  renderItem(item, index) {
    return (
      <TouchableOpacity
        onPress={() => {
          item.type = item.activity;
          Utils.openActivity(item, this);
        }}
        style={MoreStyle.rowContainer}>
        <Image style={MoreStyle.rowImage} source={{uri: item.iconData.url}} />
        <Text style={MoreStyle.rowText}>{item.title}</Text>
        <Icon
          name="chevron-thin-right"
          size={15}
          color="gray"
          style={{marginRight: 5}}
        />
      </TouchableOpacity>
    );
  }

  renderCard(item) {
    return (
      <View style={{width: '100%', marginTop: 20}}>
        <Text style={HomeStyle.heading}>{item.title}</Text>
        <View style={[MoreStyle.card, {height: 60 * item.dataList.length}]}>
          {item.dataList.map((child, index) => {
            let component = this.renderItem(child, index);
            return (
              <View>
                {component}
                {index === item.dataList.length - 1 ? null : (
                  <View style={MoreStyle.divider} />
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  renderOptions = () => {
    let moreData = rootStore._homeStore.moreData;
    return (
      <ScrollView style={{flex: 1, width: '90%'}}>
        {moreData.map((item, index) => {
          return this.renderCard(item);
        })}
      </ScrollView>
    );
  };

  renderProfile = () => {
    let firstname, lastname;
    if (rootStore._homeStore.profileData) {
      firstname = rootStore._homeStore.profileData.name.split(' ')[0];
      lastname = rootStore._homeStore.profileData.name.split(' ').pop();
    }

    console.log(firstname,'dodjdjd fires name   ');
    
    return (
      <View
        style={{
          flex: 0.2,
          width: '90%',
          marginTop: 20,
        }}>
        <Text style={HomeStyle.heading}>Profile</Text>
        <View style={{flexDirection: 'row'}}>
          {rootStore._homeStore.profileData &&
          rootStore._homeStore.profileData.profilePic ? (
            <Image
              source={{
                uri: `data:image/png;base64,${rootStore._homeStore.profileData.profilePic}`,
              }}
              style={{height: 53, width: 53, borderRadius: 1000}}
              resizeMode="stretch"
            />
          ) : (
            <View style={HomeStyle.profileIcon}>
              <Text style={HomeStyle.profileIconName}>
                {`${firstname}${lastname}`}
              </Text>
            </View>
          )}
          <View style={HomeStyle.profileName}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'gray',
              }}>{`${firstname} ${lastname}`}</Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 2,
                fontWeight: '400',
                color: 'gray',
              }}>{`${rootStore._loginStore.mobileNumber}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('EditProfile');
            }}
            style={HomeStyle.profileEdit}>
            <Text style={{textAlign: 'center', color: 'snow'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  signout = async () => {
    this.setState({isLoading: true});
    let contactsConnector = new ContactsConnector();
    let filter = `key CONTAINS '${rootStore._loginStore.mobileNumber}' AND number != null `;
    debugger
    contactsConnector
      .deleteContacts(filter)
      .then(() => {
        debugger
        AsyncStorage.setItem('loginData', JSON.stringify({isLogin: true}))
          .then(() => {
            this.setState({isLoading: false});
            rootStore._loginStore.reset();
            rootStore._homeStore.reset();
            this.props.navigation.navigate('Logout');
          })
          .catch(err => {
            this.setState({isLoading: false});
            Snackbar.show({
              text: `Failed to Logout`,
              duration: Snackbar.LENGTH_LONG,
            });
          });
      })
      .catch(err => {
        this.setState({isLoading: false});
        Snackbar.show({
          text: `Failed to Logout`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  renderSignout = () => {
    return (
      <TouchableOpacity style={HomeStyle.logout} onPress={this.signout}>
        <Text style={HomeStyle.logoutText}>Log out</Text>
      </TouchableOpacity>
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
            {'Logging Off Please Wait..'}
          </Text>
          <ActivityIndicator
            style={{marginTop: 10}}
            size="large"
            color="white"
          />
        </Overlay>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={MoreStyle.heading}>More</Text>
          {this.renderProfile()}
          {this.renderOptions()}
          {this.renderSignout()}
        </View>
      </SafeAreaView>
    );
  }
}
export default MoreScreen;
