import { observer } from 'mobx-react';
import { List, message, Avatar, Skeleton, Divider, Button, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStores } from '../stores';
import { useEffect, useRef } from 'react';
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
`

const ListComponent = observer(() => {
  const { ListStore, UserStore } = useStores();
  const countRef = useRef(0);
  const loadMoreData = () => {
    ListStore.find()
      .then()
      .catch((error) => {
        message.error('获取失败', 2).then();
      });
  };

  useEffect(() => {
    if (
      UserStore.currentUser &&
      ListStore.data.length === 0
    ) {
      countRef.current = 1;
      loadMoreData();
    }
    // return () => {
    //   ListStore.reset();
    // };
  }, []);

  const copyImage = (item) => {
    navigator.clipboard.writeText(item.url).then(() => {
      message.success('复制成功');
    });
  };

  const deleteImage = (item) => {
    confirm({
      title: '是否删除图片',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        ListStore.deleteId = item.id;
        ListStore.delete()
          .then(() => {
            message.success('删除成功', 0.5).then();
          })
          .catch((error) => {
            console.log(error);
            message.error('删除失败', 0.5).then();
          });
      },
      onCancel() {},
    });
  };

  return (
    <>
      {UserStore.currentUser && 
      <StickyDiv> 
        <span>共</span>
        {ListStore.count}
        <span>张</span>
        </StickyDiv>}
      <textarea
        id='urlTextarea'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: 0,
        }}
      />
      <div>
        <Spin spinning={ListStore.isFinding || ListStore.isDeleting}>
          <InfiniteScroll
            dataLength={ListStore.data.length}
            next={loadMoreData}
            hasMore={ListStore.hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>~到底了~</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={ListStore.data}
              itemLayout='horizontal'
              renderItem={(item) => (
                <List.Item
                  key={item.name}
                  actions={[
                    <Button
                      size='small'
                      onClick={() => {
                        copyImage(item);
                      }}
                    >
                      复制
                    </Button>,
                    <Button
                      data-id={item.id}
                      size='small'
                      onClick={() => {
                        deleteImage(item);
                      }}
                    >
                      删除
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item.url}
                        style={{
                          width: '8em',
                          height: '8em',
                          borderRadius: '0',
                        }}
                      />
                    }
                    title={
                      <div
                        style={{
                          maxHeight: '8em',
                          paddingTop: '3em',
                          overflow: 'auto',
                        }}
                      >
                        <a
                          href={item.url}
                          style={{
                            width: '8em',
                            wordWrap: 'break-word',
                          }}
                        >
                          {item.name}
                        </a>
                      </div>
                    }
                    // description={item.attributes.filename}
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
