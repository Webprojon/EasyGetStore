import React from "react";
import { useTranslation } from "react-i18next";
import BannerBg from "../../assets/images/Banner-bg.png";

function Introbanner() {
    let obj = {
        imageURL: BannerBg,
    };
    const { t } = useTranslation();
    return (
        <div className="container">
            <section
                className="introbanner_background"
                style={{ backgroundImage: `url(${obj.imageURL})` }}
            >
                <h2 className="introbanner__heading">
                    {t("home.delivery_of_products_introbanner")}
                </h2>
                <p className="introbanner__text">
                    {t("home.delivery_of_products_introbanner_subtitle")}
                </p>
            </section>
        </div>
    );
}

export default Introbanner;
