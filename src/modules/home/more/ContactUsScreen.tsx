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
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from '../HomeScreenPresenter';
import LoginStyle from '../../../stylesheet/LoginStyle';
import MoreStyle from '../../../stylesheet/MoreStyle';
import HomeStyle from '../../../stylesheet/HomeStyle';
import rootStore from '../../../stores/RootStore';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean,
  email:string,
  description: string
};

@inject('homeStore')
@observer
export class ContactUsScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      email:"",
      description:""
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
          style={{width: '20%'}}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Icon size={30} name={'arrow-left'} color={'mediumpurple'} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'center',
            width: '60%',
          }}>
          Contact us
        </Text>
        <TouchableOpacity
          style={{width: '20%'}}
          onPress={() => {
            
          }}>
          <Text style={{fontWeight: '400', fontSize: 18,textAlign:'right', marginRight:'5%', color:'mediumpurple'}}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderBody = () => {
       return (
         <View style={{width: '100%', flex: 1}}>
           <View style={LoginStyle.phoneNumberContainer}>
             <Text style={LoginStyle.label}>Email</Text>
             <View style={LoginStyle.textViewContainer}>
               <TextInput
                 style={{marginLeft: 10, textAlign: 'left', fontWeight: '600'}}
                 returnKeyLabel="Done"
                 returnKeyType="done"
                 onSubmitEditing={() => {
                   Keyboard.dismiss;
                 }}
                 onChangeText={text => {
                   this.setState({email: text});
                 }}
                 value={this.state.email}
                 placeholder="Add Email"
               />
             </View>
           </View>
           <View style={LoginStyle.phoneNumberContainer}>
             <Text style={LoginStyle.label}>
               Description (minimum 20 charectors)
             </Text>
             <View style={HomeStyle.contactDescription}>
               <TextInput
                 style={{marginLeft: 10, textAlign: 'left', fontWeight: '600'}}
                 returnKeyLabel="Done"
                 returnKeyType="done"
                 onSubmitEditing={() => {
                   Keyboard.dismiss;
                 }}
                 onChangeText={text => {
                   this.setState({email: text});
                 }}
                 value={this.state.email}
                 multiline
               />
             </View>
           </View>
         </View>
       ); 
  }

  renderItem(item, index) {
    return (
      <TouchableOpacity
        onPress={() => {
          item.type = item.activity;
          Utils.openActivity(item, this);
        }}
        style={MoreStyle.rowContainer}>
        <Text
          style={[MoreStyle.rowText, {marginLeft: '5%', color: 'mediumpurple'}]}>
          {item.title}
        </Text>
        <Entypo
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
      <View style={{width: '92%', marginTop: 30,marginLeft:15 }}>
        <Text style={HomeStyle.heading}>{item.title}</Text>
        <View style={[MoreStyle.card, {height: 60 * item.dataList.length}]}>
          {item.dataList.map((child, index) => {
            let component = this.renderItem(child, index);
            return (
              <View>
                {component}
                {index === item.dataList.length - 1 ? null : (
                  <View
                    style={MoreStyle.divider}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  renderQuestions = () => {
    let data = rootStore._homeStore.commonQuestion
        return (
          <ScrollView style={{flex: 1}}>
            {data.map((item, index) => {
              return this.renderCard(item);
            })}
          </ScrollView>
        );
  }


  renderScreen = () => {
    return (
        <View style={{flex: 1, width:'100%'}}>
            {this.renderBody()}
            {this.renderQuestions()}
        </View>
    )
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        {this.renderHeader()}
        {this.renderScreen()}
      </SafeAreaView>
    );
  }
}
export default ContactUsScreen;
