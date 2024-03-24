import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "../../assets/images/Vector.jpg";
import Button from "../Buttons/Button";
import Input from "../Input/Input"

function DeliveryAdd({
  title,
  closeModal,
  isConfirm,
  location,
  mapSearchInputVal,
}) {
  const [deliveryInfo, setDeliveryInfo] = useState({
    landmark: "",
    flat: "",
    entrance: "",
    floor: "",
    intercome: "",
  });

  const handleSaveToLocalStorage = () => {
    localStorage.setItem("address", JSON.stringify(deliveryInfo));
    localStorage.setItem("placeName", mapSearchInputVal);
    localStorage.setItem("placeCordination", location);
    closeModal();
  };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDeliveryInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const { t } = useTranslation();

    return (
        <div>
            <div className="delivery__backdrop">
                <div className="delivery__content">
                    <div className="delivery__header">
                        <h1 className="delivery__title">{title}</h1>
                        <img
                            className="delivery__close-btn"
                            onClick={closeModal}
                            src={CloseIcon}
                            alt="close-btn"
                        />
                    </div>

                    <div>
                        <Button
                            className="delivery__btn-address"
                            content="4517 Washington Ave. Manchester, Kentucky 39495"
                            size="lg"
                            appearance="neutaral"
                            mode="primary"
                        />
                    </div>

                    <form className="delivery__form">
                        <Input
                            type="text"
                            name="landmark"
                            placeholder={t("deliveryAdd.reference_point")}
                            value={deliveryInfo.landmark}
                            onChange={handleChange}
                            required
                            // error="Пожалуйста заполните обязательное поле."
                        />

                        <div className="delivery__input-box">
                            <Input
                                type="text"
                                name="flat"
                                placeholder={t("deliveryAdd.appartment_office")}
                                value={deliveryInfo.flat}
                                onChange={handleChange}
                            />

                            <Input
                                type="text"
                                name="entrance"
                                placeholder={t("deliveryAdd.entrance")}
                                value={deliveryInfo.entrance}
                                onChange={handleChange}
                            />

                            <Input
                                type="text"
                                name="floor"
                                placeholder={t("deliveryAdd.floor")}
                                value={deliveryInfo.floor}
                                onChange={handleChange}
                            />

                            <Input
                                type="password"
                                name="intercome"
                                placeholder={t("deliveryAdd.intercom_code")}
                                value={deliveryInfo.intercome}
                                onChange={handleChange}
                            />
                        </div>
                    </form>

                    <Button
                        onClick={handleSaveToLocalStorage}
                        className="delivery__btn"
                        content={isConfirm}
                        size="lg"
                        appearance="regular"
                        mode="primary"
                    />
                </div>
            </div>
        </div>
    );
}

export default DeliveryAdd;
