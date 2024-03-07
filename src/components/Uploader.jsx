import { observer, useLocalObservable } from 'mobx-react';
import { Upload, message, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useStores } from '../stores/index';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { judgeFileType } from '@/utils/tool';
import { useAtom } from 'jotai';
import { globalStateAtom } from '@/main.jsx';

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

const Uploader = observer(() => {
  const [globalState, setGlobalState] = useAtom(globalStateAtom);
  const ref1 = useRef();
  const ref2 = useRef();
  const store = useLocalObservable(() => ({
    width: null,
    height: null,
    setWidth(width) {
      this.width = width;
    },
    setHeight(height) {
      this.height = height;
    },
    get widthStr() {
      return `width=${this.width || ''}`;
    },
    get heightStr() {
      return `height=${this.height || ''}`;
    },
    get fullStr() {
      if (this.widthStr || this.heightStr) {
        return `${ImageStore.serverFile}?${this.widthStr}&${this.heightStr}`;
      }
      return ImageStore.serverFile;
    },
  }));
  const { UserStore, ImageStore, ListStore } = useStores();

  useEffect(() => {
    return () => {
      // ImageStore.reset();
    };
  }, [ImageStore]);

  const bindWidthChange = () => {
    store.setWidth(ref1.current.value);
  };

  const bindHeightChange = () => {
    store.setHeight(ref2.current.value);
  };

  const props = {
    beforeUpload: async file => {
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传！');
        return false;
      }
      if (file.length > 0) {
        return false;
      }
      if (file.size > 1024 * 1024 * 5) {
        message.error('最大上传大小5M', 2);
        return false;
      }
      if (!(await judgeFileType(file))) {
        message.error('只能上传图片格式的文件', 2);
        return false;
      }
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      setGlobalState({ ...globalState, loading: true });
      ImageStore.upload()
        .then(() => {
          message.success('上传成功');
          ListStore.reset();
        })
        .catch(error => {
          console.log(error);
          message.error(error.msg, 2);
        })
        .finally(() => {
          setGlobalState({ ...globalState, spinning: false });
        });
      return false;
    },
    accept: 'image/*',
    showUploadList: false,
    disabled: UserStore.currentUser === null,
  };

  return (
    <div>
      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>点击或者拖拽上传图片</p>
        <p className='ant-upload-hint'>仅支持图片格式，大小不能超过5M</p>
      </Dragger>
      {/* {msg} */}
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
              <Image
                src={`${ImageStore.serverFile}?width=300`}
                preview={{ src: store.fullStr }}
              />
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
