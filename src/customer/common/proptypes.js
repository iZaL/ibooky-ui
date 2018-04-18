import PropTypes from 'prop-types';

const CategoryProp = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
});

const CategoriesProp = PropTypes.arrayOf(CategoryProp);

export {CategoryProp, CategoriesProp};
