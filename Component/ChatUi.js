import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import PluseModal from './Modal/PluseModal';
import rootStore from '../src/stores/RootStore';
import {RestClient, UrlClient, Utils, Encryption} from '../src/services';
import DeleteUpdate from './Modal/DeleteUpdateModal';
import messaging from '@react-native-firebase/messaging';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
var SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase({name: 'user.db', createFromLocation: 1});

export const sendMessageToApi = async (Id, toCountryCode, msg, touser) => {
  let payload = {
    os: Platform.OS,
    deviceId: rootStore._loginStore['uuid'],
    deviceName: rootStore._loginStore['deviceName'],
    versionCode: '1',
    code: 'react',
    token: rootStore._loginStore.token,
    countryCode: rootStore._loginStore.countryCodeValue.code,
    mobile: rootStore._loginStore.mobileNumber,
    messageId: Id,
    toCountryCode: toCountryCode,
    toUser: touser,
    message: msg,
  };

  Utils.mapWrapper(payload).then(encryptedData => {
    RestClient.connectServer(
      rootStore._loginStore.urlData.chat_postChat,
      encryptedData,
    ).then(async result => {
      let data = JSON.parse(result.data);

      if (data.status === 'SUCCESS') {
        console.log('MESSAGE SEND SUCCESS Send');
      } else {
        console.log('MESSAGE SEND FAILD Send ');
      }
    });
  });
};

export const InsertChat = async (
  Id,
  fromeCountryCode,
  fromUser,
  toCountryCode,
  touser,
  msg,
) => {
  console.log(
    '........................insert chat Table',
    Id,
    fromeCountryCode,
    fromUser,
    toCountryCode,
    touser,
    msg,
  );
  await db.transaction(async txn => {
    let date = new Date();
    txn.executeSql(
      'INSERT INTO Chat(id,fromCountryCode,fromUser,toCountryCode,toUser,message,CreateDate ) VALUES (?,?,?,?,?,?,?)',
      [Id, fromeCountryCode, fromUser, toCountryCode, touser, msg, date],

      (tx, res) => {
        if (res.rowsAffected > 0) {
          sendMessageToApi(Id, toCountryCode, msg, touser);
        }
      },
      er => {
        console.log('errross.......', er);
      },
    );
  });
};
export const GetChatApi = async () => {
  console.log('chat Api Call............');
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
        // er => {
        //   console.log('errross.....user screen ..', er);
        // },
      );
    });
  });
};

const ChatUI = ({route}) => {
  const name = route.params.name;
  const image = route.params.image;
  const unreadSms = route.params.unread;
  const touser = route.params.Touser;
  const toCountryCode = route.params.ToConCode;
  const fromUser = rootStore._loginStore.mobileNumber;
  const fromeCountryCode = rootStore._loginStore.countryCodeValue.code;

  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [Id, setId] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [EDvisiable, setEDvisiable] = useState(false);
  const [Ticks, setTicks] = useState(true);

  const isFocuse = useIsFocused();
  useEffect(() => {
    const interval = setInterval(() => {
      getDatafromDatabse();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    notification();
  }, []);

  const notification = () => {
    console.log('.............Notofication.................................');
    messaging()
      .requestPermission()
      .then(authStatus => {
        console.log('Permission status:', authStatus);
      })
      .catch(error => {
        console.log('Permission rejected:', error);
      });

    messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received Chat screen!', remoteMessage);

      GetChatApi();
    });
  };
  const Back = () => {
    navigation.goBack();
  };
  const handleChildFunctionCall = () => {};

  const onLongPress = async (context, message) => {
    setEDvisiable(true);
    setId(message);
  };

  const openCamera = () => {
    const result = launchCamera();
  };

  function renderTicks(currentMessage) {
    console.log(
      currentMessage.user._id == touser,
      '......................touser........',
      touser,
      currentMessage.user._id,
    );
    let User = currentMessage.user._id == touser;

    return (
      <View style={{paddingRight: 6, marginTop: Ticks ? '-4%' : '0%'}}>
        {currentMessage.status == 0 && !User && (
          <MaterialIcons name="done-all" size={20} color={'grey'} />
        )}

        {currentMessage.status == 1 && !User && (
          <MaterialIcons name="done-all" size={20} color={'#64c5e8'} />
        )}
        {/* {currentMessage.status == 0 && <AntDesign   name= 'exclamationcircle' size={15} color={'red'}/> }     */}
      </View>
    );
  }

  const onSend = txt => {
    txt[0].sent = true;

    let msg;
    txt.map(async item => {
      msg = item.text;
    });
    if (msg != '') {
      let year = new Date().getFullYear() % 100;
      let month = new Date().getMonth();
      let Day = new Date().getDate();

      let hour = new Date().getHours();
      let minute = new Date().getMinutes();
      let sec = new Date().getSeconds();

      let random = Math.floor(Math.random() * 9000 + 1000);
      if (Day / 10 < 1) {
        Day = '0' + Day;
      }
      if (month / 10 < 1) {
        month = '0' + (month + 1);
      }
      if (hour / 10 < 1) {
        month = '0' + hour;
      }
      if (minute / 10 < 1) {
        minute = '0' + minute;
      }
      if (sec / 10 < 1) {
        sec = '0' + sec;
      }

      let Id = JSON.parse(year + month + Day + hour + minute + sec + random);
      InsertChat(Id, fromeCountryCode, fromUser, toCountryCode, touser, msg);
    } else {
      console.log('else call message null ');
    }
  };

  const getDatafromDatabse = async () => {
    db.transaction(tx => {
      tx.executeSql(
        ' SELECT * FROM Chat WHERE isDeleted = ? AND (toUser = ? or fromUser = ?) ORDER BY id DESC LIMIT ? ',
        [0, touser, touser, 100],

        (tx, results) => {
          var len = results.rows.length;
          let arr = [];
          let userMsg = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let res = results.rows.item(i);

              arr.push(res);
            }

            arr.map(item => {
              userMsg.push({
                _id: item.id,
                createdAt: item.CreateDate,
                text: item.message,
                user: {
                  _id: item.fromUser,
                },
                status: item.messageType,
              });
            });
            console.log('gifted chat insert/.........................');
            setMessages(userMsg);
          } else {
            let temp = [];
            setMessages(temp);
            console.log('No user found');
          }
        },
        er => {
          console.log(er);
        },
      );
    });
  };

  const renderActions = useCallback(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVisiable(true);
        }}
        style={{marginLeft: 10, marginBottom: 15}}>
        <Image
          source={require('./image/plus.png')}
          style={{height: 20, width: 20}}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingVertical: 5,
        }}>
        <TouchableOpacity
          style={{width: '10%', alignItems: 'center', flexDirection: 'row'}}
          onPress={() => {
            Back();
          }}>
          <Image
            source={require('./image/left.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', width: '70%', alignItems: 'center'}}>
          {image != '' && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('showDp', {Dp: img});
              }}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 22.5,
                  marginHorizontal: '3%',
                }}
                source={{
                  uri: image,
                }}
              />
            </TouchableOpacity>
          )}

          {image == '' && (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                width: 45,
                height: 45,
                borderRadius: 22.5,
                backgroundColor: '#d9d9d9',
              }}>
              <Text
                style={{
                  color: 'mediumpurple',
                  fontSize: 18,
                  fontWeight: '500',
                }}>
                {' '}
                {name[0].toUpperCase()}{' '}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={{width: '80%'}}>
            <Text style={{fontWeight: '600', fontSize: 18}}>{name}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{width: '20%', justifyContent: 'center'}}>
          <Image
            style={{height: 25, width: 25, opacity: 0.5, alignSelf: 'center'}}
            source={require('./image/search.png')}
          />
        </TouchableOpacity>
      </View>

      <ImageBackground source={require('./image/bg.jpeg')} style={{flex: 1}}>
        <GiftedChat
          onLongPress={onLongPress}
          messages={messages}
          alwaysShowSend={true}
          renderTicks={renderTicks}
          onSend={txt => onSend(txt)}
          user={{
            _id: Number(fromUser),
          }}
          textInputStyle={{
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 10,
            marginTop: 5,
            borderWidth: 1,
            borderColor: 'grey',
          }}
          renderActions={renderActions}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                containerStyle={{backgroundColor: '#f6f6f6'}}
                {...props}
              />
            );
          }}
          renderSend={props => {
            return (
              <View
                style={{
                  paddingVertical: 2,
                  alignItems: 'center',
                  width: '35%',
                  paddingHorizontal: 10,
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                }}>
                <PluseModal visi={visiable} close={() => setVisiable(false)} />
                <DeleteUpdate
                  onChildFunctionCall={handleChildFunctionCall}
                  visi={EDvisiable}
                  close={() => setEDvisiable(false)}
                  msgData={Id}
                  toCountycode={toCountryCode}
                  touser={touser}
                />

                <TouchableOpacity
                  style={{width: '33%'}}
                  onPress={() => {
                    openCamera();
                  }}>
                  <Image
                    source={require('./image/camera.png')}
                    style={{height: 25, width: 25}}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{width: '33%'}}>
                  <Image
                    source={require('./image/microphone.png')}
                    style={{height: 25, width: 25}}
                  />
                </TouchableOpacity>
                <View style={{width: '33%'}}>
                  <Send {...props}>
                    <Image
                      source={require('./image/send.png')}
                      style={{height: 25, width: 25, marginBottom: 10}}
                    />
                  </Send>
                </View>
              </View>
            );
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: '#000',
                  },
                }}
                timeTextStyle={{
                  left: {
                    color: 'black',
                  },
                  right: {
                    color: 'black',
                  },
                }}
                wrapperStyle={{
                  right: {
                    backgroundColor: '#e2ffd3',
                    borderRadius: 5,
                  },
                  left: {
                    backgroundColor: 'white',
                    borderRadius: 5,
                    marginLeft: '-10%',
                  },
                }}
              />
            );
          }}
        />
      </ImageBackground>
    </View>
  );
};

// function CustomMessage({ currentMessage }) {
//   return (
//     <View style={{ backgroundColor: 'lightblue', padding: 10, borderRadius: 10 }}>
//       <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{currentMessage.user.name}</Text>
//       <Text>{currentMessage.text}</Text>
//     </View>
//   );
// }
export default ChatUI;

const styles = StyleSheet.create({});
