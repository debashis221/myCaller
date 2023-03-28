import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ViewDp({route}) {

  const dp  = route.params.image;
console.log(dp);
  return (
    <View style={{flex:1}}>
      
      <View style={{borderWidth:1 ,flex:1,justifyContent:'center',alignItems:'center'}}> 
<Image   source={{uri:dp}}  style={{height:'100%',width:'90%'}} resizeMode='contain'  />
      </View>
    </View>
  )
}