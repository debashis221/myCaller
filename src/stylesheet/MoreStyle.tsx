import {Dimensions, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 59,
    width: '100%',
    justifyContent: 'flex-start',
  },
  rowImage: {height: 30, width: 30, resizeMode: 'contain', flex: 1},
  rowText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    flex: 5,
    color: 'gray'
  },
  card: {
    marginTop: 15,
    width: '100%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
  },
  divider: {
    marginLeft: '4%',
    borderWidth: 0.4,
    borderColor: 'lightgray',
    width: windowWidth * 0.85,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    alignSelf: 'flex-start',
    color: "gray"
  },
});
