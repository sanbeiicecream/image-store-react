import { observable, action, makeObservable } from 'mobx'
import { Auth } from '@/models'
import UserStore from '@/stores/user'

class AuthStore {
  constructor() {
    makeObservable(this)
  }
  @observable values = {
    username: '',
    password: ''
  }

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password).then((res) => {
        localStorage.setItem('authorization', res?.authorization);
        UserStore.pullUser(resolve, reject)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then((res) => {
        localStorage.setItem('authorization', res?.authorization);
        UserStore.pullUser(resolve, reject)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  @action logout() {
    UserStore.resetUser()
  }
}
const store = new AuthStore()
export default store