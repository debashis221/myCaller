import {observable, action} from 'mobx';
import rootStore from './RootStore';

export default class LoginStore {
  @observable keyData: any = null;
  @observable uuid: string | number[] = '';
  @observable countryCodeValues: any = null;
  @observable countryCodeValue: any = null;
  @observable mobileNumber: string = '';
  @observable otp: string = '';
  @observable isLoading: boolean = false;
  @observable isLogin: boolean = false;
  @observable currentOS: string = '';
  @observable email: any = '';
  @observable notificationStatus: boolean = false;
  @observable urlData: any = {};
  @observable token: any = '';
  @observable isFirstTimeUser: boolean = false;
  @observable otpSize: any = '';
  @observable deviceName: any = '';

  @action reset = () => {
    this.mobileNumber = '';
    this.otp = '';
    this.isLoading = false;
    this.isLogin = false;
    this.email = '';
    this.notificationStatus = false;
    this.token = '';
    this.isFirstTimeUser = false;
  };
}
