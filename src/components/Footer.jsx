import styled from 'styled-components'

const StyleFooter = styled.footer`
  text-align: center;
  font-size: 0.8rem;
  color: #aaa;
  padding: 1em 10em;
`
function Footer(){
  return(
    <>
      <StyleFooter>
        <p>&copy;相信美好的事情即将发生~</p>
      </StyleFooter>
    </>
  )
}

export {Footer}