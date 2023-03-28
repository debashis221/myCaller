import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Image,
  Text,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Searchbar from './Modal/Searchbar';

const DATA2 = [
  {
    Id: 2,
    name: "Ruthramoorthi",
    img: "https://image.ibb.co/cA2oOb/alex_1.jpg",
    time: "10:00 AM",
    Chat: "website not working please clear"
  },
  {
    Id: 3,
    name: "Bob",
    img: "https://image.ibb.co/gSyTOb/bob_1.jpg",
    time: "12:30 AM",
    Chat: "Alright"
  },
  {
    Id: 4,
    name: "Luke",
    img: "https://image.ibb.co/jOzeUG/luke_1.jpg",
    time: "4:12 PM",
    Chat: "I will look into it"
  },
  {
    Id: 5,
    name: "Bane",
    img: "https://image.ibb.co/cBZPww/bane_1.jpg",
    time: "7:53 PM",
    Chat: "Exactly my point!"
  },
  {
    Id: 6,
    name: "Darth Vader",
    img: "https://image.ibb.co/j4Ov3b/darth_vader_1.png",
    time: "1:09 PM",
    Chat: "Not quite the same."
  },
  {
    Id: 7,
    name: "Zach",
    img: "https://image.ibb.co/b4kxGw/zach_1.jpg",
    time: "Yesterday",
    Chat: "I thought that the event was over long ago"
  },
  {
    Id: 8,
    name: "Katie",
    img: "https://image.ibb.co/eLVWbw/katie_1.jpg",
    time: "Yesterday",
    Chat: "nothing"
  },
  {
    Id: 9,
    name: "Chloe",
    img: "https://image.ibb.co/ncAa3b/chloe_1.jpg",
    time: "Wednesday",
    Chat: "sure i'll take it from you"
  },
  {
    Id: 10,
    name: "Kennith",
    img: "https://image.ibb.co/fQKPww/kennith_1.jpg",
    time: "Wednesday",
    Chat: "Take care, bye",

  },
  {
    Id: 11,
    name: "Tara",
    img: "https://image.ibb.co/dM6hib/tara_1.jpg",
    time: "Monday",
    Chat: "Not today"
  },
  {
    Id: 12,
    name: "Gary",
    img: "https://image.ibb.co/gsF8Ob/gary_1.jpg",
    time: "Sunday",
    Chat: "Whatever works for you!"
  },
  {
    Id: 13,
    name: "Zoey",
    img: "https://image.ibb.co/nd0Wbw/zoey_1.jpg",
    time: "8/12/2017",
    Chat: "Will get in touch"
  },
  {
    Id: 14,
    name: "Ash",
    img: "https://image.ibb.co/iasYpG/ash_1.jpg",
    time: "6/12/2017",
    Chat: "Ok"
  },
  {
    Id: 15,
    name: "Zen",
    img: "https://image.ibb.co/eeqWbw/zen_1.jpg",
    time: "19/11/2017",
    Chat: "Lol"
  }
];

export default function Chat() {
  const [showImg, setImg] = useState('');
const navigation = useNavigation()
  const userInfo = ({item}) => {
    navigation.navigate('UserChat', {name: item.name, image:item.img,chat:item.Chat});
  };

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          backgroundColor: 'white',
        }}
        onPress={() => {
          userInfo({item});
        }}>
        <View style={styles.mycard}>
          <TouchableOpacity
            onPress={() => {
            navigation.navigate('ViewDp',{image:item.img})
            }}
            style={{
              paddingHorizontal: 15,
              marginTop: '3%',
              alignItems: 'center',
            }}>
            <Image source={{uri:item.img}} style={styles.img} />
          </TouchableOpacity>
          <View
            style={{
              paddingBottom:10,
              borderBottomWidth: 0.2,
              width: '70%',
              justifyContent: 'space-between',
              marginRight: 10,
              flexDirection: 'row',
            }}>
            <View style={{marginVertical: 10,width:'70%'}}>
              <Text style={styles.Txt}>{item.name}</Text>
              <Text style={{fontSize: 14, opacity: 0.5,}}>{item.Chat}
              </Text>
            </View>

            <View style={{}}>
              <Text style={{opacity: 0.5}}>{item.time}</Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* <Image
                  // source={require('./ImageChat/mute.png')}
                  style={{
                    width: 18,
                    height: 18,
                    opacity: 0.3,
                    marginTop: '13%',
                    left: 30,
                  }}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            height: hp('6%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 2,
              justifyContent: 'space-between',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                width: '77%',
                marginLeft: '3%',
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Text style={{color: '#1b86bf', fontSize: 18, color: 'blue'}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                width: '10%',
                paddingVertical: 5,
              }}>
              <TouchableOpacity>
                <Image
                  style={{height: 25, width: 25, opacity: 0.6}}
                  source={require('./image/editing.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
<View style={{paddingHorizontal:10}}>
  <Text style={{fontWeight:'bold',color:'#000',fontSize:28}}>Chats</Text>
</View>
        <Searchbar />

        <View style={{}}>
          <FlatList
            data={DATA2}
            scrollEnabled={false}
            renderItem={({item}) => <RenderCard item={item} />}
            //  keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {width: 60, height: 60, borderRadius: 30, backgroundColor: 'green'},

  Txt: {
    fontWeight: '600',

    fontSize: 18,
  },
  mycard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
