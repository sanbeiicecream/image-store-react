import { observer } from 'mobx-react';
import { List, message, Image, Skeleton, Divider, Button, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStores } from '../stores';
import { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { confirm } = Modal;

const StickyDiv = styled.div`
  display: inline-block;
  position: sticky;
  top: 0px;
  left: 100%;
  z-index: 1000;
  margin: -20px;
  font-size: 12px;
  width: 1em;
  text-align: center;
`;

const ListComponent = observer(() => {
  const { ListStore, UserStore } = useStores();
  const loadMoreData = useCallback(() => {
    ListStore.find()
      .then()
      .catch(() => {
        message.error('获取失败', 2).then(() => {
          UserStore.resetUser();
        });
      });
  }, [ListStore, UserStore]);

  useEffect(() => {
    if (UserStore.currentUser && ListStore.data.length === 0) {
      loadMoreData();
    }
  }, [ListStore.data.length, UserStore.currentUser, loadMoreData]);

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
      onOk() {
        ListStore.deleteId = item.id;
        ListStore.delete()
          .then(() => {
            message.success('删除成功', 0.5).then();
          })
          .catch(error => {
            console.log(error);
            message.error('删除失败', 0.5).then();
          });
      },
      onCancel() {},
    });
  };

  const editImage = () => {
    message.info('开发中...');
  };

  return (
    <>
      {UserStore.currentUser && (
        <StickyDiv>
          <span>共</span>
          {ListStore.count}
          <span>张</span>
        </StickyDiv>
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
        <Spin spinning={ListStore.isFinding || ListStore.isDeleting}>
          <InfiniteScroll
            dataLength={ListStore.data.length}
            next={loadMoreData}
            hasMore={ListStore.hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={
              ListStore.isFinding && <Divider plain>~到底了~</Divider>
            }
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={ListStore.data}
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
});

export { ListComponent };
