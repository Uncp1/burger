import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

const componentType = PropTypes.exact({
  name: PropTypes.oneOf(['Булки', 'Соусы', 'Начинки']).isRequired,
  type: PropTypes.oneOf(['main', 'bun', 'sauce']).isRequired,
  items: PropTypes.arrayOf(ingredientType).isRequired || []
},)

const cartType = PropTypes.exact({
  price: PropTypes.number.isRequired,
  orderNumber: PropTypes.string.isRequired,
  bun: ingredientType.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired || []
})

export { ingredientType, componentType, cartType };