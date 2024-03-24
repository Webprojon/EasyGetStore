// Imported stuffs
import React, { useContext, useEffect, useState } from "react";
// import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";
import { icNotFound } from "../../assets/images/image";

// Images & Icons
import {
  logo,
  categoryIcon,
  searchIcon,
  locationIcon,
  BagIcon,
  // chevronDown,
} from "../../assets/images/image";
import MapModal from "../Modal/MapModal";
import MatchProduct from "../MatchProduct/MatchProduct";
import NotFoundInput from "../NotFoundInput/NotFoundInput";
import HomeCart from "../HomeCart/HomeCart";
import Catalogue from "../../Pages/CataloguePage/Catalogue";
import Input from "../Input/Input";
import UserContext from "../../context/context";

const Header = () => {
  // Hooks
  const [activeMap, setActiveMap] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [inputData, setInputData] = useState();
  const { formInputVal } = useContext(UserContext);
  const [matchedObject, setMatchedObject] = useState([]);
  const { t, i18n } = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonText, setButtonText] = useState(
    localStorage.getItem("buttonText") || "en"
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChangeLng = (lng, languageText) => {
    i18n.changeLanguage(lng);
    setButtonText(languageText);
    localStorage.setItem("lng", lng);
    localStorage.setItem("buttonText", languageText);
  };

  // useNavigate

  const navigate = useNavigate();

  // Functions
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputData(inputValue);
  };

  async function searchProduct(value) {
    try {
      const res = await fetch(
        "https://api.dassyor.uz/client/search/products/3",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: value }),
        }
      );

      const result = await res.json();
      setMatchedObject(result.status ? result.data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    searchProduct(inputData);
  }, [inputData]);

  return (
    <>
      <header>
        <div className="container">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="nav__logo"
          >
            <img src={logo} alt="logo" />
          </div>

          <div className="nav__actions">
            {/* Catygory Button */}
            <Button
              className="catalog__btn"
              onClick={() => {
                setCatalog(true);
              }}
              // Content options: any
              content={t("header.catalog")}
              icon={categoryIcon}
              // Size options: lg, md, sm
              size="md"
              // Appearance options: regular, positive, negative, netural
              appearance="regular"
              disabled={false}
              // Mode options: primary, secondary, tertiary, outlined
              mode="secondary"
            />

            {catalog ? <Catalogue setCatalog={setCatalog} /> : null}

            <div className="main__search">
              <div className="search__panel">
                <Input
                  value={inputData}
                  onChange={handleInputChange}
                  className="search__input"
                  icon={searchIcon}
                  type="text"
                  placeholder={t("header.input_placeholder")}
                  // placeholderType = "hidden"
                />
              </div>

              {inputData && (
                <div className="modal__box">
                  {matchedObject.length ? (
                    matchedObject.map((item) => {
                      return (
                        <MatchProduct
                          image={item.product_image[0]}
                          title={item.product_name}
                          price={item.main_cost}
                        />
                      );
                    })
                  ) : (
                    <NotFoundInput
                      image={icNotFound}
                      title={t("header.notfound_input_title")}
                      text={t("header.notfound_input_text")}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Address Button */}
            <Button
              className="address__btn"
              onClick={() => {
                setActiveMap(!activeMap);
              }}
              content={formInputVal ? formInputVal : t("header.address")}
              icon={locationIcon}
              size="lg"
              appearance="regular"
              disabled={false}
              mode="primary"
            />

            {/* Cart Button*/}
            <Button
              onMouseOver={() => {
                setHovered(true);
              }}
              onClick={() => {
                navigate("/cart");
              }}
              className="cart__btn"
              content={t("header.basket")}
              icon={BagIcon}
              size="md"
              appearance="netural"
              disabled={false}
              mode="secondary"
            />

            {hovered ? <HomeCart setHovered={setHovered} /> : null}

            <div className="dropdown">
              <button onClick={toggleDropdown} className="dropbtn">
                {buttonText}
              </button>
              {isDropdownOpen && (
                <div
                  onMouseLeave={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="dropdown-content"
                >
                  <a href="#" onClick={() => handleChangeLng("en", "En")}>
                    En
                  </a>
                  <a href="#" onClick={() => handleChangeLng("ru", "Ru")}>
                    Ru
                  </a>
                  <a href="#" onClick={() => handleChangeLng("uz", "Uz")}>
                    Uz
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Opening Map Module */}
      <MapModal setActiveMap={setActiveMap} activeMap={activeMap} />
    </>
  );
};

export default Header;
