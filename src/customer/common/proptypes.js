import PropTypes from 'prop-types';

const CategoryProp = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

const ProductProp = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
});

const CategoriesProp = PropTypes.arrayOf(CategoryProp);

export {CategoryProp, CategoriesProp, ProductProp};
