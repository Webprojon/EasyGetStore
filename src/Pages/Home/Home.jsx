import React, { Fragment } from "react";
import Products from "../../components/Products/Products";
import Introbanner from "../../components/Introbanner/Introbanner";

function Home() {
  return (
    <Fragment>
      <Introbanner />
      <Products />
    </Fragment>
  );
}

export default Home;
