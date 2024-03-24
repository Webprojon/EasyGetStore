import React, { useState, useEffect, useContext } from "react";
import { info, plus, minus } from "../../assets/images/image";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartcontext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductCards = ({ item }) => {
    const { addToCart, cartItems, decreaseFromCart } = useContext(CartContext);

    // Hooks
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    // Objects
    const notAvailable = {
        ...(item.cp_count > 1
            ? { backgroundColor: "#FEE2E2", color: "#EF4444" }
            : null),
    };

    // Functions
    const delOne = () => {
        setCount((prev) => prev - 1);
        decreaseFromCart(item, count);
    };

    const addOne = () => {
        setCount((prev) => prev + 1);
        addToCart(item, count);
    };

    useEffect(() => {
        setCount(
            cartItems.find((prev) => prev.product_id == item.product_id)
                ?.count || 0
        );
    }, [cartItems]);

    const { t } = useTranslation();

    return (
        <div className="section__card" key={item.product_id}>
            <Link
                to={`/products/${item.product_category}/${item.product_id}`}
                style={{ textDecoration: "none" }}
            >
                <div className="img">
                    <div className="img__card-part">
                        <img
                            className="img__card"
                            src={`https://api.dassyor.uz/${item.product_image}`}
                            alt="Вода"
                        />

                        {item.cp_count < 1 ? (
                            <div className="img__overlay">
                                <img src={info} alt="info-icon" />
                                <h3 className="img__title">
                                    {t("cart.product_card_title")}
                                </h3>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="card__details">
                    {/* <p className="card__discount"></p> */}
                    <h5 className="card__cost">
                        {item.main_cost} {t("cart.currency")}
                    </h5>
                    <h3 className="card__name">{item.product_name}</h3>
                    <p className="card__desc">{item.product_volume}</p>
                </div>
            </Link>

            <div className="card__btn">
                {count < 1 ? (
                    <button
                        style={notAvailable}
                        disabled={item.cp_count < 1 ? "disabled" : false}
                        onClick={addOne}
                        className={"add__cart-btn btn"}
                    >
                        <span>
                            {item.cp_count < 1
                                ? `${t("cart.product_card_title")}`
                                : `${t("cart.product_card_trash")}`}
                        </span>
                    </button>
                ) : (
                    <button className={"counter__btn btn"}>
                        <span onClick={delOne} className="span__minus">
                            <img src={minus} alt="minus_icon" />
                        </span>
                        <span className="span__counter">{count}</span>
                        <span onClick={addOne} className="spann__plus">
                            <img src={plus} alt="plus_icon" />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCards;
