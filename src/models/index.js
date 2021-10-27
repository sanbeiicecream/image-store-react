import AV, {User} from 'leancloud-storage'
import COS from 'cos-js-sdk-v5'

// 腾讯云cos的初始化信息
const Bucket = 'xxxxxxxxxxxxx'
const Region = 'xxxxxxxxxxxxxxx'

// LeanCloud的初始化信息
AV.init({
  appId: 'xxxxxxxxxx',
  appKey: 'xxxxxxxxxxxxxx',
  serverURL: 'xxxxxxxxxxxxxxxxxx'
})

const Auth = {
  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then((user) => {
        resolve(user)
      }, (error) => {
        reject(error)
      })
    })
  },
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then((user) => {
        resolve(user)
      }, (error) => {
        reject(error)
      })
    })
  },
  logout() {
    return User.logOut()
  },
  getCurrentUser() {
    return User.current()
  }
}

const Uploader = {
  cos: new COS({
    getAuthorization: function (options, callback) {
      const url = 'xxxxxxxxxxxxxxxxx' // 这里替换成您的服务接口地址
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.onload = function (e) {
        let data
        let credentials
        try {
          data = JSON.parse(e.target.responseText)
          credentials = data.credentials
        } catch (e) {
        }
        if (!data || !credentials) return console.error('credentials invalid')
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000，建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
        })
      }
      xhr.send()
    }
  }),
  add(file, filename) {
    return new Promise((resolve, reject) => {
      this.cos.sliceUploadFile({
          Bucket: Bucket,
          Region: Region,
          Key: filename,
          Body: file,
          onHashProgress: function (progressData) {
            console.log('校验中', JSON.stringify(progressData))
          },
          onProgress: function (progressData) {
            console.log('上传中', JSON.stringify(progressData))
          },
        },
        function (error, data) {
          if (error) {
            reject(error)
          } else {
            const url = 'https://' + data.Location
            const item = new AV.Object('Image')
            const avFile = new AV.File.withURL(filename, url)
            item.set('filename', filename)
            item.set('owner', AV.User.current())
            item.set('url', avFile)
            item.save().then(() => resolve(url)).catch(error => reject(error))
          }
        })
    })
  },
  
  find({page, limit}) {
    const query = new AV.Query('Image')
    query.include('owner')
    query.equalTo('owner', User.current())
    query.limit(limit)
    query.skip(page * limit)
    query.descending('createdAt')
    return new Promise((resolve, reject) => {
      query.find().then(list => resolve(list)).catch(error => reject(error))
    })
  },
  
  delete({id, filename}) {
    return new Promise((resolve, reject) => {
      this.queryCount({name: filename}).then((count) => {
        const image = AV.Object.createWithoutData('Image', id + '')
        image.destroy().then((data) => {
          if (count === 1) {
            this.cos.deleteObject({
              Bucket, /* 必须 */
              Region,     /* 存储桶所在地域，必须字段 */
              Key: filename        /* 必须 */
            }, function (error, data) {
              if (error) {
                reject(error)
              } else if (data) {
                resolve()
              }
            })
          } else {
            resolve()
          }
        }).catch((error) => {
          reject(error)
        })
      }).catch((error) => {
        reject(error)
      })
    })
  },
  queryCount({name}) {
    const query = new AV.Query('Image')
    query.equalTo('filename', name)
    return new Promise((resolve, reject) => {
      query.count().then((count) => {
        resolve(count)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

window.uploader = Uploader

export {Auth, Uploader}