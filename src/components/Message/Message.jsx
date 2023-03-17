import PropTypes from 'prop-types';
import styles from './Message.module.scss';

export const Message = ({ children }) => (
  <div className={styles.Message}>{children}</div>
);

Message.defaultProps = {
  children: [],
};

Message.propTypes = {
  children: PropTypes.node,
};
