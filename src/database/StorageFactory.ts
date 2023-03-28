import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import Realm from 'realm';
import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageFactory {
  constructor() {
    this.databases = {};
  }

  async createAll(models) {
    models.forEach(async (model, index, arr) => {
      await this.create(model);
    });

    return;
  }

  createDatabaseFolder = () => {
    let promise = Promise.Create();

    let documentDirectoryPath =
      Platform.OS === 'ios'
        ? `file://${RNFS.DocumentDirectoryPath}/Database`
        : `${RNFS.DocumentDirectoryPath}/Database`;

    RNFS.exists(documentDirectoryPath)
      .then(exists => {
        exists
          ? promise.resolve()
          : RNFS.mkdir(documentDirectoryPath)
              .then(() => promise.resolve())
              .catch(err => promise.reject(err));
      })
      .catch(err => promise.reject(err));

    return promise;
  };

  create = async model => {
    let promise = Promise.Create();
    if (this.databases[model.schema.name]) {
      promise.resolve(this.databases[model.schema.name]);
    } else {
      let key = await AsyncStorage.getItem('deviceID');

      let binaryKey = key
        .split('')
        .map(function (char) {
          return char.charCodeAt(0).toString(2);
        })
        .join(' ');

      let bitKey = new Int8Array(64);

      for (let i = 0; i < binaryKey.length; i++) {
        bitKey[i] = parseInt(binaryKey.charAt(i));
      }

      await this.createDatabaseFolder();

      let path = `Database/${model.schema.name}.Realm`;
      let dbVersion = Realm.schemaVersion(path);

      let version =
        dbVersion && dbVersion !== -1
          ? dbVersion
          : model.Version
          ? model.Version
          : 0;

      let migrate = model.Migrate;

      let realmConfig = {
        path: path,
        schema: [model.schema],
        // encryptionKey: bitKey,
        schemaVersion: version,
        migration: migrate,
      };
      debugger
      try {
        Realm.open(realmConfig)
          .then(realm => {
            this.databases[model.schema.name] = realm;
            promise.resolve();
          })
          .catch(err => {
            promise.reject(err);
          });
      } catch (error) {
        if (error.message.indexOf('Migration') !== -1) {
          try {
            Realm.open({...realmConfig, schemaVersion: version + 1})
              .then(realm => {
                this.databases[model.schema.name] = realm;
                promise.resolve();
              })
              .catch(err => {
                promise.reject(err);
              });
          } catch (error) {
            promise.reject(err.message);
          }
        } else promise.reject(error);
      }
    }

    return promise;
  };

  contains = model => {
    return this.databases[model.schema.name] ? true : false;
  };

  destroyAll = models => {};

  destroy = model => {};
}

module.exports = {StorageFactory: new StorageFactory()};
