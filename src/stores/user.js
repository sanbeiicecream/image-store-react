import { action, makeObservable, observable, runInAction } from 'mobx';
import { Auth } from 'models';

class UserStore {
  constructor() {
    makeObservable(this);
  }
  @observable currentUser = null;

  @action pullUser(resolve, reject) {
    Auth.getCurrentUser()
      .then((res) => {
        runInAction(() => {
          this.currentUser = res;
        });
        resolve()
      })
      .catch((res) => {
        reject(res);
        this.resetUser();
      });
  }

  @action initalUser(){
    return new Promise((resolve, reject) => {
      this.pullUser(resolve, reject)
    })
  }

  @action resetUser() {
    this.currentUser = null;
    localStorage.removeItem('authorization');
  }
}
const store = new UserStore();
export default store;
