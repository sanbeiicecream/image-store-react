import {useStores} from '../stores'
import styled from 'styled-components'
import {observer} from 'mobx-react'

const Wrapper = styled.div`
  padding: 1em 0.5em;
  border-radius: 0.3em;
  background-color: orange;
  color: #fff;
  margin-bottom: 2em;
`
const Tips = observer(({children}) => {
  const {UserStore} = useStores()
  return(
    !UserStore.currentUser ? <Wrapper>{children}</Wrapper>: <></>
  )
})

export {Tips}