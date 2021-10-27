import {action, makeObservable, observable, runInAction} from 'mobx'
import {Uploader} from '../models'

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
      Uploader.add(this.file, this.filename).then((serveFile) => {
        runInAction(() => {
          this.serverFile = serveFile
        })
        resolve(serveFile)
      }).catch((error) => {
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