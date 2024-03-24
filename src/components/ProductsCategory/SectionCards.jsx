import React from "react";
import ProductCards from "./ProductCards";
import { useTranslation } from "react-i18next";
import Button from "../Buttons/Button";

const SectionCards = ({ data }) => {
    const { t } = useTranslation();

    return (
        <div className="section__wrapper">
            <div className="section__cards">
                {data.map((item) => (
                    <ProductCards item={item} />
                ))}
            </div>
            <div className="section__btn-div">
                <Button
                    className="section__product-btn"
                    content={t("home.looking_for_products")}
                    size="lg"
                    appearance="netural"
                    disabled={false}
                    mode="secondary"
                />
            </div>
        </div>
    );
};

export default SectionCards;
