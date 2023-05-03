const IngredientsList = ({ name, children }) => {
  return (
    <li>
      <h2>{name}</h2>

      <ul>{children}</ul>
    </li>
  );
};

export default IngredientsList;
