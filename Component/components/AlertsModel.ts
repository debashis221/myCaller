
import {Alert} from 'react-native';

class AlertsModel {
  showAlert = (message: string) => {
    return Alert.alert('MyCaller', message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };
}

export default new AlertsModel();
