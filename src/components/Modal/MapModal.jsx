import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import DeliveryAdd from "../../components/DeliveryAdd/DeliveryAdd";
import {
  closeBtn,
  mapSearchIcon,
  locationIcon2,
} from "../../assets/images/image";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  ZoomControl,
} from "react-yandex-maps";
import UserContext from "../../context/context";

const MapModal = ({ setActiveMap, activeMap }) => {
  // States
  const [isActivePage, setIsActivePage] = useState(true);
  const [searchFilter, setSearchFilter] = useState(false);
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState([41.311151, 69.279737]);
  const { mapSearchInputVal, setMapSearchInputVal, setFormInputVal } =
    useContext(UserContext);

  useEffect(() => {
    fetch(`https://api.dassyor.uz/client/address?location=${mapSearchInputVal}`)
      .then((res) => res.json())
      .then((data) => {
        data.status ? setResults(data.data) : setResults([]);
      });
  }, [mapSearchInputVal]);

  useEffect(() => {
    fetch(
      `https://api.express24.uz/client/v4/geocode/by-coordinates?latitude=${location[0]}&longitude=${location[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMapSearchInputVal(data.name);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [location]);

  // Functions
  const handleInputChange = (e) => {
    setMapSearchInputVal(e.target.value);
    setSearchFilter(!searchFilter);
  };

  const closeModal = () => {
    setIsActivePage(!isActivePage);
  };

  const handleBoundsChange = (event) => {
    const newBounds = event.get("newCenter");
    setLocation(newBounds);
    setFormInputVal(mapSearchInputVal);
  };

  const placemarkOptions = {
    preset: "islands#redDotIcon",
    iconColor: "#23aa49",
  };

  // Style
  const mapStyles = {
    width: "100%",
    height: "350px",
  };

  const { t } = useTranslation();

  return (
    <div className="container">
      {activeMap ? (
        <div className="modal">
          {isActivePage ? (
            <div className="modal__map-container">
              <div className="modal__details-wrapper">
                <div className="modal__contents">
                  <div
                    onClick={() => {
                      setActiveMap(!activeMap);
                    }}
                    className="modal__close-btn"
                  >
                    <img src={closeBtn} alt="close-btn" />
                  </div>

                  <div className="modal__head">
                    <h2>{t("mapModal.head_title")}</h2>
                    <p>{t("mapModal.head_text")}</p>
                  </div>

                  <div className="modal__form">
                    <div className="modal__input">
                      <Input
                        onClick={() => {
                          setSearchFilter(!searchFilter);
                        }}
                        className="modal__form-input"
                        type="text"
                        icon={mapSearchIcon}
                        placeholder={t("mapModal.head_title")}
                        value={mapSearchInputVal}
                        onChange={handleInputChange}
                      />
                      {searchFilter ? (
                        <div className="input__search-panel">
                          <div className="search__results">
                            {results.map(({ name, coords }, i) => (
                              <div
                                onClick={() => {
                                  setLocation([
                                    coords.latitude,
                                    coords.longitude,
                                  ]);
                                  setSearchFilter(false);
                                  setFormInputVal(mapSearchInputVal);
                                }}
                                className="items"
                                key={i}
                              >
                                <img src={locationIcon2} alt="location" />
                                <p>{name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <Button
                      className="modal__form-btn"
                      onClick={() => {
                        setIsActivePage(false);
                      }}
                      content={t("mapModal.continue_btn")}
                      size="lg"
                      appearance="regular"
                      disabled={false}
                      mode="primary"
                    />
                  </div>
                </div>

                <div className="modal__map">
                  <YMaps
                    enterprise
                    query={{ apikey: "66302fc7-75ba-4c4d-b62b-91812d024dd7" }}
                  >
                    <div style={mapStyles}>
                      <Map
                        state={{
                          center: location,
                          zoom: 10,
                        }}
                        onBoundsChange={handleBoundsChange}
                        style={mapStyles}
                      >
                        <Placemark
                          geometry={location}
                          options={placemarkOptions}
                        />
                      </Map>
                    </div>
                  </YMaps>
                </div>
              </div>
            </div>
          ) : (
            <DeliveryAdd
              title={t("mapModal.head_title")}
              isConfirm={t("mapModal.save_btn")}
              closeModal={closeModal}
              location={location}
              mapSearchInputVal={mapSearchInputVal}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MapModal;
