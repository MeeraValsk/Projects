import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Dashboard({ children }) {
  return (
    <section className="dashboard">
      <Header />
      <div className="children">
      {children}
      </div>
      
      <Footer />
    </section>
  );
}

export default Dashboard;
