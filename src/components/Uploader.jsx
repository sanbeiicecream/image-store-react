import { observer, useLocalObservable } from 'mobx-react';
import { Upload, message, Spin, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useStores } from '../stores/index';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const { Dragger } = Upload;
const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`;
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`;
const Image = styled.img`
  max-width: 300px;
`;
const Uploader = observer(() => {
  const ref1 = useRef();
  const ref2 = useRef();
  const store = useLocalObservable(() => ({
    width: null,
    setWidth(width) {
      store.width = width;
    },
    get widthStr() {
      return store.width ? `/thumbnail/${store.width}x` : '';
    },
    height: null,
    setHeight(height) {
      store.height = height;
    },
    get heightStr() {
      return store.height ? `/thumbnail/x${store.height}` : '';
    },
    get fullStr() {
      return (
        ImageStore.serverFile +
        '?imageMogr2/' +
        store.heightStr +
        store.widthStr
      );
    },
  }));
  const { UserStore, ImageStore } = useStores();

  useEffect(() => {
    return () => {
      ImageStore.reset();
    };
  }, []);

  // useEffect(() => {
  //   if(msg){
  //     console.log("🚀 ~ file: Uploader.jsx:60 ~ useEffect ~ msg:", msg)
  //     messageApi.info(msg, 2)
  //     console.log("🚀 ~ file: Uploader.jsx:60 ~ useEffect ~ msg:", 'hhhhhhhh')
  //   }
  // }, [msg])

  const bindWidthChange = () => {
    store.setWidth(ref1.current);
  };

  const bindHeightChange = () => {
    store.setHeight(ref2.current);
  };

  const props = {
    beforeUpload: (file) => {
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传！');
        return false;
      }
      if (file.length > 0) {
        return false;
      }
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/gi.test(file.type)) {
        message.error('只能上传png/svg/jpg/gif格式的文件', 2);
        return false;
      }

      if (file.size > 1024 * 1024 * 5) {
        // message.destroy();
        message.error('图片最大5M', 2);
        // setMsg('图片最大5M')
        console.log(
          '🚀 ~ file: Uploader.jsx:82 ~ Uploader ~ message.error:',
          message.error
        );
        return false;
      }

      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      ImageStore.upload()
        .then(() => {})
        .catch((error) => {
          console.log(error);
          message.error(error.msg, 2);
        });
      return false;
    },

    showUploadList: false,
    disabled: UserStore.currentUser === null,
  };

  return (
    <div>
      <Spin spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>点击或者拖拽上传图片</p>
          <p className='ant-upload-hint'>仅支持图片格式，大小不能超过2M</p>
        </Dragger>
        {/* {msg} */}
      </Spin>
      {ImageStore.serverFile ? (
        <Result>
          <H1>上传结果</H1>
          <dl>
            <dt>线上地址</dt>
            <dd style={{ overflow: 'auto' }}>
              <a href={ImageStore.serverFile} rel='noreferrer' target='_blank'>
                {ImageStore.serverFile}
              </a>
            </dd>
            <dt>文件名</dt>
            <dd>{ImageStore.filename}</dd>
            <dt>图片预览</dt>
            <dd>
              <Image src={ImageStore.serverFile} />
            </dd>
            <dt>更多尺寸</dt>
            <dd>
              <input
                ref={ref1}
                onChange={bindWidthChange}
                placeholder='最大宽度（可选）'
              />
              <input
                ref={ref2}
                onChange={bindHeightChange}
                placeholder='最大高度（可选）'
              />
            </dd>
            <dd style={{ overflow: 'auto' }}>
              <a target='_blank' href={store.fullStr} rel='noreferrer'>
                {store.fullStr}
              </a>
            </dd>
          </dl>
        </Result>
      ) : null}
    </div>
  );
});

export { Uploader };
