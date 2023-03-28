import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  LogBox,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import HomeScreenPresenter from './HomeScreenPresenter';
import HomeStyle from '../../stylesheet/HomeStyle';
import rootStore from '../../stores/RootStore';
import Icon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import {ScrollView, FlatList} from 'react-native-gesture-handler';

interface Props {
  navigation: any;
}

type MyState = {
  isLoading: boolean;
};

@inject('homeStore')
@observer
export class PremiumScreen extends Component<Props, MyState> {
  presenter = new HomeScreenPresenter(this.props.navigation);

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }
  render(){
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
            <Text>Premium Screen</Text>
        </View>
    )
  }
}
export default PremiumScreen