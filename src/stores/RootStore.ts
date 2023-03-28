//@flow
import LoginStore from './LoginStore';
import HomeStore from './HomeStore';

export class RootStore {
  _loginStore: LoginStore = new LoginStore();
  _homeStore: HomeStore = new HomeStore();

  get loginStore() {
    return this._loginStore;
  }

  get homeStore() {
    return this._homeStore;
  }
}

const rootStore = new RootStore();

export default rootStore;
