import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm';

 const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  
  const handleSearchInput = e => {
    const { value } = e.currentTarget;

    setQuery(value);
  };

  
  const handleSubmit = e => {
    e.preventDefault();

    
    if (!query.trim()) return;

    
    onSearch(query);

    resetForm();
  };

  
  const resetForm = () => setQuery('');

  return (
    <form className={styles.SearchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles['SearchForm-button']}>
        <span className={styles['SearchForm-button-label']}>Search</span>
      </button>

      <input
        className={styles['SearchForm-input']}
        type="text"
        name="query"
        value={query}
        onChange={handleSearchInput}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
