import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  LogBox,
  Switch,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from '../HomeScreenPresenter';
import ContactStyle from '../../../stylesheet/ContactStyle';
import MoreStyle from '../../../stylesheet/MoreStyle';
import HomeStyle from '../../../stylesheet/HomeStyle';
import rootStore from '../../../stores/RootStore';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {ContactsConnector} from '../../../database/Connectors';
import {Contacts} from '../../../database/models';
import moment from 'moment';
import {AlertsModel} from '../../../components';
import Snackbar from 'react-native-snackbar';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  email: string;
  description: string;
};

@inject('homeStore')
@observer
export class ContactScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      description: '',
    };
  }

  renderHeader = isSearch => {
    return (
      <View style={ContactStyle.headerContainer}>
        <TouchableOpacity
          style={{width: '20%', marginLeft: isSearch ? '0%' : '5%'}}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon size={30} name={'arrow-left'} color={'mediumpurple'} />
        </TouchableOpacity>
        <Text
          style={
            isSearch ? ContactStyle.headerSaveText : ContactStyle.headerText
          }>
          IDENTIFIED BY MYCALLER
        </Text>
        {isSearch ? (
          <TouchableOpacity
            onPress={() => {
              let {item, isSearch} = this.props.route.params;
              let date = new Date(),
                contact = new Contacts(),
                contactsConnector = new ContactsConnector();

              date = moment(date).format('YYYY-MM-DD HH:mm:ss');
              contact.date = date;
              contact.number = `${item.number}`;
              contact.result = JSON.stringify(item);
              contact.name = item.name;
              contact.email = item.email;
              contact.profileIcon = item.profileIcon;
              contact.key = `${rootStore._loginStore.mobileNumber}~${item.number}~${item.countryCode}`;
              this.setState({isLoading: true});

              contactsConnector
                .saveContacts([contact])
                .then(() => {
                  this.setState({isLoading: false});
                   Snackbar.show({
                     text: `Contact Saved Successfully`,
                     duration: Snackbar.LENGTH_LONG,
                   });
                })
                .catch(err => {
                  AlertsModel.showAlert(`Failed to save Contact`);
                  this.setState({isLoading: false});
                });
            }}>
            <Text
              style={{fontSize: 16, fontWeight: '500', color: 'mediumpurple'}}>
              Save
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  renderIcon = item => {
    return (
      <View>
        <View style={ContactStyle.iconContainer}>
          {item.profileIcon ? (
            <Image
              source={{
                uri: `data:image/png;base64,${item.profileIcon}`,
              }}
              style={{height: 125, width: 125, borderRadius: 1000}}
              resizeMode="stretch"
            />
          ) : (
            <Text style={{fontSize: 35, fontWeight: '700', color:'gray'}}>{`${item.name
              .split(' ')[0]
              .charAt(0)}${
              item.name.split(' ').length === 1
                ? ''
                : item.name.split(' ').pop().charAt(0)
            }`}</Text>
          )}
        </View>
        <Text style={ContactStyle.iconText}>{item.name}</Text>
      </View>
    );
  };

  renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 10,
        }}>
        <View>
          <TouchableOpacity
            onPress={() => {
              debugger;
            }}
            style={ContactStyle.buttonContainer}>
            <MaterialCommunityIcons
              name={'phone-outline'}
              size={20}
              color={'mediumpurple'}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <Text style={ContactStyle.buttonText}>Call</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              debugger;
            }}
            style={ContactStyle.buttonContainer}>
            <AntDesign
              name={'message1'}
              size={20}
              color={'mediumpurple'}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <Text style={ContactStyle.buttonText}>Message</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              debugger;
            }}
            style={ContactStyle.buttonContainer}>
            <MaterialCommunityIcons
              name={'block-helper'}
              size={20}
              color={'mediumpurple'}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <Text style={ContactStyle.buttonText}>Block</Text>
        </View>
      </View>
    );
  };

  renderDetails = item => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={ContactStyle.detailContainer}>
          <Text style={ContactStyle.carrierDetails}>{`Mobile`}</Text>
          <Text style={ContactStyle.mobilenumber}>{`${item.number}`}</Text>
        </View>
        <View style={ContactStyle.detailContainer}>
          <Text style={ContactStyle.carrierDetails}>Email</Text>
          <Text style={ContactStyle.mobilenumber}>{`${item.email}`}</Text>
        </View>
      </View>
    );
  };

  renderBody = item => {
    return (
      <ScrollView style={{flex: 1, width: '100%'}}>
        {this.renderIcon(item)}
        {this.renderButtons(item)}
        {this.renderDetails(item)}
      </ScrollView>
    );
  };

  render() {
    let {item, isSearch} = this.props.route.params;
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        <Overlay
          fullScreen={false}
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
          isVisible={this.state.isLoading}
          overlayStyle={ContactStyle.loading}
          backdropStyle={{opacity: 0.1, backgroundColor: 'black'}}>
          <Text style={ContactStyle.loadingText}>{'Saving Data.. '}</Text>
          <ActivityIndicator
            style={{marginTop: 10}}
            size="large"
            color="white"
          />
        </Overlay>
        {this.renderHeader(isSearch)}
        {this.renderBody(item)}
      </SafeAreaView>
    );
  }
}
export default ContactScreen;
