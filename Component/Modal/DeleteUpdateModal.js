import React, {useState, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  Alert
} from 'react-native';
import rootStore from '../../src/stores/RootStore';
import {RestClient, Utils} from '../../src/services';

var SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase({name: 'user.db', createFromLocation: 1});

const DeleteUpdate = ({visi, close = () => {}, ...props}) => {
  const touser = props.touser;
  const toCountycode = props.toCountycode;
  const  dateTime = props.msgData.createdAt ;

  const [txt, setTxt] = useState('');
  const [EditeInput, setEditeInput] = useState(false);

  const handlePress = () => {
    props.onChildFunctionCall(true);
  };

  const msgDeleted = () => {
    const UpID = props.msgData._id
    db.transaction(async txn => {
      await txn.executeSql(
        'UPDATE Chat SET isDeleted = ? WHERE ID = ?',
        [1, props.msgData._id],
        (tx, res) => {
          console.log('updated ');
          const StatusType = 'deleted '
          InsertUpdateTable(UpID, txt,StatusType);
        },
        er => {
          console.log('errross.......', er);
        },
      );
    });
    handlePress();
    close();
  };

  const msgEdite = () => {
    db.transaction(async txn => {
      await txn.executeSql(
        'UPDATE Chat SET message = ?, isEdited=? WHERE id = ?',
        [txt, 1, props.msgData._id],
        (tx, res) => {
          console.log('updated ');
          let UpID = props.msgData._id;
          const StatusType = 'edited'
          InsertUpdateTable(UpID, txt,StatusType);
        },
        er => {
          console.log('errross.......', er);
        },
      );
    });

    handlePress();
    setEditeInput(false);
    close();
  };

  const showData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM updatedChat',
        [],

        (tx, results) => {
          var len = results.rows.length;
          let arr = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let res = results.rows.item(i);

              arr.push(res);
            }
           // console.log('update table  show Data ', arr);
            // arr.map(item => {

            // });
          } else {
            console.log('No user found');
          }
        },
        er => {
          console.log(er);
        },
      );
    });
  };

  const InsertUpdateTable = (UpID, txt,StatusType) => {
    const message = txt;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM updatedChat',
        [],

        (tx, results) => {
          var len = results.rows.length;
          let arr = [];
         
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let res = results.rows.item(i);

              arr.push(res);
            }
           

            arr.map(item => {
              if (item.messageId == UpID) {
                console.log('condition true ');

                db.transaction(async txn => {
                  await txn.executeSql(
                    'UPDATE updatedChat SET message = ?,dateTime = ?  WHERE messageId = ?',
                    [message, dateTime, item.messageId],
                    (tx, res) => {
                      console.log('u.......Update query run......');
                      sendToServer(StatusType,UpID)
                      showData();
                    },
                    er => {
                      console.log('errross.......', er);
                    },
                  );
                });
              }
            });
          } else {
            console.log('No user found');
          }
        },
        er => {
          console.log(er);
        },
      );
    });

    db.transaction(async txn => {
      
  
      let sentToServer = 1;
      txn.executeSql(
        'INSERT INTO updatedChat(messageId,dateTime,updateType,message,sentToServer,toCountyCode,toMobile ) VALUES (?,?,?,?,?,?,?)',
        [UpID, dateTime, StatusType, txt, sentToServer, toCountycode, touser],
        (tx, res) => {
          if (res.rowsAffected > 0) {
            console.log('Data Insert Successfuly Update');
          sendToServer(StatusType,UpID)
          }
        },
        er => {
          console.log(er);
        },
      );
    });
  };

  const ConfirmDelete = () => {
    Alert.alert('Are you sure you want to delete?', '', [
      {
        text: 'Cancel',
        onPress: () => close(),
        style: 'Cancel',
      },
      {text: 'Yes', onPress: () => msgDeleted()},
    ]);
  };
  const ConfirmEdite = async () => {
    await setEditeInput(true);
    setTxt(props.msgData.text);
  };




  let  MessageData = [];
  const sendToServer =(StatusType,UpID)=>{
    let UpData ;
console.log('....................inert...............');
 UpData =  {
  messageId:UpID,
  toCountryCode:toCountycode ,
  toUser:touser,
  status:StatusType,
  message:txt,
  dateTime:dateTime,

}

do {
  MessageData.push(UpData)
}
while (MessageData.length > 0);

console.log('mesga...............',MessageData);

   
// let payload = {
//       os: Platform.OS,
//       deviceId: rootStore._loginStore['uuid'],
//       deviceName: rootStore._loginStore['deviceName'],
//       versionCode: '1',
//       code: 'react',
//       token: rootStore._loginStore.token,
//       countryCode: rootStore._loginStore.countryCodeValue.code,
//       mobile: rootStore._loginStore.mobileNumber,
//       messageData:MessageData,
     
//     };
  
//     Utils.mapWrapper(payload).then(encryptedData => {
//       RestClient.connectServer(
//         rootStore._loginStore.urlData.chat_updateStatus,
//         encryptedData,
//       ).then(async result => {
//         let data = JSON.parse(result.data);
  
//         if (data.status === 'SUCCESS') {
//           console.log('MESSAGE SEND SUCCESS ', StatusType);
//         } else {
//           console.log('MESSAGE SEND FAILD',StatusType);
//         }
//       });
//     });
  
  }
  
  return (
    <View style={{flex: 1}}>
      <Modal animationType="fade" transparent={true} visible={visi}>
        {!EditeInput && (
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              close();
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: '70%',
                paddingVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  ConfirmEdite();
                }}
                style={styles.Lable}>
                <Text style={{fontWeight: '600', fontSize: 20}}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  ConfirmDelete();
                }}
                style={styles.Lable}>
                <Text style={{fontWeight: '600', fontSize: 20}}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  close();
                }}
                style={[styles.Lable, {borderBottomWidth: 0.5}]}>
                <Text style={{fontWeight: '600', fontSize: 20}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        {EditeInput && (
          <>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderRadius: 10,
                  width: '70%',
                  height: '40%',
                }}></View>
            </TouchableOpacity>

            <View
              style={{
                paddingVertical: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                flexDirection: 'row',
              }}>
              <View style={{width: '95%'}}>
                <TextInput
                  placeholder="Edite"
                  value={txt}
                  onChangeText={txt => setTxt(txt)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  msgEdite();
                }}>
                <Image
                  source={require('../image/send.png')}
                  style={{height: 25, width: 25, marginBottom: 10}}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Lable: {
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 0.5,
  },

  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    paddingHorizontal: 30,
    backgroundColor: '#f0f0f0',
    fontSize: 15,
    height: 40,
    flex: 1,
  },
  row: {
    marginHorizontal: 10,
    width: '96%',
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
  },
});
export default DeleteUpdate;
