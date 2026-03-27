import styles from "./Header.module.scss"

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header_container}>
      <Link to="/">
        <img className={styles.logo} src="src/assets/page_icon.png" alt="Page Icon" />
      </Link>

      <nav className={styles.navbar_user}>
        <Link to="user">
          <img
            src="src/assets/user_icon_black.png"
            alt="User Icon"
            className={styles.header_icon}
          />
        </Link>

        <Link to="/wishlist">
          <img
            src="src/assets/shopping_cart_dark.png"
            alt="Cart Icon"
            className="header_icon"
          />
        </Link>
      </nav>
    </header>
  );
}
