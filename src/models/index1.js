import api from '../api/index';
import { requestErrorHandle } from '../utils/errorHandle';

const Auth = {
  login(username, password) {
    return new Promise((resolve, reject) => {
      fetch(api.USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
      })
        .then((blob) => blob.json())
        .then((json) => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        }).catch(() => {
          reject({msg: '网络错误'})
        })
    });
  },
  register(username, password) {
    return new Promise((resolve, reject) => {
      console.log(
        '🚀 ~ file: index1.js:46 ~ returnnewPromise ~ api.USER_REGISTER:',
        api.USER_REGISTER
      );
      fetch(api.USER_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
      })
        .then((blob) => blob.json())
        .then((json) => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '网络错误' });
        });
    });
  },
  getCurrentUser() {
    // return User.current()
    return new Promise((resolve, reject) => {
      fetch(api.USER, {
        method: 'GET',
        headers: { authorization: localStorage.getItem('authorization') },
      })
        .then((blob) => blob.json())
        .then((res) => {
          const tem = requestErrorHandle(res);
          debugger
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '网络错误' });
        });
    });
  },
};

const Uploader = {
  add(file, filename) {
    return new Promise((resolve, reject) => {
    })
  },

  find() {
    return new Promise((resolve, reject) => {
    })
  },

  delete({ id, filename }) {
    return new Promise((resolve, reject) => {
      this.queryCount({ name: filename }).then((count) => {
      }).catch((error) => {
        reject(error)
      })
    })
  },
  queryCount({ name }) {
  }
}


export { Auth, Uploader};
