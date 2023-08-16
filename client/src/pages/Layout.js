import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="bg-white py-5">{children}</main>
      <Footer />
    </div>
  );
}
