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
      const formData = new FormData()
      formData.append('filename', filename)
      formData.append('file', file)
      fetch(api.IMAGE_UPLOAD, {
        method: 'POST',
        headers: {
          // 'Content-Type': '',
          authorization: localStorage.getItem('authorization')
        },
        body: formData,
      })
        .then((blob) => blob.json())
        .then((json) => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        }).catch(() => {
          reject({ msg: '网络错误' })
        })
    })
  },

  find({page,limit}) {
    return new Promise((resolve, reject) => {
      fetch(api.IMAGE_Find,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: localStorage.getItem('authorization'),
        },
        body:  `page=${page}&size=${limit}`
      }).then(blob => blob.json()).then(json => {
        const tem = requestErrorHandle(json)
        tem.success ? resolve(tem.data) : reject(tem);
      }).catch(() => {
        reject({msg: '网络错误'})
      })
    })
  },

  delete({ id }) {
    return new Promise((resolve, reject) => {
      fetch(api.IMAGE_REMOVE,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: localStorage.getItem('authorization'),
        },
        body:  `id=${id}`
      }).then(blob => blob.json()).then(json => {
        const tem = requestErrorHandle(json)
        tem.success ? resolve(tem.data) : reject(tem);
      }).catch(() => {
        reject({msg: '网络错误'})
      })
    })
  },
}


export { Auth, Uploader};
