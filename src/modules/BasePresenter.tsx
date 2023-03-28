//@flow
import {NavigationScreenProp} from 'react-navigation';

export default class BasePresenter {
  navigation: NavigationScreenProp<{},{}>;

  constructor(navigation: NavigationScreenProp<{},{}>) {
    this.navigation = navigation;
  }
}
