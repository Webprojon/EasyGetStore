import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { plus, minus } from "../../assets/images/image";
import { CartContext } from "../../context/cartcontext";

const CartCards = ({ card, index }) => {
    // Hooks
    const [count, setCount] = useState(card.count);

    const { cartItems, addToCart, decreaseFromCart } = useContext(CartContext);

    // Functions
    const addOneHandler = () => {
        setCount(count + 1);
        addToCart(card, count);
    };

    useEffect(() => {
        setCount(
            cartItems.find((item) => item.product_id == card.product_id)
                ?.count || 0
        );
    }, [cartItems]);

    const delOneHandler = () => {
        if (count <= 1) {
            setCount((prev) => (prev = 1));
        } else {
            setCount(count - 1);
        }
        decreaseFromCart(card, count);
    };

    const { t } = useTranslation();

    return (
        <div className="card" key={index}>
            <div className="card__main">
                <div className="card__image">
                    <img
                        className="card__img"
                        src={`https://api.dassyor.uz/${card.product_image}`}
                        alt="product_img"
                    />
                </div>
                <div className="card__details">
                    <h2 className="card__name">{card.product_name}</h2>
                    <p className="card__cost">{card.overall_price} {t("cart.currency")}</p>
                </div>
            </div>
            <div className="card__counter">
                <button className="card__counter-btn">
                    <span onClick={delOneHandler} className="span__minus">
                        <img src={minus} alt="minus_icon" />
                    </span>
                    <span className="span__counter">{count}</span>
                    <span onClick={addOneHandler} className="spann__plus">
                        <img src={plus} alt="plus_icon" />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default CartCards;
