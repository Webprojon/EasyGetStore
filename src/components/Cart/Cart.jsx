import React, { useState, useEffect, useContext } from "react";
import Button from "../Buttons/Button";
import { trashBag } from "../../assets/images/image";
import CartCards from "./CartCards";
import ProductCards from "../ProductsCategory/ProductCards";
import { CartContext } from "../../context/cartcontext";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const overallSum = cartItems.map((item) => item.overall_price);

  const initialValue = 0;
  const sumWithInitial = overallSum.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const overallCount = cartItems.map((item) => item.count);

  const countWithInitial = overallCount.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  // console.log(sumWithInitial);
  // Hooks
  const [data, setData] = useState([]);
  const [deletePro, setDeletePro] = useState(false);
  useEffect(() => {
    fetch(`https://api.dassyor.uz/client/favorite/products/3`)
      .then((res) => res.json())
      .then((data) => {
        data.status ? setData(data.data) : setData([]);
      });
  }, []);

  const { t } = useTranslation();

  const handleClearCards = () => {
    clearCart();
    setDeletePro(!deletePro);
  };

  return (
    <>
      <div className="container">
        {cartItems?.length ? (
          <div className="cart__wrapper">
            <div className="cart__products">
              <div className="cart__product-header">
                <div className="cart__title">
                  <h2 className="cart__shopping">{t("cart.shipping")}</h2>
                  <Button
                    className="cart__btn"
                    content={`${t("cart.products")} ${countWithInitial}`}
                    size="sm"
                    appearance="regular"
                    disabled={false}
                    mode="primary"
                  />
                </div>
                <Button
                  onClick={() => setDeletePro(true)}
                  content={t("cart.trash_btn")}
                  icon={trashBag}
                  size="md"
                  appearance="netural"
                  disabled={false}
                  mode="secondary"
                />
              </div>
              <div className="cart__cards">
                {cartItems &&
                  cartItems.map((card, index) => (
                    <CartCards card={card} index={index} />
                  ))}
              </div>
            </div>
            <div className="total__cost-products">
              <div className="total">
                <div className="total__wrapper">
                  <h1 className="total__title">{t("cart.total_title")}</h1>
                  <div className="total__main">
                    <div className="price__details">
                      <div className="product all">
                        <h4>{t("cart.goods")}</h4>
                        <p>
                          {sumWithInitial} {t("cart.currency")}
                        </p>
                      </div>
                      <div className="discount all">
                        <h4>{t("cart.discount")}</h4>
                        <p>0 {t("cart.currency")}</p>
                      </div>
                      <div className="delivery all">
                        <h4>{t("cart.delivery")}</h4>
                        <p>0 {t("cart.currency")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="total__footer">
                    <div className="total__cost">
                      <h2>{t("cart.to_pay")}</h2>
                      <p>
                        {sumWithInitial} {t("cart.currency")}
                      </p>
                    </div>
                    <Button
                      className="btn__checkout"
                      content={t("cart.checkout_btn")}
                      size="lg"
                      appearance="regular"
                      disabled={false}
                      mode="primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="not__products">
            <div className="image">
              <div className="bg__img"></div>
            </div>
            <div className="detail">
              <h2 className="detail__title">{t("cart.not_products_title")}</h2>
              <p className="detail__desc">
                {t("cart.not_products_description")}
              </p>
              <Button
                className="detail__btn"
                content={t("wrong.something_error-btn")}
                size="lg"
                appearance="regular"
                mode="primary"
              />
            </div>
          </div>
        )}
      </div>
      <div className="related__products">
        <div className="container">
          <h2 className="related__title">{t("cart.related_products_title")}</h2>
          <div className="related__cards">
            {data && data.map((item) => <ProductCards item={item} />)}
          </div>
        </div>
      </div>

      {deletePro ? (
        <>
          <div className="modal__delete-container">
            <div className="modal__delete-wrapper">
              <div className="modal__delete-contents">
                <div className="details">
                  <h3>{t("cart.trash_btn")}?</h3>
                  <p>{t("cart.confirm_remove_btn")}</p>
                </div>
                <div className="btns">
                  <Button
                    onClick={() => {
                      setDeletePro(!deletePro);
                    }}
                    className="del__btn"
                    content={t("cart.left_products_btn")}
                    size="lg"
                    appearance="regular"
                    disabled={false}
                    mode="secondary"
                  />
                  <Button
                    onClick={handleClearCards}
                    className="del__btn"
                    content={t("cart.clear_btn")}
                    size="lg"
                    appearance="negative"
                    disabled={false}
                    mode="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Cart;
