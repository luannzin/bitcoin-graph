import React from "react";
import BitcoinGraph from "./Componentes/BitcoinGraph/index";
import BitcoinInfo from "./Componentes/BitcoinInfo/index";

const App = () => {
  if (window.innerWidth <= 1200) {
    return (
      <h1 style={{ margin: "2rem" }}>
        Este projeto só pode ser visualizado em computadores ou telas maiores
        que 1200px de comprimento.
      </h1>
    );
  } else {
    return (
      <div style={{ display: "flex", margin: "2.5rem 4rem" }}>
        <BitcoinInfo />
        <BitcoinGraph />
      </div>
    );
  }
};

export default App;
