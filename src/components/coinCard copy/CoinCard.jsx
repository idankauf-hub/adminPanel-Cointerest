import { useEffect, useState } from "react";
import "./CoinCard.scss";
import Sidebar from "../sidebar/Sidebar";
import Chart from "../chart/Chart";
import { useParams, useLocation } from "react-router-dom";
import { Timeline, Tweet } from "react-twitter-widgets";
import TweetsTable from "../tweetsTable/TweetsTable";
import { Audio } from "react-loader-spinner";

const CoinCard = (props) => {
  const [data, setData] = useState();
  const [pred, setPred] = useState();

  let params = useParams();
  const getUser = () => {
    fetch("http://194.90.158.74/bgroup53/test2/tar4/api/Coins", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          let result1 = result.filter(
            (word) => word.Coin_name == params.coinId
          );
          setData(result1);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  const getPrediction = () => {
    fetch(
      `http://194.90.158.74/bgroup53/test2/tar4/api/Predictions/?coin_name=${params.coinId}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
        }),
      }
    )
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          setPred(result[0].Predicted_price);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  useEffect(() => {
    getUser();
    if (params.coinId == "Bitcoin") {
      getPrediction();
    }
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data && data[0].Coin_picture}
                alt=""
                className="itemImg"
              />
              <>
                {data && (
                  <div className="details">
                    <h1 className="itemTitle">{data[0].Coin_name}</h1>
                    <h3 className="itemTitle">
                      ${data[0].Price_history[0].Coin_value}
                    </h3>
                    <span
                      className={`status ${
                        data[0].Price_history[0].Percent_change_24h >= 0
                          ? "Positive"
                          : "Negative"
                      }`}
                    >
                      {data[0].Price_history[0].Percent_change_24h + "%"}
                    </span>
                    <div className="detailItem">
                      <span className="itemKey">Coin info:</span>
                      <span className="itemValue">{data[0].Coin_info}</span>
                    </div>
                    {params.coinId === "Bitcoin" ? (
                      <div className="detailItem">
                        <span className="itemKey">Next Prediction:</span>
                        <span className="itemValue">${pred}</span>
                        <span
                          className={`status ${
                            pred - data[0].Price_history[0].Coin_value >= 0
                              ? "Positive"
                              : "Negative"
                          }`}
                        >
                          {pred - data[0].Price_history[0].Coin_value >= 0
                            ? (
                                pred / data[0].Price_history[0].Coin_value -
                                1
                              ).toFixed(3)
                            : (
                                1 -
                                pred / data[0].Price_history[0].Coin_value
                              ).toFixed(3)}
                          %
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                )}
              </>
            </div>
          </div>
          <div className="right">
          {<h1>Loading...</h1> &&
            <Chart
              aspect={3 / 1}
              title="Coin data"
              coin={data && data[0].Coin_name}
            />}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">
            {data && data[0].Coin_name === "Bitcoin"
              ? "Last Tweets"
              : "Last Transactions"}
          </h1>
          {data && data[0].Coin_name === "Bitcoin" ? (
            <h1>Loading...</h1> && <TweetsTable />
          ) : (
            <h1>No Transactions</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
