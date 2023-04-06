import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import { Header } from './SearchBar.styled';
import { Form } from './SearchBar.styled';
import { Input } from './SearchBar.styled';
import { SearchButton } from './SearchBar.styled';
import { Label } from './SearchBar.styled';

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.warning('Please enter some data');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.resetQuery();
  };

  resetQuery = () => {
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <FcSearch size={25} />
            <Label className="button-label">Search</Label>
          </SearchButton>

          <Input
            type="text"
            value={this.state.searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </Form>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
