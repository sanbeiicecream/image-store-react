import { Spin } from 'antd';
import stylex from '@stylexjs/stylex';
const styles = stylex.create({
  spin: {
    height: '10vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Loading() {
  return (
    <div {...stylex.props(styles.spin)}>
      <Spin tip='Loading...' />
    </div>
  );
}

export { Loading };
