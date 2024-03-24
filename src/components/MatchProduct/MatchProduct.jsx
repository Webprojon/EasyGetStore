import React from "react";

function MatchProduct({ image, title, price }) {
    return (
        <div>
            <div className="matchproduct__backdrop">
                <div className="matchproduct__content">
                    <div className="search__content">
                        <img
                            className="search__content-image"
                            src={`https://api.dassyor.uz/${image}`}
                            alt="Pepsi"
                            width={48}
                            height={48}
                        />

                        <div>
                            <p className="search__content-title">{title}</p>
                            <p className="search__content-subtitle">{price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchProduct;
