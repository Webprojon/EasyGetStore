import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCards from "../../components/ProductsCategory/ProductCards";
import Modal from "../../components/Modal/Modal";
import Order from "../../components/Order/Order";
import Button from "../../components/Buttons/Button";
import { plus, minus } from "../../assets/images/image";
import { PromoProvider } from "../../context/promo";
import { CartContext } from "../../context/cartcontext";

function ProductInner() {
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const { category_id, product_id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [count, setCount] = useState(1);

    const { addTooneCart } = useContext(CartContext);

    const handleAddToCart = (product) => {
        addTooneCart(product, count);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleMinus = () =>
        setCount((num) => {
            if (num > 1) return num - 1;

            return num;
        });
    const handlePlus = () => setCount((num) => num + 1);

    useEffect(() => {
        fetch(`https://api.dassyor.uz/client/products/${category_id}/3`)
            .then((res) => res.json())
            .then((data) => {
                data.status ? setProducts(data.data) : setProducts([]);
            });
    }, [category_id]);

    useEffect(() => {
        fetch(`https://api.dassyor.uz/client/product/3/${product_id}`)
            .then((res) => res.json())
            .then((data) => {
                data.status ? setData(data.data[0]) : setData([]);
            });
    }, [product_id]);

    const { t } = useTranslation();

    return (
        <>
            <div className="container">
                <div className="products__wrapper">
                    <div className="products__wrapper-imgsmall">
                        {data.product_image &&
                            data.product_image.map((img, idx) => {
                                return (
                                    <div className="img__small">
                                        <img
                                            key={idx}
                                            src={
                                                "https://api.dassyor.uz/" + img
                                            }
                                            alt="image"
                                            width={111}
                                            height={116}
                                        />
                                    </div>
                                );
                            })}
                    </div>

                    <div>
                        {data.product_image &&
                            data.product_image.map((item, idx) => {
                                return (
                                    <div
                                        className="products__wrapper-generalbox"
                                        key={idx}
                                    >
                                        <div className="img__big">
                                            <img
                                                src={
                                                    "https://api.dassyor.uz/" +
                                                    item
                                                }
                                                alt="picture"
                                                width={484}
                                                height={508}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div>
                        {data && (
                            <div className="products__wrapper-partinner">
                                <p className="products__wrapper-delPrice">
                                    {data.main_cost}
                                </p>
                                <p className="products__wrapper-curPrice">
                                    {data.product_cost}
                                </p>
                                <h2 className="products__wrapper-title">
                                    {data.product_name}
                                </h2>
                                <p className="products__wrapper-liter">
                                    {data.product_volume}
                                </p>
                                <p className="products__wrapper-subtitle">
                                    {data.product_info}
                                </p>
                                <p className="products__wrapper-quantity">
                                    {t("product_category.qty")}
                                </p>
                                <div className="products__wrapper-counter">
                                    <button className={"counter__btn btn"}>
                                        <span onClick={handleMinus}>
                                            <img src={minus} alt="minus" />
                                        </span>

                                        <span>{count}</span>

                                        <span onClick={handlePlus}>
                                            <img src={plus} alt="plus" />
                                        </span>
                                    </button>
                                </div>

                                <div className="btns">
                                    <Button
                                        onClick={() => handleAddToCart(data)}
                                        className="basketBtn"
                                        content={t("cart.product_card_trash")}
                                        size="lg"
                                        appearance="regular"
                                        mode="primary"
                                    />

                                    <Button
                                        onClick={openModal}
                                        className="sellBtn"
                                        content={t("cart.product_page_buy_btn")}
                                        size="lg"
                                        appearance="regular"
                                        mode="outlined"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="related__products">
                    <h2 className="related__title">
                        {t("cart.related_products_title")}
                    </h2>
                    <div className="related__cards">
                        {products &&
                            products.map((item) => (
                                <ProductCards item={item} />
                            ))}
                    </div>
                </div>

                <PromoProvider>
                    {showModal && (
                        <Modal>
                            <Order
                                title={t("orderModal.make_order")}
                                closeModal={closeModal}
                                subtitle={t("cart.to_pay")}
                                price="114000"
                                isPromocode={t("cart.isPromocode")}
                                isConfirm={t("cart.isConfirm")}
                            />
                        </Modal>
                    )}{" "}
                </PromoProvider>
            </div>
        </>
    );
}

export default ProductInner;
