import React, { useState } from "react";
import Close from "../../assets/images/Vector.jpg";
import Input from "../Input/Input";
import Button from "../Buttons/Button";
import { useTranslation } from "react-i18next";
import { PromoContext } from "../../context/promo";

function Promo({ title, isApply, closeModal }) {
  const { promo, setPromo } = React.useContext(PromoContext);
  const [overallPrice, setoverallPrice] = useState("20000");
  const [phonuNumber, setphoneNumber] = useState("998905257864");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const value = evt.target.promo.value.trim();

    setPromo(value);

    fetch(
      `https://api.dassyor.uz/client/promocode/check?key=${promo}&sum=${overallPrice}&tel=${phonuNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        closeModal();
        console.log(data);
      });
  };

  const { t } = useTranslation();

  return (
    <div>
      <div className="promo__backdrop">
        <div className="promo__content">
          <div className="promo__header">
            <h1 className="promo__title">{title}</h1>
            <img
              className="promo__close-btn"
              onClick={closeModal}
              src={Close}
              alt="close-btn"
            />
          </div>

          <form className="promo__form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="promo"
              placeholder={t("promoModal.your_promocode")}
            />

            <Button
              className="promo__btn"
              content={isApply}
              size="lg"
              appearance="regular"
              mode="primary"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Promo;
