import {observer, useLocalObservable} from 'mobx-react'
import {Upload, message, Spin} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import {useStores} from '../stores'
import styled from 'styled-components'
import {useEffect, useRef} from 'react'

const {Dragger} = Upload
const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
`
const Uploader = observer(() => {
  const ref1 = useRef()
  const ref2 = useRef()
  const store = useLocalObservable(() => ({
    width: null,
    setWidth(width) {
      store.width = width
    },
    get widthStr() {
      return store.width ? `/thumbnail/${store.width}x` : ''
    },
    height: null,
    setHeight(height) {
      store.height = height
    },
    get heightStr() {
      return store.height ? `/thumbnail/x${store.height}` : ''
    },
    get fullStr() {
      return ImageStore.serverFile + '?imageMogr2/' + store.heightStr + store.widthStr
    }
  }))
  
  useEffect(() => {
    return () => {
      ImageStore.reset()
    }
  }, [])
  
  const bindWidthChange = () => {
    store.setWidth(ref1.current.value)
  }
  
  const bindHeightChange = () => {
    store.setHeight(ref2.current.value)
  }
  
  const {UserStore, ImageStore} = useStores()
  const props = {
    beforeUpload: (file) => {
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传！').then()
        return false
      }
      if (file.length > 0) {
        return false
      }
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
        message.error('只能上传png/svg/jpg/gif格式的文件', 2).then()
        return false
      }
      
      if (file.size > 1024 * 1024 * 2){
        message.error('图片最大2M',2).then()
        return false
      }
      
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      ImageStore.upload().then((serverFile) => {
      
      }).catch((error) => {
        console.log(error)
      })
      return false
    },
    showUploadList: false
  }
  return (
    <div>
      <Spin spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击或者拖拽上传图片</p>
          <p className="ant-upload-hint">
            仅支持.png/.gif/.jpg/./jpeg/.svg/.gif格式的图片，大小不能超过2M
          </p>
        </Dragger>
      </Spin>
      {
        ImageStore.serverFile ? <Result>
          <H1>上传结果</H1>
          <dl>
            <dt>线上地址</dt>
            <dd style={{overflow: 'auto'}}><a href={ImageStore.serverFile} rel="noreferrer"
                                              target="_blank">{ImageStore.serverFile}</a>
            </dd>
            <dt>文件名</dt>
            <dd>{ImageStore.filename}</dd>
            <dt>图片预览</dt>
            <dd>
              <Image src={ImageStore.serverFile}/>
            </dd>
            <dt>更多尺寸</dt>
            <dd>
              <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度（可选）"/>
              <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
            </dd>
            <dd style={{overflow: 'auto'}}>
              <a target="_blank" href={store.fullStr} rel="noreferrer">{store.fullStr}</a>
            </dd>
          </dl>
        </Result> : null
      }
    </div>
  )
})

export {Uploader}