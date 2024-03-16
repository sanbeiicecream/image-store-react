import { Uploader } from '@/models';


export const imageStore = (set, get) => ({
  uploadFileUrl: null,
  file: null,
  filename: '',
  info: {
    startingByte: 0,
    fileId: '',
  },
  setFileInfo: (file, filename) => {
    set({ file, filename })
  },
  uploadFile: async () => {
    set({ uploadFileUrl: null })
    const res = await Uploader.add(get().file, get().filename)
    set({ uploadFileUrl: res?.data?.url })
    return res
  },
  resetFileInfo: () => {
    set({ uploadFileUrl: null })
  }
})