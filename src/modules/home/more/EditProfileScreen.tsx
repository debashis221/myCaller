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
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from '../HomeScreenPresenter';
import LoginStyle from '../../../stylesheet/LoginStyle';
import ContactStyle from '../../../stylesheet/ContactStyle';
import rootStore from '../../../stores/RootStore';
import Icon from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {RestClient, Utils} from '../../../services';
import {AlertsModel} from '../../../components';
import Snackbar from 'react-native-snackbar';
import {launchImageLibrary} from 'react-native-image-picker';
import {RadioButton} from '../../../components';
import {NavigationStackRouterConfig} from 'react-navigation';
import DatePicker from 'react-native-modern-datepicker';
import Modal from 'react-native-modal';
import {Overlay} from 'react-native-elements';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  dob: string;
  gender: string;
  about: string;
  imageType: string;
  isModalVisible: boolean;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

@inject('homeStore')
@observer
export class EditProfileScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      firstname:
        rootStore._homeStore.profileData &&
        rootStore._homeStore.profileData.name.split(' ')[0],
      lastname:
        rootStore._homeStore.profileData &&
        rootStore._homeStore.profileData.name.split(' ').pop(),
      email:
        rootStore._homeStore.profileData &&
        rootStore._homeStore.profileData.email,
      image:
        rootStore._homeStore.profileData &&
        rootStore._homeStore.profileData.profilePic,
      dob:
        rootStore._homeStore.profileData &&
        rootStore._homeStore.profileData.dob,
      gender:
        rootStore._homeStore.profileData &&
        rootStore._homeStore.profileData.gender,
      about:
        rootStore._homeStore.profileData &&
        rootStore._homeStore.profileData.about,
      imageType: '',
      isModalVisible: false,
    };
  }

  renderImagePicker = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'flex-start',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary({
              mediaType: 'photo',
              maxWidth: 40,
              maxHeight: 40,
              quality: 0.6,
              includeBase64: true,
              presentationStyle: 'popover',
            })
              .then(result => {
                if (result.assets)
                  this.setState({
                    image: result.assets[0].base64,
                    imageType: result.assets[0].type,
                  });
              })
              .catch(err => {
                debugger;
              });
          }}
          style={{
            height: 60,
            width: 60,
            borderRadius: 1000,
            backgroundColor: 'mediumpurple',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '2.5%',
          }}>
          {this.state.image ? (
            <Image
              source={{
                uri: `data:${this.state.imageType};base64,${this.state.image}`,
              }}
              style={{height: 60, width: 60, borderRadius: 1000}}
              resizeMode="stretch"
            />
          ) : (
            <SimpleLineIcons
              name={'social-instagram'}
              size={30}
              color={'snow'}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 10,
            color: 'gray',
          }}>
          Add a profile picture
        </Text>
      </View>
    );
  };

  renderBody = () => {
    return (
      <ScrollView
        style={{width: '100%'}}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={LoginStyle.phoneNumberContainer}>
          <Text style={LoginStyle.label}>First Name</Text>
          <View style={LoginStyle.textViewContainer}>
            <TextInput
              style={{
                marginLeft: 10,
                textAlign: 'left',
                fontWeight: '600',
                color: 'gray',
              }}
              returnKeyLabel="Done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss;
              }}
              onChangeText={text => {
                this.setState({firstname: text});
              }}
              value={this.state.firstname}
              placeholderTextColor="lightgray"
              placeholder="please enter your first name"
            />
          </View>
        </View>
        <View style={LoginStyle.phoneNumberContainer}>
          <Text style={LoginStyle.label}>Last Name</Text>
          <View style={LoginStyle.textViewContainer}>
            <TextInput
              style={{
                marginLeft: 10,
                textAlign: 'left',
                fontWeight: '600',
                color: 'gray',
              }}
              returnKeyLabel="Done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss;
              }}
              onChangeText={text => {
                this.setState({lastname: text});
              }}
              value={this.state.lastname}
              placeholderTextColor="lightgray"
              placeholder="please enter your last name"
            />
          </View>
        </View>
        <View style={LoginStyle.phoneNumberContainer}>
          <Text style={LoginStyle.label}>Email</Text>
          <View style={LoginStyle.textViewContainer}>
            <TextInput
              style={{
                marginLeft: 10,
                textAlign: 'left',
                fontWeight: '600',
                color: 'gray',
              }}
              returnKeyLabel="Done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss;
              }}
              onChangeText={text => {
                this.setState({email: text});
              }}
              value={this.state.email}
              placeholderTextColor="lightgray"
              placeholder="please enter your email"
            />
          </View>
        </View>
        <View style={LoginStyle.phoneNumberContainer}>
          <Text style={LoginStyle.label}>About</Text>
          <View
            style={[
              LoginStyle.textViewContainer,
              {height: 100, justifyContent: 'flex-start'},
            ]}>
            <TextInput
              style={{
                marginLeft: 10,
                textAlign: 'left',
                fontWeight: '600',
                color: 'gray',
              }}
              multiline
              numberOfLines={4}
              returnKeyLabel="Done"
              returnKeyType="done"
              maxLength={100}
              onSubmitEditing={() => {
                Keyboard.dismiss;
              }}
              onChangeText={text => {
                this.setState({about: text});
              }}
              value={this.state.about}
              placeholderTextColor="lightgray"
              placeholder="Short description about yourself"
            />
          </View>
        </View>
        <View style={LoginStyle.phoneNumberContainer}>
          <Text style={LoginStyle.label}>Date Of Birth</Text>
          <TouchableOpacity
            style={LoginStyle.textViewContainer}
            onPress={() => {
              this.setState({isModalVisible: !this.state.isModalVisible});
            }}>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                fontWeight: '600',
                color: 'gray',
              }}>
              {this.state.dob}
            </Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => {
              this.setState({isModalVisible: false});
            }}
            deviceWidth={Dimensions.get('window').width}
            deviceHeight={Dimensions.get('window').height}>
            <DatePicker
              mode="monthYearDate"
              selectorStartingYear={1900}
              onDateChange={selectedDate => {
                debugger;
                this.setState({
                  dob: selectedDate.replace(/\//g, '-'),
                  isModalVisible: false,
                });
              }}
            />
          </Modal>
        </View>
        <View style={LoginStyle.phoneNumberContainer}>
          {/* <Text style={LoginStyle.label}>Gender</Text> */}
          <View
            style={[
              LoginStyle.textViewContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderWidth: 0,
              },
            ]}>
            <RadioButton
              label="Male"
              status={this.state.gender === 'M' ? true : false}
              onPress={() => this.setState({gender: 'M'})}
            />
            <RadioButton
              label="Female"
              status={this.state.gender === 'F' ? true : false}
              onPress={() => this.setState({gender: 'F'})}
            />
            <RadioButton
              label="Others"
              status={this.state.gender === 'T' ? true : false}
              onPress={() => this.setState({gender: 'T'})}
            />
          </View>
        </View>
      </ScrollView>
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
            {'Updating Profile Please Wait!!'}
          </Text>
          <ActivityIndicator
            style={{marginTop: 10}}
            size="large"
            color="white"
          />
        </Overlay>
        <View style={LoginStyle.container}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={LoginStyle.heading}>Edit Profile</Text>
            <Text style={LoginStyle.subHeading}>
              Your name and profile picture will be used for caller ID and
              profile details
            </Text>
            {this.renderImagePicker()}
            {this.renderBody()}
          </View>
          <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              disabled={
                this.state.firstname.length > 0 &&
                this.state.lastname.length > 0 &&
                this.state.email.length > 0
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
                  token: rootStore._loginStore.token,
                  countryCode: rootStore._loginStore.countryCodeValue.code,
                  customerName: `${this.state.firstname} ${this.state.lastname}`,
                  mobile: rootStore._loginStore.mobileNumber,
                  email: `${this.state.email}`,
                  profilePic: this.state.image,
                  dob: this.state.dob,
                  gender: this.state.gender,
                  about: this.state.about,
                };

                let encryptedData = await Utils.mapWrapper(payload);
                console.log('Login data ' + encryptedData);

                RestClient.connectServer(
                  rootStore._loginStore.urlData.editProfile,
                  encryptedData,
                )
                  .then(async result => {
                    if (result.status === 200) {
                      debugger;
                      let data = JSON.parse(result.data);
                      if (data.status === 'FAILED') {
                        AlertsModel.showAlert(
                          `${data.status}: ${data.resText}`,
                        );
                      } else if (data.status === 'SUCCESS') {
                        this.props.navigation.goBack();
                        Snackbar.show({
                          text: `${data.resText}`,
                          duration: Snackbar.LENGTH_LONG,
                        });
                      }
                    } else {
                      AlertsModel.showAlert(
                        `${result.status}: ${JSON.parse(result.data.resText)}`,
                      );
                    }
                    this.setState({isLoading: false});
                  })
                  .catch(err => {
                    AlertsModel.showAlert(
                      'Failed to Create Profile. Please try again ',
                    );
                    this.setState({isLoading: false});
                  });

                this.setState({isLoading: true});
              }}>
              <View
                style={
                  this.state.firstname.length > 0 &&
                  this.state.lastname.length > 0 &&
                  this.state.email.length > 0
                    ? LoginStyle.button
                    : LoginStyle.disabledButton
                }>
                <Text style={{color: 'snow', fontSize: 15, fontWeight: '600'}}>
                  Update
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default EditProfileScreen;
