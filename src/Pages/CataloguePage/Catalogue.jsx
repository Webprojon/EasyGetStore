import React, { useState, useRef, useEffect } from "react";
import { logo, closeBtn } from "../../assets/images/image";
import { useNavigate } from "react-router-dom";

const Catalogue = ({ setCatalog }) => {
  const [data, setData] = useState([]);
  const [getItem, setGetItem] = useState([]);
  const [getId, setGetId] = useState(null);
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

  return (
    <div className="catalog">
      <div className="catalog__overlay">
        <div className="catalog__container">
          <div className="catalog__header">
            <div className="logo">
              <img src={logo} alt="easyget-logo" />
            </div>
            <div
              onClick={() => {
                setCatalog(false);
              }}
              className="close"
            >
              <img src={closeBtn} alt="close-btn" />
            </div>
          </div>
          <div className="catalog__products">
            <div className="catalog__cards">
              {!!data.length &&
                data.map(
                  ({
                    category_id: id,
                    category_name: name,
                    product_count: count,
                    categories,
                  }) => (
                    <div
                      onClick={() => {
                        setGetItem(categories);
                        setGetId(id);
                      }}
                      className={`catalog__card ${
                        getId === id ? "catalog__card-active" : ""
                      }`}
                      key={id}
                    >
                      <div className="card__img-part">
                        <img
                          className="card__img"
                          src={
                            "https://dassyor.uz/" + categories[0].category_image
                          }
                          alt="title"
                        />
                      </div>
                      <div className="card__details">
                        <h3 className="card__name">{name}</h3>
                        <p className="card__count">{`Продуктов: ${count}`}</p>
                      </div>
                    </div>
                  )
                )}
            </div>

            <div className="line"></div>
            <div className="catalog__categories-cards">
              {getItem.map(
                ({
                  category_id: cardId,
                  category_image: img,
                  category_name: name,
                  product_count: count,
                }) => (
                  <div
                    onClick={() => {
                      navigate(`/category/${getId}/${cardId}`);
                      setCatalog(false);
                    }}
                    className="catalog__card"
                    key={cardId}
                  >
                    <div className="card__img-part">
                      <img
                        className="card__img"
                        src={"https://dassyor.uz/" + img}
                        alt="card-img"
                      />
                    </div>
                    <div className="card__details">
                      <h3 className="card__name">{name}</h3>
                      <p className="card__count">{`Продуктов: ${count}`}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
