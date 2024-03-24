import { useTranslation } from "react-i18next";
import Button from "../../components/Buttons/Button";
import smthwrong from "../../assets/images/smthwrong.png";
import logo from "../../assets/images/logo.png";

function SmthWrong() {
    const { t } = useTranslation();
    return (
        <>
            <div className="smthwrong__page">
                <div className="smthwrong__header">
                    <div className="container">
                        <div className="smthwrong__logo">
                            <img src={logo} alt="easyget-logo" />
                        </div>
                    </div>
                </div>
                <div className="smthwrong__content">
                    <div>
                        <img src={smthwrong} alt="Error" />
                    </div>
                    <h2 className="smthwrong__title">
                        {t("wrong.something_error_title")}
                    </h2>
                    <p className="smthwrong__paragraph">
                        {t("wrong.something_error-subtitle")}
                        <a className="phone__link" href="tel: +998977009911">
                            {" "}
                            +998977009911
                        </a>{" "}
                    </p>

                    <Button
                        className="smthwrong__btn"
                        content={t("wrong.something_error-btn")}
                        size="lg"
                        appearance="regular"
                        mode="primary"
                    />
                </div>
            </div>
        </>
    );
}

export default SmthWrong;
