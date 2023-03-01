import React from "react";
import styles from "./style.module.css";
import bitcoin from "../../assets/bitcoin.svg";

const BitcoinInfo = () => {
  const [actualPrice, setActualPrice] = React.useState();

  React.useEffect(() => {
    const renderData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=1"
      ); // API do Coingecko para pegar os dados dos ultimos 730 dias (2 anos).
      const data = await response.json();
      setActualPrice(data["prices"][data.prices.length - 1][1].toFixed(2)); //Pega o dado mais recente do valor do Bitcoin registrado na API do CoinGecko.
    };
    renderData();
  });

  return (
    <div className={styles.wrapper}>
      <header>
        <p>Made by luannzin</p>
      </header>
      <div className={styles.info}>
        <img src={bitcoin} alt="" />
        <span>Bitcoin</span>
        <p>Preço Atual: R$ {actualPrice ? actualPrice : "Carregando..."}</p>
      </div>
    </div>
  );
};

export default BitcoinInfo;
