import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  footer: {
    display: 'flex',
    height: '4vh',
    fontSize: '0.8rem',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#aaa',
  },
});

function Footer() {
  return (
    <>
      <footer {...stylex.props(styles.footer)}>
        &copy;相信美好的事情即将发生~
      </footer>
    </>
  );
}

export { Footer };
