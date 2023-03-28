import {Dimensions, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: 'lightgray',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: 5,
    color: 'gray'
  },
  detailContainer: {
    width: '95%',
    height: 60,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 15,
    marginTop: 20,
    justifyContent: 'center',
  },
  carrierDetails: {marginLeft: 20, fontSize: 14, fontWeight: '300', color: 'lightgray'},
  mobilenumber: {marginLeft: 20, fontSize: 14, fontWeight: '400', marginTop: 5, color:'gray'},
  headerContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    width: '80%',
    color: 'gray',
    paddingLeft: '5%',
  },
  headerSaveText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    width: '60%',
    color: 'gray',
    paddingLeft: '2%',
  },
  iconContainer: {
    height: 125,
    width: 125,
    backgroundColor: '#E0EBF9',
    borderRadius: 1000,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 30,
    fontWeight: '400',
    color:'gray'
  },
  loading: {
    backgroundColor: 'mediumpurple',
    height: 120,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
  },
});
