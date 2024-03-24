import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import notFound from "../../assets/images/not-found-bg.png";
import logo from "../../assets/images/logo.png";

function NotFound() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <>
            <div className="notfound__page">
                <div className="notfound__header">
                    <div className="container">
                        <div>
                            <img
                                onClick={() => {
                                    navigate("/");
                                }}
                                className="notfound__logo"
                                src={logo}
                                alt="Notfound-Logo"
                                width={192}
                                height={50}
                            />
                        </div>
                    </div>
                </div>

                <div className="notfound__content">
                    <div>
                        <img
                            src={notFound}
                            alt="Notfound"
                            width={228}
                            height={184}
                        />
                    </div>
                    <h2 className="notfound__title">{t("notfound.notfound_title")}</h2>
                    <p className="notfound__paragraph">
                        {t("notfound.notfound_subtitle")}
                    </p>

                    <Button
                        className="notfound__btn"
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

export default NotFound;
