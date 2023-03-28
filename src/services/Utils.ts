import {Base64} from 'js-base64';
import rootStore from '../stores/RootStore';
import EncryptionModule from './Encryption';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

class Utils {
  getCurrentTime() {
    return Date.now();
  }

  openActivity = async (item: any, activity: any) => {
    console.log('openActivity ', item.type);
    switch (item.type) {
      case 'whoViewedMyProfile':
        activity.props.navigation.navigate('WVMPS');
        break;
      case 'contactUs':
        activity.props.navigation.navigate('Contact');
        break;
      case 'url':
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.open(item.data, {
            // iOS Properties
            dismissButtonStyle: 'cancel',
            preferredBarTintColor: 'mediumpurple',
            preferredControlTintColor: 'white',
            readerMode: false,
            animated: true,
            modalPresentationStyle: 'fullScreen',
            modalTransitionStyle: 'coverVertical',
            modalEnabled: true,
            enableBarCollapsing: false,
            // Android Properties
            showTitle: true,
            toolbarColor: 'mediumpurple',
            secondaryToolbarColor: 'black',
            navigationBarColor: 'black',
            navigationBarDividerColor: 'white',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
            // Specify full animation resource identifier(package:anim/name)
            // or only resource name(in case of animation bundled with app).
            animations: {
              startEnter: 'slide_in_right',
              startExit: 'slide_out_left',
              endEnter: 'slide_in_left',
              endExit: 'slide_out_right',
            },
            headers: {
              'my-custom-header': 'my custom header value',
            },
          });
        }
        break;
    }
  };

  encodeData = (data: Array<string>) => {
    if (data.length === 0) {
      return '';
    }

    enc = 'time=' + this.getCurrentTime() + '&' + enc;
    let AB = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var enc_rot: Array<string> = [];

    let firstResponse = enc.split('');
    for (let i = 0; i < firstResponse.length; i++) {
      let char = String(firstResponse[i]);
      var c = char.charCodeAt(0);
      if (c >= this.Character('a') && c <= this.Character('m')) {
        c = c + 13;
      } else if (c >= this.Character('A') && c <= this.Character('M')) {
        c = c + 13;
      } else if (c >= this.Character('n') && c <= this.Character('z')) {
        c = c - 13;
      } else if (c >= this.Character('N') && c <= this.Character('Z')) {
        c = c - 13;
      }
      let asciiToChar = String.fromCharCode(c);
      enc_rot.push(String(asciiToChar));
    }
    let enc_str = enc_rot.join('');
    enc = Base64.encode(enc_str);
    enc_rot = [];

    let secondResponse = enc.split('');
    for (let i = 0; i < secondResponse.length; i++) {
      let char = String(secondResponse[i]);
      var c = this.Character(char);

      if (c >= this.Character('a') && c <= this.Character('m')) {
        c = c + 13;
      } else if (c >= this.Character('A') && c <= this.Character('M')) {
        c = c + 13;
      } else if (c >= this.Character('n') && c <= this.Character('z')) {
        c = c - 13;
      } else if (c >= this.Character('N') && c <= this.Character('Z')) {
        c = c - 13;
      }
      let asciiToChar = String.fromCharCode(c);
      enc_rot.push(asciiToChar);
    }
    let enc_strs = enc_rot.join('');
    let substr = enc_strs.substring(2, 12);

    var sb: Array<string> = [];
    for (let i = 0; i < 10; i++) {
      let abLength = AB.split('');
      const min = 0;
      const max = abLength.length;
      const rand = min + Math.random() * (max - min);
      let char = AB.charAt(rand);
      sb.push(char);
    }
    let rand = sb.join('');
    let newStr = substr + rand;
    let final_enc_rot = enc_strs.replace(substr, newStr);
    return final_enc_rot;
  };

  decodeData = (data: string) => {
    return Base64.atob(data);
  };

  sslEncryptMain = async (enc: any, encKey: any) => {
    let encryptedSecretKey = '';
    let cipherTextArray = '';
    // console.log('enc ::', enc);
    // console.log('encKey ::', encKey);
    // let dec = Base64.decode(encKey);
    // console.log('dec :: ', dec);
    let encData = EncryptionModule.encrypt(enc, encKey);
    // console.log('encData :: ------- ', encData);
    let decData = EncryptionModule.decrypt(encData, encKey);
    // console.log('decData :: ------- ', decData);
    // let keys = await RSA.generateKeys(4096); // set key size

    // // .then(keys => {
    // console.log('4096 private:', keys.private); // the private key
    // console.log('4096 public:', keys.public); // the public key
    // let dec = Base64.decode(encKey)
    // let encodedMessage = await RSA.encrypt(dec, keys.public);
    // // .then( async(encodedMessage) => {
    // const keyArrayBuffer = await RNSimpleCrypto.utils.randomBytes(32);
    // console.log("randomBytes key", keyArrayBuffer);
    // console.log(`the encoded message is ${encodedMessage}`);
    // cipherTextArray = await RNSimpleCrypto.RSA.encrypt(enc, keys.public);
    // encryptedSecretKey = Base64.encode(cipherTextArray);
    // });
    // });
    return encData;
  };

  mapWrapper = async (map: any) => {
    let encryptedData = '';
    let publicKey = rootStore._loginStore.keyData.publicKey;

    encryptedData = await this.sslEncryptMain(JSON.stringify(map), publicKey);

    let dta = {
      data: encryptedData,
      sid: rootStore._loginStore.keyData.sid,
      source: rootStore._loginStore.keyData.os,
      device: rootStore._loginStore.keyData.os,
      code: 'react',
    };
    return this.encryptRequest(JSON.stringify(dta));
  };

  encryptRequest = (request: any) => {
    let response = '';
    response = Base64.encode(request.toString());
    return response;
  };

  Character(a: string) {
    return a.charCodeAt(0);
  }
}

export default new Utils();
