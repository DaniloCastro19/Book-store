import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img className="logo" src="src/assets/page_icon.png" alt="Page Icon" />
      </Link>

      <nav className="navbar-user">
        <Link to="user">
          <img
            src="src/assets/user_icon_black.png"
            alt="User Icon"
            className="headerIcon"
          />
        </Link>

        <Link to="/wishlist">
          <img
            src="src/assets/shopping_cart_dark.png"
            alt="Cart Icon"
            className="headerIcon"
          />
        </Link>
      </nav>
    </header>
  );
}
