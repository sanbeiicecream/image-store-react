import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  image: {
    height: {
      default: '23em',
      '@media(max-width: 550px)': null,
    },
    width: {
      default: null,
      '@media(max-width: 550px)': '80vw',
    },
    opacity: '0.8',
    backgroundSize: 'cover',
  },
});

function About() {
  return (
    <>
      <img
        className='aboutImage'
        src={`https://image.jysgdyc.top/image-store/3%20(15).jpg?height=${
          23 * 16
        }`}
        {...stylex.props(styles.image)}
      />
      <article>
        <h1>项目介绍</h1>
        <p style={{ fontSize: '1em' }}>
          前端使用Vite、React、React-Router、Zustand、Ant Design、StyleX完成
          <br />
          后端使用EggJS、MariaDB、开源分布式对象存储minio、imgproxy完成
        </p>
        <h2>个人介绍</h2>
        <p>爱好编程，主业前端，游戏佛系玩家</p>
        <br />
        <h3>
          <b>请不要上传重要图片！！！测试账号：test/123456</b>
        </h3>
      </article>
    </>
  );
}

export default About;
