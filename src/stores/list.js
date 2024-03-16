import { Uploader } from '@/models'


export const listStore = (set, get) => ({
  listData: [],
  page: 0,
  listHasMore: false,
  listIsDeleting: false,
  listIsFinding: false,
  listCount: 0,
  findList: async () => {
    set({ listIsFinding: true })
    const res = await Uploader.find({ page: get().page + 1, limit: 5 })
    if (res.success) {
      set({
        listCount: res.data?.count,
        listData: get().listData.concat(res.data?.images),
        listHasMore: res.data?.images?.length + get().listData?.length < res.data?.count,
        page: get().page + 1
      })
    }
    set({ listIsFinding: false })
  },
  deleteListItem: async id => {
    const index = get().listData.findIndex(item => item.id === id)
    set({ listIsDeleting: true })
    const res = await Uploader.delete({ id })
    get().listData.splice(index, 1)
    if (res.success) {
      set({ listData: get().listData, count: get().count-- })
    }
    set({ listIsDeleting: false })
    return res
  },
  resetList: () => {
    set({
      listData: [],
      page: 0,
      listHasMore: false,
      listIsDeleting: false
    })
  }
})