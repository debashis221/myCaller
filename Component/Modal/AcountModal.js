import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const AcModal = ({visi, close = () => {}, ...props}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visi}>
      <TouchableOpacity
        onPress={() => {
          close();
        }}
        style={{flex: 1, paddingTop:450}}>


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
                  onPress={() => {}}
                  style={{paddingVertical: 10}}>
                  <Text style={{fontSize: 18}}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
       
      </TouchableOpacity>
    </Modal>
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
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    backgroundColor:'white',
   
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default AcModal;

const Data = [
  {
    name: 'Document',
  },
  {
    name: 'Camera',
  },

  {
    name: 'Gallery',
  },

 

  {
    name: 'Audio',
  },

  {
    name: 'Location',
  },

  {
    name: 'Contact',
  },
];
