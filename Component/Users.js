import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  PermissionsAndroid,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import rootStore from '../src/stores/RootStore';
import {RestClient, UrlClient, Utils, Encryption} from '../src/services';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Searchbar from './Modal/Searchbar';

import Contacts, { getContactById } from 'react-native-contacts';

var SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase({name: 'user.db', createFromLocation: 1});

export const GetApi = async () => {
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
      rootStore._loginStore.urlData.chat_operations,
      encryptedData,
    ).then(async result => {
      let data = JSON.parse(result.data);
      SetDatainChat(data);
      console.log('............API DATA .......', data);

      if (data.status === 'SUCCESS') {
        console.log('DATA fetching  SUCCESS ');
      } else {
        console.log('DATA fetching  FAILD ');
      }
    });
  });
};

export const SetDatainChat = async data => {
  console.log('.........................insert chat...............');
  data.operatoinData.map(item => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO Chat(id,fromCountryCode,fromUser,toCountryCode,toUser,message,messageType,CreateDate ) VALUES (?,?,?,?,?,?,?,?)',
        [
          item.id,
          item.fromCountryCode,
          item.fromUser,
          item.toCountryCode,
          item.toUser,
          item.message,
          item.messageType,
          item.date,
        ],
        (tx, res) => {
          if (res.rowsAffected > 0) {
            console.log('.....user  data inse ..');
          }
        },
        er => {
          console.log('errross.....user screen ..', er);
        },
      );
    });
  });
};

export default function User() {
  const [SeachData, setSearchData] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [showDp, setshowDp] = useState(false);
  const [contacts, setContacts] = useState([]);
  const isFocuse = useIsFocused();
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      GetContacts();
    }, 13000);
  }, [isFocuse]);

  useEffect(() => {
    requestContactPermission();
    setTimeout(() => {
      InsertContactInTable();
    }, 8000);
  }, []);

  const getdata = async () => {
    await GetApi();
  };
  async function requestContactPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'MyApp needs access to your contacts',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getContact()
      } else {
        getContact()
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

 const getContact =()=>{
  Contacts.getAll().then(async contacts => {
    setContacts(contacts);
    InsertContactInTable();
  });
  }

  const InsertContactInTable = async () => {
    console.log(contacts);

    for (let i = 0; i < contacts.length; i++) {
      const date = new Date();
      let rtime = date.toLocaleTimeString();
      let fromCountryCode = 91;
      let unreadSms = '';
      let Name = contacts[i].displayName;

      await db.transaction(async txn => {
        txn.executeSql(
          'INSERT INTO Contacts(countryCode,mobileNumber,contactName,unreadSms,lastUpdated,profileIcon,rtime,CreateDate ) VALUES (?,?,?,?,?,?,?,?)',
          //' DELETE FROM Contacts WHERE countryCode = 91 ',
          [
            fromCountryCode,
            contacts[i].phoneNumbers[0].number.replace(/[^a-zA-Z0-9]/g, ''),
            Name,
            unreadSms,
            rtime,
            contacts[i].thumbnailPath,
            rtime,
            date,
          ],
          (tx, res) => {
            if (res.rowsAffected > 0) {
            }
          },
          er => {
            console.log('errross.....user screen ..');
          },
        );
      });
    }

    GetContacts()
  };

  const [User, setUser] = useState([]);
  const navigation = useNavigation();

  const userInfo = ({item}) => {
    navigation.navigate('UserChat', {
      name: item.contactName,
      image: item.profileIcon,
      unread: item.unreadSms,
      Touser: item.mobileNumber,
      ToConCode: item.countryCode,
    });
  };

  const searchList = data => {
    setSearchData(data);
  };

  const GetContacts = () => {
    setLoding(true);

    db.transaction(tx => {
      tx.executeSql(
        'select * from Contacts ORDER BY contactName  ASC',
        [],
        (tx, results) => {
          var len = results.rows.length;
          let arr = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let res = results.rows.item(i);
              arr.push(res);
            }
            setUser(arr);

            setSearchData(arr);
            setLoding(false);
          } else {
            alert('No user found');
          }
        },
        er => {
          console.log(er);
        },
      );
    });
  };

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          backgroundColor: 'white',
        }}
        onLongPress={() => {
          alert('long pred');
        }}
        onPress={() => {
          userInfo({item});
        }}>
        <View style={styles.mycard}>
          {item.profileIcon != '' && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewDp', {image: item.profileIcon});
              }}
              style={{
                paddingHorizontal: 15,
                marginTop: '3%',
                alignItems: 'center',
              }}>
              <Image source={{uri: item.profileIcon}} style={styles.img} />
            </TouchableOpacity>
          )}

          {item.profileIcon == '' && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ViewDp', {image: item.profileIcon});
              }}
              style={{
                paddingHorizontal: 15,
                marginTop: '3%',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#d9d9d9',
              }}>
              <Text
                style={{
                  color: 'mediumpurple',
                  fontSize: 22,
                  fontWeight: '500',
                }}>
                {' '}
                {item.contactName[0].toUpperCase()}{' '}
              </Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              paddingBottom: 10,
              width: '70%',
              justifyContent: 'space-between',
              marginRight: 10,
              flexDirection: 'row',
            }}>
            <View style={{marginVertical: 10, width: '70%', marginTop: '5%'}}>
              <Text style={styles.Txt}>{item.contactName}</Text>
              <Text style={{fontSize: 14, opacity: 0.5}}>
                {item.mobileNumber}
              </Text>
            </View>

            <View style={{}}>
              <Text style={{opacity: 0.5}}>{item.rtime}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '20%',
                  justifyContent: 'space-evenly',
                }}>
                {false && (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                    }}>
                    <Image
                      source={require('./image/mute.png')}
                      style={{
                        width: 18,
                        height: 18,
                      }}
                    />
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: item.unreadSms == '' ? 'white' : 'blue',
                    paddingHorizontal: 5,
                    marginLeft: 20,
                    alignItems: 'center',
                    borderRadius: 12.5,
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'white',
                      marginVertical: 2,
                      marginHorizontal: 3,
                    }}>
                    {item.unreadSms}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
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
            }}></View>

          <View
            style={{
              justifyContent: 'center',
              width: '10%',
              paddingVertical: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                getContact();
              }}>
              <Image
                style={{height: 25, width: 25, opacity: 0.6}}
                source={require('./image/editing.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 10}}>
          <Text style={{fontWeight: 'bold', color: '#000', fontSize: 28}}>
            Chats
          </Text>
        </View>
        <Searchbar searchList={searchList} data={User} type={'Chatcontact'} />

        {loading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <ActivityIndicator color="#0000ff" size={'large'} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={SeachData}
              scrollEnabled={false}
              renderItem={({item}) => <RenderCard item={item} />}
              //  keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {width: 60, height: 60, borderRadius: 30},

  Txt: {
    fontWeight: '600',

    fontSize: 18,
  },
  mycard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
