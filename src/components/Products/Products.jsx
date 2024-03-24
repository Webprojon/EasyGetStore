import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../Buttons/Button";

function Products() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const ref = useRef(true);

    useEffect(() => {
        if (ref.current) {
            fetch("https://api.dassyor.uz/client/category/3")
                .then((res) => res.json())
                .then((data) => {
                    data.status ? setData(data.data) : setData([]);
                });
        }

        ref.current = true;
    }, [ref]);

    const { t } = useTranslation();

    return (
        <div className="container">
            <div className="product">
                {!!data.length &&
                    data.map(
                        ({
                            category_id: id,
                            category_name: title,
                            categories,
                        }) => {
                            return (
                                <div key={id} className="product__block">
                                    <h3 className="product__title">{title}</h3>
                                    <div className="product__cards">
                                        {categories.map(
                                            ({
                                                category_id: cardId,
                                                category_name: cardTitle,
                                                category_size: size,
                                                category_image: url,
                                            }) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            navigate(
                                                                `/category/${id}/${cardId}`
                                                            );
                                                        }}
                                                        key={cardId}
                                                        className={
                                                            size == "big"
                                                                ? "product__category"
                                                                : "product__category-small"
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                "https://dassyor.uz/" +
                                                                url
                                                            }
                                                            alt={cardTitle}
                                                            className="product__image "
                                                        />
                                                        <h4 className="product__subtitle">
                                                            {cardTitle}
                                                        </h4>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    )}

                <Button
                    className="product__btn"
                    content={t("home.looking_for_products")}
                    size="lg"
                    appearance="netural"
                    disabled={false}
                    mode="primary"
                />
            </div>
        </div>
    );
}

export default Products;
