import { useEffect, useState } from "react";
import "./CoinCard.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams, useLocation } from "react-router-dom";
const CoinCard = (props) => {
  const [data, setData] = useState();
  let params = useParams();
  console.log(params.coinId);
  const getUser = () => {
    fetch(
      "http://194.90.158.74/bgroup53/test2/tar4/api/Coins",
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
          let result1 = result.filter(word => word.Coin_name == params.coinId);
          console.log(result1);
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
              <img src={data && data[0].Coin_picture} alt="" className="itemImg" />
              <>
                {data && (
                  <div className="details">
                    <h1 className="itemTitle">{data[0].Coin_name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{data.Email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Bio:</span>
                      <span className="itemValue">{data[0].Coin_info}</span>
                    </div>
                  </div>
                )}
              </>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Coin data" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {/* <List/> */}
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
