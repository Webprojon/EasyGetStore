import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Close from "../../assets/images/Vector.jpg";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import { flagImg, icMapPin } from "../../assets/images/image";
import Modal from "../Modal/Modal";
import Promo from "../Promo/Promo";
import MapModal from "../Modal/MapModal";
import { PromoContext } from "../../context/promo";
import UserContext from "../../context/context";

function Order({ title, closeModal, subtitle, price, isPromocode, isConfirm }) {
  const [promo, setPromo] = useState(false);
  const [activeMap, setActiveMap] = useState(false);

  const { promo: promoValue } = useContext(PromoContext);
  const { mapSearchInputVal } = useContext(UserContext);
  const { formInputVal } = useContext(UserContext);

  const open = () => {
    setPromo(true);
  };

  const close = () => {
    setPromo(false);
  };

  localStorage.setItem("inputValue", formInputVal);

  const { t } = useTranslation();

  return (
    <>
      {activeMap ? (
        <>
          <MapModal setActiveMap={setActiveMap} activeMap={activeMap} />
        </>
      ) : (
        <div>
          <div className="modal__backdrop">
            <div className="modal__content">
              {!promo ? (
                <>
                  <div className="modal__header">
                    <h1 className="modal__title">{title}</h1>
                    <img
                      className="modal__closed-btn"
                      onClick={closeModal}
                      src={Close}
                      alt="close-btn"
                    />
                  </div>

                  <div className="modal__subheader">
                    <p className="modal__subtitle">{subtitle}</p>

                    <div className="modal__price">
                      <p className="modal__price-text1">{`${price}${t(
                        "cart.currency"
                      )}`}</p>
                      <p className="modal__price-text">{`${price}${t(
                        "cart.currency"
                      )}`}</p>
                    </div>
                  </div>

                  <form className="modal__form-order">
                    <Input
                      type="text"
                      placeholder={t("orderModal.full_name")}
                      placeholderType="visible"
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="+998"
                      icon={flagImg}
                      placeholderType="hidden"
                      required
                    />
                    <Input
                      onClick={() => {
                        setActiveMap(!activeMap);
                      }}
                      type="text"
                      placeholder={t("orderModal.delivery_address")}
                      icon={icMapPin}
                      placeholderType="visible"
                      required
                      value={mapSearchInputVal}
                    />

                    <Input
                      className="input__comment"
                      type="text"
                      placeholder={t("orderModal.comment_order")}
                      placeholderType="hidden"
                      required
                    />
                  </form>

                  <div className="modal__buttons">
                    {!promoValue ? (
                      <Button
                        onClick={open}
                        className="modal__btn1"
                        content={isPromocode}
                        size="lg"
                        appearance="netural"
                        mode="primary"
                      />
                    ) : (
                      <Input
                        type="text"
                        value={promoValue}
                        placeholder={t("promoModal.your_promocode")}
                      />
                    )}

                    <Button
                      // onClick={}
                      className="modal__btn2"
                      content={isConfirm}
                      size="lg"
                      appearance="regular"
                      mode="primary"
                    />
                  </div>
                </>
              ) : (
                <Modal>
                  <Promo
                    title={t("promoModal.title")}
                    closeModal={close}
                    isApply={t("promoModal.isApply")}
                  />
                </Modal>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Order;
