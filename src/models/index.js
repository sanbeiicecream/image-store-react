import api from '../api/index';
import { requestErrorHandle } from '../utils/errorHandle';

const Auth = {
  async login(username, password) {
    try {
      const blob = await fetch(api.USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
      })
      const json = await blob.json()
      return requestErrorHandle(json);
    } catch (e) {
      console.error(e)
      return { msg: '服务器开了小差，请稍后重试~', success: false }
    }
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
          return requestErrorHandle(json);
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
  async add(file, filename) {
    const formData = new FormData();
    formData.append('filename', filename);
    formData.append('file', file);
    try {
      const blob = await fetch(api.IMAGE_UPLOAD, {
        method: 'POST',
        headers: {
          // 'Content-Type': '',
          authorization: localStorage.getItem('authorization'),
        },
        body: formData,
      })
      const json = await blob.json()
      return requestErrorHandle(json);
    } catch (e) {
      console.error(e)
      return ({ msg: '服务器开了小差，请稍后重试~', success: false });
    }
  },

  async find({ page, limit }) {
    try {
      const blob = await fetch(api.IMAGE_Find, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: localStorage.getItem('authorization'),
        },
        body: `page=${page}&size=${limit}`,
      })
      const json = await blob.json()
      return requestErrorHandle(json);
    } catch (e) {
      console.error(e)
      return ({ success: false, msg: '服务器开了小差，请稍后重试~' });
    }
  },

  async delete({ id }) {
    try {
      const blob = await fetch(api.IMAGE_REMOVE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          authorization: localStorage.getItem('authorization'),
        },
        body: `id=${id}`,
      })
      const res = await blob.json()
      return requestErrorHandle(res);
    } catch (e) {
      console.error(e)
      return { msg: '服务器开了小差，请稍后重试~', success: false }
    }
  },
};

export { Auth, Uploader };
