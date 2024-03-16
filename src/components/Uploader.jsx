import { Upload, message, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useStore } from '@/stores';
import { useRef } from 'react';
import { judgeFileType } from '@/utils/tool';
import stylex from '@stylexjs/stylex';
import { create } from 'zustand';

const { Dragger } = Upload;

const styles = stylex.create({
  result: {
    marginTop: '30px',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: '#ccc',
    padding: '20px',
  },
  title: {
    margin: '20px 0',
    textAlign: 'center',
  },
  marginTB8: {
    margin: '8px 0',
  },
});

const useLocalStore = create(set => ({
  widthStr: 'width=',
  heightStr: 'height=',
  setWidth: width => {
    set({
      widthStr: `width=${width || ''}`,
    });
  },
  setHeight: height => {
    set({ heightStr: `height=${height || ''}` });
  },
}));

const Uploader = () => {
  const setLoading = useStore(state => state.setLoading);
  const ref1 = useRef();
  const ref2 = useRef();
  const resetList = useStore(state => state.resetList);
  const currentUser = useStore(state => state.currentUser);
  const setFileInfo = useStore(state => state.setFileInfo);
  const uploadFile = useStore(state => state.uploadFile);
  const uploadFileUrl = useStore(state => state.uploadFileUrl);
  const filename = useStore(state => state.filename);
  const setWidth = useLocalStore(state => state.setWidth);
  const setHeight = useLocalStore(state => state.setHeight);
  const heightStr = useLocalStore(state => state.heightStr);
  const widthStr = useLocalStore(state => state.widthStr);

  const fullStr = `${uploadFileUrl}?${widthStr}&${heightStr}`;

  const bindWidthChange = () => {
    setWidth(ref1.current.value);
  };

  const bindHeightChange = () => {
    setHeight(ref2.current.value);
  };

  const props = {
    beforeUpload: async file => {
      if (currentUser === null) {
        message.warning('请先登录再上传！');
        return false;
      }
      if (file.length > 0) {
        return false;
      }
      if (file.size > 1024 * 1024 * 5) {
        message.warning('最大上传大小5M', 2);
        return false;
      }
      if (!(await judgeFileType(file))) {
        message.warning('只能上传图片格式的文件', 2);
        return false;
      }
      setFileInfo(file, file.name);
      setLoading(true);
      uploadFile()
        .then(() => {
          message.success('上传成功');
          resetList();
        })
        .catch(error => {
          message.error(error.msg, 2);
        })
        .finally(() => {
          setLoading(false);
        });
      return false;
    },
    accept: 'image/*',
    showUploadList: false,
    disabled: currentUser === null,
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
      {uploadFileUrl ? (
        <div {...stylex.props(styles.result)}>
          <h1 {...stylex.props(styles.title)}>上传结果</h1>
          <dl>
            <dt>线上地址</dt>
            <dd style={{ overflow: 'auto' }}>
              <a href={uploadFileUrl} rel='noreferrer' target='_blank'>
                {uploadFileUrl}
              </a>
            </dd>
            <dt>文件名</dt>
            <dd>{filename}</dd>
            <dt>图片预览</dt>
            <dd>
              <Image
                src={`${uploadFileUrl}?width=300`}
                preview={{ src: uploadFileUrl }}
              />
            </dd>
            <dt>更多尺寸</dt>
            <dd>
              <input
                ref={ref1}
                onChange={bindWidthChange}
                placeholder='最大宽度（可选）'
                {...stylex.props(styles.marginTB8)}
              />
              <input
                ref={ref2}
                onChange={bindHeightChange}
                placeholder='最大高度（可选）'
                {...stylex.props(styles.marginTB8)}
              />
            </dd>
            <dd style={{ overflow: 'auto' }}>
              <a target='_blank' href={fullStr} rel='noreferrer'>
                {fullStr}
              </a>
            </dd>
          </dl>
        </div>
      ) : null}
    </div>
  );
};

export { Uploader };
