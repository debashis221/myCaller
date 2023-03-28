import {Platform} from ('react-native');
import  {RNEasyPermissions} from 'react-native-easy-permissions');
import { AlertsModel } from '../components';

class PermissionManager {
  async requestPermissions(props) {

    let promise = Promise.Create()

    let permissions = [];

    if (Platform.OS === 'ios') {
      permissions = [
        'Camera',
        'Contacts',
        'PhotoLibrary',
        'Notification',
      ];
    } else {
      permissions = [
        'android.permission.WRITE_CALL_LOG',
        'android.permission.WRITE_CONTACTS',
        'android.permission.CAMERA',
        'android.permission.READ_CONTACTS',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.READ_MEDIA_IMAGES'
      ];
    }

    if (Platform.OS === 'android') {

      RNEasyPermissions.Show({
        permissions: permissions,
        onDone: granted => {
          let allGranted = true;

          for (let grantKey in granted) {
            if (granted[grantKey] === 'denied') {
              allGranted = false;

              break;
            }
          }

          if (props && allGranted) {
            AlertsModel.showAlert('Granted', 'All permissions are granted');
          }

          promise.resolve();
        },
      });
    } else {
      RNEasyPermissions.Show({
        permissions: permissions,
        onDone: () => {
          promise.resolve();
        },
      });
    }

    return promise
    
  }
}


global.PermissionManager = new PermissionManager();

module.exports = {PermissionManager: global.PermissionManager};
