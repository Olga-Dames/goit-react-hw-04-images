import React from 'react';
import PropTypes from 'prop-types';
import { LoadMore } from './Button.styled';

const Button = ({ onClickLoad }) => {
  return (
    <LoadMore type="button" onClick={onClickLoad}>
      Load More
    </LoadMore>
  );
};

export default Button;

Button.propTypes = {
  onClickLoad: PropTypes.func.isRequired,
};
