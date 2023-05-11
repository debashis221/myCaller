import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const PluseModal = ({visi, close = () => {}, ...props}) => {
  const checkPress = press => {
    if (press == 'SelectDocument') {
      SelectDocument();
      close()
    } else if (press == 'SelectGallry') {
      openGallery();
      close()
    } else if (press == 'SelectCamera') {
      openCamera();
      close()
    } else if (press == 'ChoseAudio') {
      ChoseAudio();
      close()
    } else {
    }
  };

  const SelectDocument = async () => {
    
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('path documenty', doc);
    } catch (err) {
      console.log(err);
    }
  };

  const openCamera = async () => {
    alert('Camera Open');
    const result = await launchCamera({mediaType: 'photo'});
    console.log(JSON.stringify(result.assets));
  };

  const openGallery = async () => {
    const result = await launchImageLibrary();
    console.log(JSON.stringify(result.assets));
  };
  const ChoseAudio = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      console.log('path documenty', doc.type);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex:1}}>

 <View >
    <Modal animationType="slide" transparent={true} visible={visi}>
      <TouchableOpacity
        onPress={() => {
          close();
        }}
        style={{flex: 1,}}>
        <View style={styles.container}>
          <FlatList
            data={Data}
            renderItem={({item}) => (
              <View
                style={{
                  borderColor: 'grey',
                  paddingHorizontal: 25,
                  paddingVertical: 1,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    checkPress(item.press);
                  }}
                  style={{paddingVertical: 10,flexDirection:'row',alignItems:'center'}}>
                  <Feather name={item.logo} size={30} color={item.color} />
                  <Text style={{fontSize: 18,marginLeft:20}}>{item.name}</Text>
                </TouchableOpacity>
              </View>

            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  container: {
    position:'absolute',
    width:'90%',
    bottom:'7.5%',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default PluseModal;

const Data = [
  {
    name: 'Camera',
    press: 'SelectCamera',
    logo:'camera',
    color:'green'
  },
  {
    name: 'Gallery',
    press: 'SelectGallry',
    logo:'image',
    color:'#a6238e'
  },

  {
    name: 'Document',
    press: 'SelectDocument',
    logo:'file-text',
    color:'#a86cd9'
    
  },




  {
    name: 'Audio',
    press: 'ChoseAudio',
    logo:'volume-2',
    color:'red'
  },

  {
    name: 'Contact',
    logo:'user',
    color:'blue'
  },
];
