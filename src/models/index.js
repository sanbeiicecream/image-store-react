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
        .then(blob => blob.json())
        .then(json => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '服务器开了小差，请稍后重试~' });
        });
    });
  },
  register(username, password) {
    return new Promise((resolve, reject) => {
      fetch(api.USER_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
      })
        .then(blob => blob.json())
        .then(json => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '服务器开了小差，请稍后重试~' });
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
        .then(blob => blob.json())
        .then(res => {
          const tem = requestErrorHandle(res);
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '服务器开了小差，请稍后重试~' });
        });
    });
  },
};

const Uploader = {
  add(file, filename) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('filename', filename);
      formData.append('file', file);
      fetch(api.IMAGE_UPLOAD, {
        method: 'POST',
        headers: {
          // 'Content-Type': '',
          authorization: localStorage.getItem('authorization'),
        },
        body: formData,
      })
        .then(blob => blob.json())
        .then(json => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '服务器开了小差，请稍后重试~' });
        });
    });
  },

  find({ page, limit }) {
    return new Promise((resolve, reject) => {
      fetch(api.IMAGE_Find, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: localStorage.getItem('authorization'),
        },
        body: `page=${page}&size=${limit}`,
      })
        .then(blob => blob.json())
        .then(json => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '服务器开了小差，请稍后重试~' });
        });
    });
  },

  delete({ id }) {
    return new Promise((resolve, reject) => {
      fetch(api.IMAGE_REMOVE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: localStorage.getItem('authorization'),
        },
        body: `id=${id}`,
      })
        .then(blob => blob.json())
        .then(json => {
          const tem = requestErrorHandle(json);
          tem.success ? resolve(tem.data) : reject(tem);
        })
        .catch(() => {
          reject({ msg: '服务器开了小差，请稍后重试~' });
        });
    });
  },
};

export { Auth, Uploader };
