import { View, Text, StyleSheet,TextInput ,Image} from 'react-native'
import React from 'react'


export default function Searchbar() {
  return (
    <View style={styles.container}>
    <View style={styles.row}>
    <Image  style={{height:25,width:25,opacity:0.5,}}  source={require('../image/search.png')}   />
       <TextInput  style={styles.input} placeholder='Search' maxLength={10}/>
        </View>
        <View style={{width:'15%' ,justifyContent:'center',alignItems:'center'}}>

       <Image   source={require('../image/sort.png')}  style={{height:25,width:25,opacity:0.5,}} /> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
container:{
  flexDirection:'row',
paddingVertical:20,
paddingHorizontal:10,

},
input:{
paddingHorizontal:30,
 backgroundColor:'#f0f0f0',
fontSize:15,
height:40,
flex:1,

},
row:{width:'85%',

     backgroundColor:'#f0f0f0',
     flexDirection:'row',
     borderRadius:10,
     height:40,
     alignItems:'center',
     paddingHorizontal:10
}


})