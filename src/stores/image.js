import {action, makeObservable, observable, runInAction} from 'mobx'
// import {Uploader} from '../models/index'
import {Uploader} from '../models/index1'

class ImageStore {
  constructor() {
    makeObservable(this)
  }
  @observable serverFile = null
  @observable file = null
  @observable filename = ''
  @observable isUploading = false
  
  @action setFile(file){
    this.file = file
  }
  
  @action setFilename(filename){
    this.filename = filename
  }
  
  @action upload() {
    this.isUploading = true;
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename).then((res) => {
        runInAction(() => {
          this.serverFile = res.url
        })
        resolve(res.url)
      }).catch((error) => {
        console.log("🚀 ~ file: image.js:32 ~ ImageStore ~ Uploader.add ~ error:", error)
        reject(error)
      }).finally(() => {
        runInAction(() => {
          this.isUploading = false
        })
      })
    })
  }
  
  @action reset(){
    this.serverFile = null;
  }
}

export default new ImageStore()