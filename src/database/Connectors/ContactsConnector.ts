import {StorageFactory} from '../StorageFactory';
import {Contacts} from '../models';

class ContactsConnector {
  createSchema() {
    let promise = Promise.Create();

    StorageFactory.create(Contacts)
      .then(() => {
        promise.resolve();
      })
      .catch(err => {
        promise.reject(err);
      });

    return promise;
  }

  async saveContacts(models) {
    let promise = Promise.Create();
    let Realm = await StorageFactory.create(Contacts);

    try {
      Realm.write(() => {
        models.forEach((model, index, arr) => {
          Realm.create(Contacts.schema.name, model.toJSON(), true);
        });
      });

      promise.resolve();
    } catch (err) {
      promise.reject(err);
    }

    return promise;
  }

  async rawFetchContacts(filters) {
    let promise = Promise.Create();

    let Realm = await StorageFactory.create(Contacts);

    let contacts =
      filters !== undefined && filters !== null
        ? Realm.objects(Contacts.schema.name).filtered(filters).sorted('date')
        : Realm.objects(Contacts.schema.name).sorted('date');

    promise.resolve(contacts);
    return promise;
  }

  async fetchContacts(filters) {
    let contacts = await this.rawFetchContacts(filters);
    contacts = contacts.sorted('date');
    let transformedModel = [];

    contacts?.forEach(contact => {
      transformedModel.push(new Contacts(contact.toJSON()));
    });

    return transformedModel;
  }

  async deleteContacts(filters) {
    debugger
    let promise = Promise.Create();
    let Realm = await StorageFactory.create(Contacts);

    try {
      if (filters !== undefined && filters !== null) {
        Realm.write(() => {
          let contacts = Realm.objects(Contacts.schema.name).filtered(filters);

          Realm.delete(contacts);
        });

        promise.resolve();
      } else {
        Realm.write(() => {
          let  contacts = Realm.objects(Contacts.schema.name);

          Realm.delete(contacts);
        });

        promise.resolve();
      }
    } catch (err) {
      promise.reject(err);
    }

    return promise;
  }

  async updateContacts(models) {
    let promise = Promise.Create();
    let Realm = await StorageFactory.create(Contacts);
    let me = this;

    try {
      Realm.write(() => {
        models?.forEach((model, index, arr) => {
          let modularData = JSON.removeUnwantedKeys(model.toJSON());
          Realm.create(Contacts.schema.name, modularData, true);
        });
      });

      promise.resolve();
    } catch (err) {
      promise.reject(err);
    }

    return promise;
  }

  async countContacts(model, filters) {
    let flag = StorageFactory.contains(model);

    if (!flag) return 0;

    let Realm = await StorageFactory.create(Contacts);

    let contacts =
      filters !== undefined && filters !== null
        ? Realm.objects(Contacts.schema.name).filtered(filters)
        : Realm.objects(Contacts.schema.name);

    return contacts.length;
  }
}

export {ContactsConnector};
