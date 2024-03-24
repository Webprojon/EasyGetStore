import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartcontext";
import Button from "../Buttons/Button";
// import { items } from "../ProductsCategory/data";

const HomeCart = ({ setHovered }) => {
    const { cartItems } = useContext(CartContext);
    const overallSum = cartItems.map((item) => item.overall_price);

    const initialValue = 0;
    const sumWithInitial = overallSum.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <>
            <div className="home">
                <div
                    onMouseLeave={() => {
                        setHovered(false);
                    }}
                    className="home__cart"
                >
                    <div className="home__cart-header">
                        <h2>{t("cart.home_cart_shipping")}</h2>
                    </div>
                    <div className="home__cart-main">
                        {cartItems &&
                            cartItems.map((item, i) => {
                                return (
                                    <div className="cart__card" key={i}>
                                        <div className="card__img">
                                            <img
                                                className="card__img-single"
                                                src={`https://api.dassyor.uz/${item.product_image}`}
                                                alt="korzinka-img"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="card_info">
                                            <div className="first__title">
                                                <h3>{item.product_name}</h3>
                                                <h4>
                                                    {item.overall_price}{" "}
                                                    {t("cart.currency")}
                                                </h4>
                                            </div>
                                            <p>
                                                {t("cart.home_cart_quantity")}
                                                {item.count}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="home__cart-footer">
                        <div className="total__cost">
                            <p>{t("cart.total_title")}</p>
                            <h4>
                                {sumWithInitial} {t("cart.currency")}
                            </h4>
                        </div>
                        <div className="footer__btn">
                            <Button
                                onClick={() => {
                                    navigate("/cart");
                                }}
                                className="cart__btn"
                                content={t("cart.home_cart_btn")}
                                size="lg"
                                appearance="regular"
                                disabled={false}
                                mode="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCart;
