import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function RadioButton(props) {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    debugger
    setIsSelected(props.status);
  }, [props.status]);

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 14, fontWeight: "600", color: 'gray'}}>{props.label}</Text>
      {isSelected ? (
        <TouchableOpacity
          onPress={() => {
            setIsSelected(true);
            props.onPress();
          }}>
          <MaterialIcons
            name="radio-button-checked"
            size={20}
            color="gray"
            style={{marginRight: 5}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setIsSelected(true);
            props.onPress();
          }}>
          <MaterialIcons
            name="radio-button-off"
            size={20}
            color="gray"
            style={{marginRight: 5}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
