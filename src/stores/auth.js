import {observable, action, makeObservable} from 'mobx'
import {Auth} from 'models'
import UserStore from 'stores/user'

class AuthStore {
  constructor() {
    makeObservable(this)
  }
  @observable values = {
    username: '',
    password: ''
  }
  
  @action setUsername(username){
    this.values.username = username;
  }
  
  @action setPassword(password){
    this.values.password = password;
  }
  
  @action login(){
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password).then(() => {
        UserStore.pullUser()
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
  
  @action register(){
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password).then(() => {
        UserStore.pullUser()
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
  
  @action logout(){
    Auth.logout().then(() => {
      UserStore.resetUser()
    })
  }
}

export default new AuthStore()