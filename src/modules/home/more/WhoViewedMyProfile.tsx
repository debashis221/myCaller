import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  LogBox,
  Switch
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from '../HomeScreenPresenter';
import MoreStyle from '../../../stylesheet/MoreStyle';
import HomeStyle from '../../../stylesheet/HomeStyle';
import rootStore from '../../../stores/RootStore';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
  isEnabled: boolean;
};

@inject('homeStore')
@observer
export class WhoViewedMyProfileScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      isEnabled: false
    };
  }

  renderHeader = () => {
    return (
      <View
        style={{
          height: 60,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{width: '20%', marginLeft: '5%'}}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon size={30} name={'arrow-left'} color={'dodgerblue'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'left',
            width: '80%',
          }}>
          Who viewed my profile
        </Text>
      </View>
    )
  }

  toggleSwitch = (value) => {
    this.setState({isEnabled :value})
  }

  renderScreen = () => {
    return (
      <View
        style={{
          height: 60,
          width: '95%',
          borderWidth: 1,
          borderColor: 'lightgray',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name={'incognito'}
          color="mediumpurple"
          size={30}
          style={{width: '10%', marginLeft: '2%'}}
        />
        <View style={{width: '65%', marginLeft: '5%'}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
            }}>
            Incognito mode
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '300',
            }}>
            View profiles privately
          </Text>
        </View>
          <Switch
            trackColor={{false: 'lightgray', true: '#E0EBF9'}}
            thumbColor={this.state.isEnabled ? 'dodgerblue' : '#f4f3f4'}
            ios_backgroundColor="lightgray"
            onValueChange={this.toggleSwitch}
            value={this.state.isEnabled}
          />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems:'center'}}>
        {this.renderHeader()}
        {this.renderScreen()}
        <Text style={{marginTop:10, fontSize: 10, fontWeight:"200", width:"95%", textAlign:"left"}}>If enabled, Other's won't get alerted when you've viewed their profile. You will always know when they view yours.</Text>
      </SafeAreaView>
    );
  }
}
export default WhoViewedMyProfileScreen;
