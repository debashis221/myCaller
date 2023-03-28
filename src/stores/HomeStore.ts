import {observable, action} from 'mobx';

export default class HomeStore {
  @observable moreData: any = [];
  @observable keyData: any = null;
  @observable premiumData: any = null;
  @observable protectData: any = null;
  @observable isLoading: boolean = false;
  @observable notificationStatus: boolean = false;
  @observable profileData: any = null;

  @action reset = () => {
    this.premiumData = null;
    this.protectData = null;
    this.isLoading = false;
    this.notificationStatus = false;
    this.profileData = null;
  };
}
