
import PropTypes from 'prop-types';
import  SearchForm  from 'components/SearchForm/SearchForm';

import styles from "./Searchbar.module.scss";

 
export const Searchbar = ({ onSearch }) => (
   
  <header className={styles.Searchbar}>
    <SearchForm onSearch={onSearch} />
  </header>
);

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
