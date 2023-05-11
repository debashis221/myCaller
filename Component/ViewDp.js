import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ViewDp({route}) {

  const navigation  = useNavigation()
  const dp  = route.params.image;
console.log(dp);
  return (
    <TouchableOpacity style={{flex:1}} 
    onPress={()=>{ navigation.goBack()}}
    >
      
      <View style={{borderWidth:1 ,flex:1,justifyContent:'center',alignItems:'center'}}> 
<Image   source={{uri:dp}}  style={{height:'100%',width:'100%'}} resizeMode='contain'  />
      </View>
    </TouchableOpacity>
  )
}