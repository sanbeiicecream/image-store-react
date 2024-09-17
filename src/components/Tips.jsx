import PropTypes from 'prop-types';
import stylex from '@stylexjs/stylex';
import { useStore } from '../stores';

const styles = stylex.create({
  div: {
    padding: '1em 0.5em',
    borderRadius: '0.3em',
    backgroundColor: 'orange',
    color: '#fff',
    marginBottom: '2em',
  },
});

const Tips = ({ children }) => {
  const currentUser = useStore(state => state.currentUser);
  return !currentUser ? (
    <div {...stylex.props(styles.div)}>{children}</div>
  ) : (
    <></>
  );
};

Tips.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Tips };
