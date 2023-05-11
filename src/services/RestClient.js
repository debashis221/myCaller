import UrlClient from './UrlClient';
import Utils from './Utils';
import RNFetchBlob from 'rn-fetch-blob';
import {Base64} from 'js-base64';

class RestClient {
  getKeysData = async (os: any) => {
    let url = UrlClient.baseUrl() + UrlClient.getKeysEndPoint();
    console.log('os :----------------------- ', os);
    let encDta = Base64.encode(JSON.stringify(os));
    console.log('encDta :----------------------- ', encDta);
    return await fetch(url, {
      method: 'POST',
      body: encDta,
    })
      .then(response => response.text())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log('error ------- ', error);
      });
  };

  connectServer = async (url: any, data: any) => {
    console.log('url :-----------restclient.js------------ ', url);
    return await fetch(url, {
      method: 'POST',
      body: data,
    })
      .then(async response => {
        debugger;
        let data = await response.text();
        if (response.status === 200)
          return {status: response.status, data: Utils.decodeData(data)};
        else
          return {
            status: response.status,
            data: {
              resText: 'Failed to connect to server. Please contact admin!',
            },
          };
      })
      .catch(error => {
        console.log('error ------- ', error);
        return error;
      });
  };
}

export default new RestClient();
