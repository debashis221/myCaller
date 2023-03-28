import {Dimensions, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  searchContainer: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: 'lightgray',
    justifyContent: 'center',
    backgroundColor: 'snow',
    marginLeft: '2%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerContainer: {flexDirection: 'row', width: '100%', height: 50, flex: 0.1},
});
