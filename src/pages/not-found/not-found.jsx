import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className={""}>
      <h1> 404 Lost in space</h1>
      <Link to="/" className={""}>
        Take me home
      </Link>
    </div>
  );
};

export default NotFound404;
