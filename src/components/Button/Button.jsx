import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

const Button = ({ page, onClick }) => {
  let pageNumber = page;
  const handleClick = evt => {
    pageNumber += 1;
    onClick(pageNumber);
  };

  return (
    <LoadMoreButton type="button" onClick={handleClick}>
      Load More
    </LoadMoreButton>
  );
};

export default Button;

Button.propTypes = {
  props: PropTypes.shape({
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};
