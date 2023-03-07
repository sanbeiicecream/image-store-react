import styled from 'styled-components'

function About() {
  const Image = styled.img`
    height: 23em;
    opacity: 0.8;
    background-size: cover;
  `
  return (
      <>
        <Image className="aboutImage" src='https://image-1307492948.cos.ap-nanjing.myqcloud.com/3%20%2815%29.jpg'/>
        <article>
          <h1>项目介绍</h1>
          <p style={{fontSize:"1em"}}>前端使用React Hooks,React-Router,MobX,Ant Design完成；后端使用EggJS，开源分布式对象存储minio完成</p>
          <h2>个人介绍</h2>
          <p>前端新人，爱好编程，游戏佛系玩家</p>
          <br/>
          <h3><b>请不要上传重要图片！！！</b></h3>
        </article>
      </>
  )
}

export default About