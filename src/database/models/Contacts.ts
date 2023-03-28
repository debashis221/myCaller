class Contacts {
  static schema = {
    name: 'Contacts',
    primaryKey: 'key',
    properties: {
      number: 'string?',
      date: 'string?',
      name: 'string?',
      email: 'string?',
      result: 'string?',
      profileIcon: 'string?',
      key: 'string?',
    },
  };

  static Version = 3270;
  static Migrate = (oldModel, newModel) => {};

  constructor(data) {
    this._number = data ? data.number : undefined;
    this._date = data ? data.date : undefined;
    this._result = data ? data.result : undefined;
    this._name = data ? data.name : undefined;
    this._email = data ? data.email : undefined;
    this._profileIcon = data ? data.profileIcon : undefined;
    this._key = data ? data.key : undefined;
  }

  get number() {
    return this._number;
  }
  set number(value) {
    this._number = value;
  }

  get date() {
    return this._date;
  }
  set date(value) {
    this._date = value;
  }

  get result() {
    return this._result;
  }
  set result(value) {
    this._result = value;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get email() {
    return this._email;
  }
  set email(value) {
    this._email = value;
  }

  get profileIcon() {
    return this._profileIcon;
  }
  set profileIcon(value) {
    this._profileIcon = value;
  }

  get key() {
    return this._key;
  }
  set key(value) {
    this._key = value;
  }

  toJSON() {
    return {
      number: this._number,
      date: this._date,
      result: this._result,
      name: this._name,
      email: this._email,
      profileIcon: this._profileIcon,
      key: this._key,
    };
  }
}
export {Contacts};
