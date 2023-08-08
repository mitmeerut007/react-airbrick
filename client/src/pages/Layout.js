import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 py-5">{children}</main>
      <Footer />
    </div>
  );
}
