import { List, message, Image, Skeleton, Divider, Button, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStore } from '../stores';
import { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import stylex from '@stylexjs/stylex';

const { confirm } = Modal;
const styles = stylex.create({
  sticky: {
    display: 'inline-block',
    position: 'sticky',
    top: '0',
    left: '100%',
    zIndex: '1000',
    margin: '-20px',
    fontSize: '12px',
    width: '1em',
    textAlign: 'center',
  },
});

const ListComponent = () => {
  const findList = useStore(state => state.findList);
  const listData = useStore(state => state.listData);
  const listHasMore = useStore(state => state.listHasMore);
  const listCount = useStore(state => state.listCount);
  const listIsFinding = useStore(state => state.listIsFinding);
  const listIsDeleting = useStore(state => state.listIsDeleting);
  const deleteListItem = useStore(state => state.deleteListItem);
  const resetUser = useStore(state => state.resetUser);
  const currentUser = useStore(state => state.currentUser);
  const loadMoreData = useCallback(() => {
    findList()
      .then()
      .catch(() => {
        message.error('获取失败', 2).then(() => {
          resetUser();
        });
      });
  }, [findList, resetUser]);

  useEffect(() => {
    if (currentUser && listData.length === 0) {
      loadMoreData();
    }
  }, [listData, currentUser, loadMoreData]);

  const copyImageURL = item => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(item.url)
        .then(() => {
          message.success('复制成功');
        })
        .catch(() => {
          message.warning('复制失败');
        });
    } else {
      const textarea = document.querySelector('#urlTextarea');
      textarea.value = item.url;
      textarea?.select();
      if (document?.execCommand('copy')) {
        message.success('复制成功');
      } else {
        message.warning('复制失败');
      }
      textarea.value = '';
    }
  };

  const deleteImage = item => {
    confirm({
      title: '是否删除图片',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      centered: true,
      async onOk() {
        const res = await deleteListItem(item.id);
        if (res?.success) {
          message.success('删除成功', 0.5).then();
        } else {
          message.error('删除失败', 0.5).then();
        }
      },
      onCancel() {},
    });
  };

  const editImage = () => {
    message.info('开发中...');
  };

  return (
    <>
      {currentUser && (
        <div {...stylex.props(styles.sticky)}>
          <span>共</span>
          {listCount}
          <span>张</span>
        </div>
      )}
      <textarea
        id='urlTextarea'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <div>
        <Spin spinning={listIsFinding || listIsDeleting}>
          <InfiniteScroll
            dataLength={listData.length}
            next={loadMoreData}
            hasMore={listHasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={listIsFinding && <Divider plain>~到底了~</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={listData}
              itemLayout='horizontal'
              renderItem={item => (
                <List.Item
                  key={item.name}
                  actions={[
                    <Button
                      size='small'
                      onClick={() => {
                        copyImageURL(item);
                      }}
                      key={item.id}
                    >
                      复制
                    </Button>,
                    <Button
                      data-id={item.id}
                      size='small'
                      onClick={() => {
                        deleteImage(item);
                      }}
                      key={item.id}
                    >
                      删除
                    </Button>,
                    <Button
                      data-id={item.id}
                      size='small'
                      onClick={() => {
                        editImage(item);
                      }}
                      key={item.id}
                    >
                      编辑
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={`${item.url}?width=${12 * 16}`}
                        style={{
                          width: '12em',
                          height: '8em',
                          borderRadius: '0',
                        }}
                        preview={{
                          src: item.url,
                        }}
                      />
                    }
                    title={<span>{item.name}</span>}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Spin>
      </div>
    </>
  );
};

export { ListComponent };
