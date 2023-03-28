import {Dimensions, StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
  },
  appName: {
    height: 35,
    width: '30%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: '10%',
  },
  headerIcon: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginLeft: '25%',
    marginBottom: '35%',
  },
  bodyContainer: {flex: 1, marginTop: 40, width: '90%'},
  bodyHeading: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: '500',
    color: 'dimgray',
    alignSelf: 'flex-start',
  },
  bodySubHeading: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '600',
    color: 'dimgray',
  },
  searchBoxContainer: {
    flex: 6,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
  },
  searchBoxLayout: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgray',
    height: 60,
    width: '95%',
    justifyContent: 'flex-start',
    backgroundColor: 'snow',
    flexDirection: 'row',
  },
  searchBoxInput: {
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400',
  },
  bottonmSheetHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottonSheetHeaderText: {fontSize: 16, fontWeight: '600', color: 'gray'},
  listItemContainer: {
    height: 70,
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listProfileIcon: {
    width: 55,
    height: 55,
    borderRadius: 1000,
    backgroundColor: '#E0EBF9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContactContainer: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  listNavigation: {marginRight: 5, flex: 0.5, alignSelf: 'center'},
});
