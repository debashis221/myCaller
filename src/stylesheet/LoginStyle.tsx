import {Dimensions, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  heading: {
    margin: 15,
    fontWeight: '600',
    fontSize: 22,
    color: 'gray',
  },
  subHeading: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 14,
    lineHeight: 20,
    color: 'gray',
  },
  button: {
    height: 50,
    width: '92%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'mediumpurple',
  },
  disabledButton: {
    height: 50,
    width: '92%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'lightgray',
  },
  countryCodeContainer: {
    justifyContent: 'center',
    width: '92%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    color: 'gray',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 2,
    fontSize: 12,
    fontWeight: '600',
  },
  countryCodeBoxContainer: {
    borderRadius: 15,
    borderWidth: 1,
    height: 60,
    width: '100%',
    borderColor: 'lightgray',
  },
  phoneNumberContainer: {
    justifyContent: 'center',
    width: '92%',
    alignSelf: 'center',
    marginTop: 10,
  },
  textViewContainer: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    height: 60,
    width: '100%',
    borderColor: 'lightgray',
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
  },
  countryCodeButton: {
    height: 60,
    width: '90%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    margin: 5,
    alignSelf: 'center',
  },
  countryCodeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 20,
    color: 'gray'
  },
  bottomSheetSearch: {
    height: 40,
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  otpBox: {
    height: 50,
    width: '12%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    margin: 5,
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
  },
  notificationImage: {
    width: 250,
    height: 200,
    resizeMode: 'stretch',
  },
  notificationMayBe: {
    height: 50,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationEnable: {
    borderRadius: 10,
    height: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumpurple',
  },
});