import "./Header.css";
import AddToCart from "../AddToCart";

function Header() {
  return (
    <header className="header">

      <div className="logo">
        MyShop
      </div>

      <nav>
        <a href="#">Home</a>
        <a href="#">Products</a>
      </nav>

      <AddToCart />

    </header>
  );
}

export default Header;