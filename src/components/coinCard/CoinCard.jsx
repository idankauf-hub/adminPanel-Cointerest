import { useEffect, useState } from "react";
import "./CoinCard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import { useParams, useLocation } from "react-router-dom";
import { Timeline,Tweet } from "react-twitter-widgets";
import TweetsTable from "../tweetsTable/TweetsTable"
const CoinCard = (props) => {
  const [data, setData] = useState();
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
          console.log(result1[0].Coin_name);
          setData(result1);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  useEffect(() => {
    getUser();
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
                      {data[0].Price_history[0].Percent_change_24h}
                    </span>
                    <div className="detailItem">
                      <span className="itemKey">Coin info:</span>
                      <span className="itemValue">{data[0].Coin_info}</span>
                    </div>
                  </div>
                )}
              </>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={4 / 1}
              title="Coin data"
              coin={data && data[0].Coin_name}
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">{data && data[0].Coin_name === "Bitcoin" ?("Last Tweets"):("Last Transactions")}</h1>
          {/* <TweetsTable/> */}
          {/* {<List/>} */}
          {data && data[0].Coin_name === "Bitcoin" ?(<TweetsTable/>):(<h1>Transactions</h1>)}
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
