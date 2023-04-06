import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import { Header } from './SearchBar.styled';
import { Form } from './SearchBar.styled';
import { Input } from './SearchBar.styled';
import { SearchButton } from './SearchBar.styled';
import { Label } from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warning('Please enter some data');
      return;
    }
    onSubmit(searchQuery);
    resetQuery();
  };

  const resetQuery = () => {
    setSearchQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <FcSearch size={25} />
          <Label className="button-label">Search</Label>
        </SearchButton>

        <Input
          type="text"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </Form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
