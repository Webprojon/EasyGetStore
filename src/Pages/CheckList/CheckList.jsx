import { useState } from "react";
import { DassyorLogo } from "../../assets/images/image";

function CheckList() {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const currentHours = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    const [list, setList] = useState([
        {
            title: "Газированный напиток Coca-Cola 2 л",
            price: "100,000",
            id: 1,
        },

        {
            title: "Газированный напиток Fanta 2 л",
            price: "100,000",
            id: 2,
        },

        {
            title: "Газированный напиток Pepsi 2 л",
            price: "100,000",
            id: 3,
        },

        {
            title: "Газированный напиток Sprite 2 л",
            price: "100,000",
            id: 4,
        },
        {
            title: "Газированный напиток Coca-Cola 2 л",
            price: "100,000",
            id: 5,
        },
        {
            title: "Газированный напиток Coca-Cola 2 л",
            price: "100,000",
            id: 6,
        },
        {
            title: "Газированный напиток Coca-Cola 2 л",
            price: "100,000",
            id: 7,
        },
    ]);

    return (
        <div className="list__products">
            <h2 className="list__products-title">Заказ №34423</h2>

            <div className="list__products-time">
                <p className="time">Время:</p>
                <p className="time">
                    {month}.{date}.{year}, {currentHours}
                    {":"}
                    {currentMinutes}
                </p>
            </div>

            <div className="list__products-list">
                {list &&
                    list.map(({ title, price, id }) => (
                        <>
                            <div className="list__products-item" key={id}>
                                <p className="list__products-subtitle">
                                    {title}
                                </p>
                                <p className="list__products-text">
                                    {price} {"сум"}
                                </p>
                            </div>
                        </>
                    ))}
            </div>

            <div className="list__products-total">
                <p className="total-title">К оплате</p>
                <p className="total-title"> {"114 330 сум"}</p>
            </div>

            <div className="list__products-footer">
                <div>
                    <p className="our__phonenumber">Наш номер телефона</p>

                    <a className="phone__number" href="tel:998977009911">
                        +998 97 700 99 11
                    </a>
                </div>

                <img
                    src={DassyorLogo}
                    alt="Dassyor Logo"
                    width={83}
                    height={50}
                />
            </div>
        </div>
    );
}

export default CheckList;
