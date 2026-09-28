import { useDispatch } from "react-redux";
import "./ProductCard.css";
import { addItem } from "../redux/slice";

function ProductCard() {
  const dispatch = useDispatch();
  return (
    <div className="product-card">

      <div className="product-image">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          alt="Wireless Headphones"
        />
      </div>

      <div className="product-info">

        <h2>Wireless Headphones</h2>

        <h3>$129.99</h3>

        <p>
          Experience high-quality sound with these wireless
          headphones. Featuring noise cancellation, long-lasting
          battery life, and a sleek modern design for everyday use.
        </p>

        <button onClick={()=>dispatch(addItem(1))}>
          Add to Cart
        </button>

        <button className="removeBtn" onClick={()=>dispatch(addItem(1))}>
          Remove from Cart
        </button>

        <button onClick={()=>dispatch(addItem(1))}>
          Clear Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;
