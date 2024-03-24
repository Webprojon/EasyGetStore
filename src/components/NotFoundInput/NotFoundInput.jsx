import React from "react";
import Button from "../Buttons/Button";

function NotFoundInput({ image, title, text }) {
    return (
        <div>
            <div className="notfound__input-backdrop">
                <div className="notfound__input-content">
                    <div className="notfound__input-image">
                        <img
                            src={image}
                            alt="Not found logo"
                            width={48}
                            height={48}
                        />
                    </div>

                    <h2 className="notfound__input-title">{title}</h2>
                    <p className="notfound__input-text">{text}</p>

                    <Button
                        className="notfound__input-btn"
                        content="Нет того что ищу"
                        size="md"
                        appearance="regular"
                        mode="secondary"
                    />
                </div>
            </div>
        </div>
    );
}

export default NotFoundInput;
