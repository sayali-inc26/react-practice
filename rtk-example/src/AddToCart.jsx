import { useSelector } from "react-redux";
import "./AddToCart.css";

const AddToCart = () => {

    const selector = useSelector((state) => state.cart.value);

    return (
        <div className="cart">

            <img
                src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart.png"
                alt="cart"
            />

            <span className="cart-count">
                {selector}
            </span>

        </div>
    );
};

export default AddToCart;