import styled from 'styled-components';

const StyleFooter = styled.footer`
  height: 4vh;
  padding-top: 8px;
  text-align: center;
  font-size: 0.8rem;
  color: #aaa;
  overflow: hidden;
`;
function Footer() {
  return (
    <>
      <StyleFooter>
        <p>&copy;相信美好的事情即将发生~</p>
      </StyleFooter>
    </>
  );
}

export { Footer };
