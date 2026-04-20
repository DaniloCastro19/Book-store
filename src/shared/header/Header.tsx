import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../modules/Auth/context/UseAuthContext";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const pageIcon = new URL("/page_icon.png", import.meta.url).href;
  const userIcon = new URL("/user_icon_black.png", import.meta.url).href;
  const cartIcon = new URL("/shopping_cart_dark.png", import.meta.url).href;

  return (
    <header className={styles.header_container}>
      <Link to="/">
        <img className={styles.logo} src={pageIcon} alt="Page Icon" />
      </Link>

      <nav className={styles.navbar_user}>
        {isAuthenticated && (
          <Link to="/loan-list">
            <svg className={styles.header_icon} viewBox="0 0 21 20">
              <use href="/icons.svg#documentation-icon" />
            </svg>
          </Link>
        )}

        <Link to="user">
          <img src={userIcon} alt="User Icon" className={styles.header_icon} />
        </Link>

        <Link to="/wishlist">
          <img src={cartIcon} alt="Cart Icon" className={styles.header_icon} />
        </Link>
      </nav>
    </header>
  );
}
