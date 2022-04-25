import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";

const Featured = () => {
  const [data, setData] = useState();
  const [win, setWin] = useState();
  const [marginError, setMarginError] = useState();
  const [pred, setPred] = useState();

  const winRate = (predictions) => {
    let hit = 0;
    var details = predictions.slice(1).map((pred) => {
      if (
        (pred.Predicted_price >= pred.X_current_price &&
          pred.Y_true_price >= pred.X_current_price) ||
        (pred.Predicted_price <= pred.X_current_price &&
          pred.Y_true_price <= pred.X_current_price)
      ) {
        hit++;
      } 
    });
    return (hit / Object.keys(predictions).length) * 100;
  };

  const calcMarginError = (predictions) => {
    let hit = 0;
    var details = predictions.slice(1).map((pred) => {
      hit += Math.abs(pred.Predicted_price - pred.Y_true_price);
    });
    return hit / Object.keys(predictions).length;
  };

  const predTable = (predictions) => {
    console.log(predictions)
    let a = predictions.slice(1,8).map((pred) => {
     return <div className="summary">
        <div className="item">
          <div className="itemResult">
            <div className="resultAmount">{pred.X_time.slice(0,10)}</div>
          </div>
        </div>
        <div className="item">
          <div className="itemResult">
            <div className="resultAmount">{pred.Predicted_price}</div>
          </div>
        </div>
        <div className="item">
          <div className="itemResult">
            <div className="resultAmount">{pred.Y_true_price}</div>
          </div>
        </div>
      </div>
    });
    setPred(a)
  };

  const getPrediction = () => {
    fetch(
      "http://194.90.158.74/bgroup53/test2/tar4/api/Predictions/?coin_name=Bitcoin",
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
          console.log(result);
          predTable(result)
          setWin(winRate(result));
          setMarginError(calcMarginError(result));
          setData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  useEffect(() => {
    getPrediction();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
      </div>
      <div className="bottom">
        <p className="title">Win Rate</p>

        <div className="featuredChart">
          <CircularProgressbar value={win} text={Math.floor(win)} strokeWidth={5} />
        </div>
        <p className="title">Mean Absolute Error </p>
        <p className="amount">${marginError}</p>
        <p className="title">Last Week Results </p>

        <div className="summary">
        <div className="item">
          <div className="itemTitle">Date</div>
        </div>
        <div className="item">
          <div className="itemTitle">Predictions</div>
        </div>
        <div className="item">
          <div className="itemTitle">True Price</div>
        </div>
      </div>
        {pred}
      </div>
    </div>
  );
};

export default Featured;
