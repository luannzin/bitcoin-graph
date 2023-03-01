import React from "react";
import styles from "./style.module.css";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";

const BitcoinGraph = () => {
  const [btcData, setBtcData] = React.useState();
  const [firstTime, setFirstTime] = React.useState();
  const [secondTime, setSecondTime] = React.useState();
  const [errorLog, setErrorLog] = React.useState(false);

  const updateGraph = (e) => {
    e.preventDefault();
    const renderRange = async (from, to) => {
      setErrorLog(false);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=brl&from=${from}&to=${to}`
      );
      const data = await response.json();
      setBtcData(data["prices"]);
    };
    if (
      firstTime < 0 ||
      secondTime < 0 ||
      !firstTime ||
      !secondTime ||
      firstTime === secondTime
      //Verificação para evitar erros.
    ) {
      setErrorLog(true); //Ativar a mensagem de erros.
    } else {
      if (firstTime < secondTime) {
        renderRange(firstTime, secondTime);
      } else {
        renderRange(secondTime, firstTime);
      }
    } //Independente da ordem em que for colocadas as datas, a menor será considerado como a primeira.
  };

  React.useEffect(() => {
    const initialRender = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=730"
      ); //Lista os dados de preço do Bitcoin dos ultimos 730 dias (2 anos).
      const data = await response.json();
      setBtcData(data["prices"]);
    };
    initialRender();
  }, []);

  return (
    <div className={styles.wrapper}>
      {btcData ? (
        <Line
          className="graph"
          data={{
            labels: btcData.map((b) => {
              const time = new Date(b[0]);
              const newTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
              return newTime;
            }),
            datasets: [
              {
                data: btcData.map((b) => b[1].toFixed(2)),
                label: `Preço`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
        />
      ) : (
        "Carregando..."
      )}
      <form action="">
        <p>De</p>
        <input
          type="datetime-local"
          onChange={(e) => {
            setFirstTime(
              parseInt((new Date(e.target.value).getTime() / 1000).toFixed())
            );
          }}
        />
        <p>Até</p>
        <input
          type="datetime-local"
          onChange={(e) => {
            setSecondTime(
              parseInt((new Date(e.target.value).getTime() / 1000).toFixed())
            );
          }}
        />
        {errorLog ? <span>Datas vazias ou inválidas.</span> : ""}
        <button onClick={updateGraph}>Enviar</button>
      </form>
    </div>
  );
};

export default BitcoinGraph;
