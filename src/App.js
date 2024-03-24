import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import CheckList from "./Pages/CheckList/CheckList";
import Layout from "./components/Layout/Layout";
import UserContext from "./context/context";
import ProductCategory from "./Pages/ProductCategory/ProductCategory";
import Cart from "./components/Cart/Cart";
import ProductInner from "./Pages/ProductPage/ProductPage";
import Notfound from "./Pages/notfound/notfound";
import SmthWrong from "./Pages/smthwrong/wrong";
import { CartProvider } from "./context/cartcontext";

function App() {
  const [user] = useState(["Alisher"]);
  const [mapSearchInputVal, setMapSearchInputVal] = useState("");
  const [formInputVal, setFormInputVal] = useState("");
  return (
    <>
      <UserContext.Provider
        value={{
          user: user,
          mapSearchInputVal,
          setMapSearchInputVal,
          formInputVal,
          setFormInputVal,
        }}
      >
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checklist" element={<CheckList />} />
              <Route
                path="/category/:main_category_id/:category_id"
                element={<ProductCategory />}
              />
              <Route
                path="/products/:category_id/:product_id"
                element={<ProductInner />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/notfound" element={<Notfound />} />
              <Route path="/error" element={<SmthWrong />} />
            </Routes>
          </Layout>
        </CartProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
