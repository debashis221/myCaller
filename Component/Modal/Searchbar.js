import { View, Text, StyleSheet,TextInput ,Image, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'


export default function Searchbar(props) {


  const [Data, setData] = useState([])
  const [text, setText] = useState('')
  const [ShowCancle, setShowCancle] = useState(true)

  const searchTxt =txt =>{

setText(txt)
if(txt.length == 0 ){

  
setShowCancle(true)

}else{

  setShowCancle(false)

}

if(props.type === 'Chatcontact'){



  let tempList = props.data.filter(item=>{
//       let filtersearch  = `${item.name,item.Chat}`?`${item.name,item.Chat}`.toLowerCase():''.toLowerCase()
//      let txtData = txt.toLowerCase()
// return filtersearch.indexOf(txtData)>-1 ;
    return item.contactName.toLowerCase().indexOf(txt.toLowerCase()) > -1;
  });
  setData(tempList)
  props.searchList(tempList)

}
else{
let tempList = props.data.filter(item=>{
  //       let filtersearch  = `${item.name,item.Chat}`?`${item.name,item.Chat}`.toLowerCase():''.toLowerCase()
  //      let txtData = txt.toLowerCase()
  // return filtersearch.indexOf(txtData)>-1 ;
  // if( typeof JSON.parse(txt) == Number ){
  //   console.log('hahah');
  // }
 
         return item.givenName.toLowerCase().indexOf(txt.toLowerCase()) > -1  ;

     
      });
      setData(tempList)
      props.searchList(tempList)

}

   
  };

  const emptysearch = ()=>{
setText('')
    setShowCancle(true)
  }


  return (
    <View style={styles.container}>
    <View style={[styles.row,{width:ShowCancle?'85%':'80%'}]}>
    <Image  style={{height:25,width:25,opacity:0.5,}}  source={require('../image/search.png')}   />
       <TextInput  style={styles.input} placeholder='Search' 
       
  value={text}
       onChangeText={txt=>searchTxt(txt)}
       maxLength={25}/>
        </View>
        {ShowCancle&&  <TouchableOpacity 
        onPress={()=>{checkEvent()}}
        style={{width:ShowCancle?'15%':'20%' ,
        
        justifyContent:'center',alignItems:'center'}}>

      <Image   source={require('../image/sort.png')}  style={{
       
        height:25,width:25,opacity:0.5}} /> 
      </TouchableOpacity>  }
      {!ShowCancle&&  <TouchableOpacity 
        onPress={()=>{}}
        style={{width:ShowCancle?'15%':'20%' ,
        justifyContent:'center',alignItems:'center'}}>

<Text   style={{fontSize:18,marginHorizontal:5,fontWeight:'600',color:'blue'}}>Cancel</Text>
      </TouchableOpacity>  }
      
       
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
row:{

     backgroundColor:'#f0f0f0',
     flexDirection:'row',
     borderRadius:10,
     height:40,
     alignItems:'center',
     paddingHorizontal:10
}


})