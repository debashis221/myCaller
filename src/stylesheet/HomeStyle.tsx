import {Dimensions, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  tabBarIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '85%',
    width: '75%',
    borderRadius: 15,
  },
  tabBarText: {
    textAlign: 'center',
    marginTop: 2,
    fontSize: 12,
  },
  heading: {fontSize: 16, fontWeight: '600', marginLeft: 5, color: 'gray'},
  profileIcon: {
    flex: 1,
    height: 55,
    width: 55,
    borderRadius: 1000,
    marginTop: 15,
    backgroundColor: '#E0EBF9',
    justifyContent: 'center',
  },
  profileIconName: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'mediumpurple',
  },
  profileName: {
    borderRadius: 5,
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    margin: 10,
    color: 'gray',
  },
  profileEdit: {
    borderRadius: 25,
    backgroundColor: 'mediumpurple',
    height: '40%',
    width: '80%',
    flex: 1.1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contactDescription: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    height: 200,
    width: '100%',
    borderColor: 'lightgray',
    fontWeight: '600',
  },
  logout: {
    height: 50,
    width: '90%',
    borderRadius: 25,
    borderHeight: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'mediumpurple',
  },
  logoutText: {textAlign: 'center', color: 'snow', fontWeight: '600'},
});
