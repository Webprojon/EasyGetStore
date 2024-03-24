import React from "react";
import {
    logo,
    telegramIcon,
    instagramIcon,
    phoneIcon,
} from "../../assets/images/image";

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <footer className="footer__wrapper">
                    <div className="footer__logo">
                        <img className="logo" src={logo} alt="easyget-logo" />
                    </div>

                    <div className="footer__networks">
                        <div className="telegram__icon icon">
                            <img src={telegramIcon} alt="telegram" />
                        </div>
                        <div className="instagram__icon icon">
                            <img src={instagramIcon} alt="instagram" />
                        </div>
                    </div>

                    <div className="footer__phone">
                        <img className="phoneIcon" src={phoneIcon} alt="img" />
                        <p>+ 998 90 338 49 39</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;
