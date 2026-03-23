import "./Header.css";

export default function Header() {
  return (
    <header>
      <img className="logo" src="src/assets/page_icon.png" alt="Page Icon" />

      <nav className="navbar-user">
        <img src="src/assets/user_icon_black.png" alt="User Icon" />
        <img src="src/assets/shopping_cart_dark.png" alt="Cart Icon" />
      </nav>
    </header>
  );
}
