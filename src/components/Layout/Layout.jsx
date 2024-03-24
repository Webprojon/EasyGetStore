import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const firstAccess = location.pathname == "/notfound";
  const secondAccess = location.pathname == "/error";
  const checklistAccess = location.pathname == "/checklist";
  const checkoutAccess = location.pathname == "/checkout";
  const dashboardAccess = location.pathname == "/dash";
  const accessForPathHeader =
    firstAccess || secondAccess || checklistAccess || dashboardAccess;
  const accessForPathFooter =
    firstAccess ||
    secondAccess ||
    checklistAccess ||
    checkoutAccess ||
    dashboardAccess;

  return (
    <>
      {!accessForPathHeader && <Header />}
      <main>{children}</main>
      {!accessForPathFooter && <Footer />}
    </>
  );
}
