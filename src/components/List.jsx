import {observer} from 'mobx-react'
import {List, message, Avatar, Skeleton, Divider, Button, Spin} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import {useStores} from '../stores'
import {useEffect} from 'react'
import {Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'

const {confirm} = Modal

const ListComponent = observer(() => {
  const {ListStore, UserStore} = useStores()
  const loadMoreData = () => {
    ListStore.find().then().catch((error) => {
      message.error(error, 2).then()
    })
  }
  
  const buttonClick = (event) => {
    event.stopPropagation()
    if ((event.target.nodeName === 'SPAN' && event.target.textContent === '复 制') || (event.target.childNodes[0].nodeName === 'SPAN' && event.target.childNodes[0].textContent === '复 制')) {
      message.warning('功能未完成', 2).then()
    } else if ((event.target.nodeName === 'SPAN' && event.target.textContent === '删 除') || (event.target.childNodes[0].nodeName === 'SPAN' && event.target.childNodes[0].textContent === '删 除')) {
      let id = event.target.parentNode.dataset.id
      if (event.target.childNodes[0].nodeName === 'SPAN'){
        id = event.target.dataset.id
      }
      confirm({
        title: '是否删除图片',
        icon: <ExclamationCircleOutlined/>,
        content: '',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
          ListStore.deleteId = id
          ListStore.delete().then(() => {
            message.success('删除成功', 0.5).then()
          }).catch((error) => {
            console.log(error)
            message.error('删除失败', 0.5).then()
          })
        },
        onCancel() {
        },
      })
    }
  }
  
  useEffect(() => {
    if (UserStore.currentUser && ListStore.data.length === 0){
      loadMoreData()
    }
    return () => {
      ListStore.reset()
    }
  }, [])
  
  return (
    <div onClick={buttonClick}>
      <Spin spinning={ListStore.isFinding || ListStore.isDeleting}>
        <InfiniteScroll
          dataLength={ListStore.data.length}
          next={loadMoreData}
          hasMore={ListStore.hasMore}
          loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
          endMessage={<Divider plain>~到底了~</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={ListStore.data}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item key={item.id}
                         actions={[<Button size="small">复制</Button>,
                           <Button data-id={item.id} size="small">删除</Button>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.attributes.url.attributes.url}
                                  style={{width: '8em', height: '8em', borderRadius: '0'}}/>}
                  title={<div style={{maxHeight: '8em', overflow: 'auto'}}><a href={item.attributes.url.attributes.url}
                                                                              style={{
                                                                                width: '8em',
                                                                                wordWrap: 'break-word'
                                                                              }}>{item.attributes.url.attributes.url}</a>
                  </div>}
                  description={item.attributes.filename}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Spin>
    
    </div>
  )
})

export {ListComponent}