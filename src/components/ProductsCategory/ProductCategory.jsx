import React, { useEffect, useState } from "react";
import SectionCard from "./SectionCards";
import { useParams, useNavigate } from "react-router-dom";
import { manNotFound } from "../../assets/images/image";
import { useTranslation } from "react-i18next";

const ProductsCategory = () => {
  // Hooks
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const { main_category_id, category_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.dassyor.uz/client/main/category/${main_category_id}/3`)
      .then((res) => res.json())
      .then((data) => {
        data.status ? setData(data.data) : setData([]);
      });
  }, [main_category_id, category_id]);

  useEffect(() => {
    fetch(`https://api.dassyor.uz/client/products/${category_id}/3`)
      .then((res) => res.json())
      .then((data) => {
        data.status ? setProducts(data.data) : setProducts([]);
      });
  }, [category_id]);

  const filtered =
    data[0] &&
    data[0].categories.find((item) => item.category_id == category_id);
  const proName = filtered?.category_name || "";

  const { t } = useTranslation();

  return (
    <div className="container">
      {data.map(
        ({
          category_id: index,
          category_name: catTitle,
          product_count: count,
          categories,
        }) => {
          return (
            <div className="products__container" key={index}>
              <div className="aside__title">
                <h2>{catTitle}</h2>
                <span className="product__count">{`${t("product_category.products")}: ${count}`}</span>
              </div>
              <div className="products__wrapper">
                <aside className="aside__category">
                  <div className="aside__cards">
                    {categories.map(
                      ({
                        category_id: id,
                        category_image: imgUrl,
                        category_name: name,
                        product_count: count,
                      }) => {
                        return (
                          <div
                            onClick={() => {
                              navigate(`/category/${index}/${id}`);
                            }}
                            className={`aside__card ${
                              id == category_id && "aside__card-active"
                            }`}
                            key={id}
                          >
                            <div className="card__img-part">
                              <img
                                className="card__img"
                                src={"https://dassyor.uz/" + imgUrl}
                                alt="Вода"
                              />
                            </div>
                            <div className="card__details">
                              <h3 className="card__name">{name}</h3>
                              <p className="card__desc">{`${t("product_category.products")}: ${count}`}</p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </aside>

                <section className="section__container">
                  {products.length ? (
                    <>
                      <h2 className="category__title">{proName}</h2>
                      <SectionCard data={products} />
                    </>
                  ) : (
                    <div className="product__no-item">
                      <div className="no__item">
                        <div className="man__image">
                          <img src={manNotFound} alt="man-not-found-img" />
                        </div>
                        <div className="details">
                          <h2>{t("product_category.empty_title")}</h2>
                          <p>{t("product_category.empty_subtitle")}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ProductsCategory;
