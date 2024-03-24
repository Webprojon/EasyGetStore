import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CartContext } from "../../context/cartcontext";

import Buttons from "../Buttons/Button";
import { checkout, cloudDownload, phoneBtn } from "../../assets/images/image";

function Checkout() {
    const { cartItems } = useContext(CartContext);
    const { t } = useTranslation();
    const overallSum = cartItems.map((item) => item.overall_price);

    const initialValue = 0;
    const sumWithInitial = overallSum.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    );
    return (
        <section className="checkout">
            <div className="container">
                <div className="checkout__header">
                    <img
                        className="checkout__header-image"
                        src={checkout}
                        alt="checkout icon"
                    />
                    <div>
                        <h1 className="checkout__header-title">
                        {t("checkout.header_title")}
                        </h1>
                        <p className="checkout__header-text">
                        {t("checkout.header_text")}
                        </p>
                    </div>
                </div>

                <section className="checkout__section">
                    <div className="checkout__main">
                        <div className="checkout__order">
                            <div className="main__card">
                                <div>
                                    <h2 className="main__title">
                                    {t("checkout.main_title")}
                                    </h2>
                                    <p className="main__text">
                                    {t("checkout.main_text1")} <b>{t("checkout.main_text2")}</b>
                                    </p>
                                </div>
                                <Buttons
                                    className="main__btn"
                                    content={t("checkout.download_icon")}
                                    icon={cloudDownload}
                                    size="md"
                                    appearance="neutral"
                                    disabled={false}
                                    mode="secondary"
                                />
                            </div>

                            <div className="delivery__part">
                                <div>
                                    <h3 className="delivery__part-name">
                                    {t("checkout.courier_name")}
                                    </h3>
                                    <a
                                        className="delivery__part-phonenum"
                                        href="tel:998903384939"
                                    >
                                        +998 90 834 34 34
                                    </a>
                                </div>

                                <img
                                    src={phoneBtn}
                                    alt="phone-button"
                                    width={56}
                                    height={56}
                                />
                            </div>
                        </div>

                        <div className="chechout__products">
                            <h2 className="prodcuts__title">{t("checkout.products_title")}</h2>

                            <div className="products__list">
                                {cartItems &&
                                    cartItems.map((item) => {
                                        return (
                                            <div className="products__item">
                                                <div>
                                                    <p className="products__subtitle">
                                                        {item.product_name}
                                                    </p>
                                                    <p className="products__text">
                                                        {item.product_volume} {t("checkout.products_title")}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="products__subtitle">
                                                        {item.overall_price} {t("cart.currency")}
                                                    </p>
                                                    <p className="products__text quantity__text">
                                                        {item.count} {t("checkout.products_unit_qty")}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className="totals__cost-product">
                        <div className="totals">
                            <div className="totals__inner">
                                <h1 className="totals__title">
                                    {t("cart.total_title")}
                                </h1>
                                <div className="totals__main">
                                    <div className="price__details">
                                        <div className="products alls">
                                            <h4>{t("cart.goods")}</h4>
                                            <p>
                                                {sumWithInitial}{" "}
                                                {t("cart.currency")}
                                            </p>
                                        </div>
                                        <div className="discount alls">
                                            <h4>{t("cart.discount")}</h4>
                                            <p>0 {t("cart.currency")}</p>
                                        </div>
                                        <div className="delivery alls">
                                            <h4>{t("cart.delivery")}</h4>
                                            <p>0 {t("cart.currency")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="totals__footer">
                                <div className="totals__cost">
                                    <h2>{t("cart.to_pay")}</h2>
                                    <p>
                                        {sumWithInitial} {t("cart.currency")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}

export default Checkout;
