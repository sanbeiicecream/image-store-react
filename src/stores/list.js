/* eslint-disable import/no-anonymous-default-export */
import { action, makeObservable, observable, runInAction } from 'mobx'
import { Uploader } from '../models'


class ListStore {
  constructor() {
    makeObservable(this)
  }

  @observable data = []
  @observable isFinding = false
  @observable page = 0
  @observable hasMore = false
  @observable deleteId = null
  @observable isDeleting = false
  @observable count = 0
  limit = 5

  @action find() {
    this.isFinding = true
    return new Promise((resolve, reject) => {
      Uploader.find({ page: this.page + 1, limit: Number(this.limit) }).then((res) => {
        runInAction(() => {
          this.count = res.count
          this.data = this.data.concat(res.images)
          this.hasMore = this.data.length < res?.count
          this.page = this.page + 1
        })
      }).catch((error) => {
        reject(error)
      }).finally(() => {
        runInAction(() => {
          this.isFinding = false
        })
      })
    })
  }

  @action delete() {
    const index = this.data.findIndex(item => item.id === this.deleteId)
    this.isDeleting = true
    return new Promise((resolve, reject) => {
      Uploader.delete({ id: this.deleteId }).then(() => {
        runInAction(() => {
          this.data.splice(index, 1)
          this.count -= 1
        })
        resolve()
      }).catch((error) => {
        reject(error)
      })
    }).finally(() => {
      runInAction(() => {
        this.isDeleting = false
      })
    })
  }

  @action reset() {
    this.data = []
    this.page = 0
    this.deleteId = null
    this.hasMore = false
    this.isDeleting = false
  }
}

export default new ListStore()