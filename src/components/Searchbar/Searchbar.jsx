import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import {
  Searchbar,
  SearchForm,
  Input,
  SearchBtn,
  SearchFormBtnLabel,
} from './Searchbar.styled';

export default class SearhBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('The search field cannot be empty!');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
           <SearchBtn type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchBtn>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="serchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />

        </SearchForm>
      </Searchbar>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};