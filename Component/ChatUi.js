import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import AcModal from './Modal/AcountModal';

const ChatUI = ({route}) => {
  const name  = route.params.name;
  const image  = route.params.image;
  const Chat  = route.params.chat;
  const navigation = useNavigation()
  const [messages, setMessages] = useState([]);
  const [visiable, setVisiable] = useState(false)
  const [txt, setTxt] = useState('');

  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log( JSON.stringify(result.assets));
    
    
    };

  useEffect(() => {
    setMessages([
      {
         
        createdAt: new Date(),
        text:Chat,
        user: {
    
          avatar: image,
        },
      },
      {
        createdAt: new Date(),
  
  text:'hello',
  user: {
    
    avatar: image,
  },
      } , 
      
       
        
       
      ]);
  }, [visiable]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);


  const renderActions = useCallback(()=>{
return(

  <TouchableOpacity  onPress={()=>{ setVisiable(true)}}
  style={{marginLeft:10, marginBottom:15}}>
             <Image  source={require('./image/plus.png')}   style={{height:20,width:20}} />
          </TouchableOpacity>
)
  },[])

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
          style={{width: '15%', alignItems: 'center', flexDirection: 'row'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('./image/left.png')}
            style={{width: 35, height: 35}}
          />
          <Text>77</Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', width: '70%', alignItems: 'center'}}>
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
                uri:image ,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{width: '80%'}}>
            <Text style={{fontWeight: '600', fontSize: 18}}>{name}</Text>
            <Text>online</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{width: '20%', justifyContent: 'center'}}>
          <Image
            style={{height: 25, width: 25, opacity: 0.5, alignSelf: 'center'}}
            source={require('./image/search.png')}
          />
        </TouchableOpacity>
      </View>
     




      <ImageBackground source={require('./image/bg.jpeg')} style={{flex:1}} >
        <GiftedChat
          messages={messages}
          alwaysShowSend
          onSend={txt => onSend(txt)}
          


















          user={{
            _id: 1,

            quickReplies: {
              type: 'radio', // or 'checkbox',
              keepIt: true,
              values: [
                {
                  title: '😋 Yes',
                  value: 'yes',
                },
                {
                  title: '📷 Yes, let me show you with a picture!',
                  value: 'yes_picture',
                },
                {
                  title: '😞 Nope. What?',
                  value: 'no',
                },
              ],
            },
          }}

          
          textInputStyle={{
            
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal:10,
            marginTop:5,
            borderWidth: 1,
            borderColor: 'grey',
          }}
renderActions={renderActions}

          renderInputToolbar={props=> {
return(

  <InputToolbar  containerStyle={{backgroundColor:'#f6f6f6',}}
  {...props}
/>
)
          }}


          renderSend={props=>{
            return(
          <View style={{paddingVertical:2,  alignItems:'center',width:'35%',
          justifyContent:'space-evenly' , flexDirection:'row'}}>
        {false&&  <TouchableOpacity>
            <Image  source={require('./image/file.png')}   style={{height:20,width:20}} />
          </TouchableOpacity>}
          <TouchableOpacity    onPress={()=>{openCamera()}} >
            <Image  source={require('./image/camera.png')}   style={{height:20,width:20}} />
          </TouchableOpacity>
      <TouchableOpacity>
            <Image  source={require('./image/microphone.png')}   style={{height:20,width:20}} />
          </TouchableOpacity>
          <View style={{}}>

          {true&&<Send {...props} >
            <Image  source={require('./image/send.png')}   style={{height:20,width:20,marginBottom:10,}} />
          </Send>}
          </View>
          
         
          </View>
            )
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}

                textStyle={{
                  right: {
              color: '#000',
            }
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

export default ChatUI;