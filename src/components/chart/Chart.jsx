import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Chart = ({ aspect, title, coin }) => {
  const [data, setData] = useState();
  let params = useParams();
  let apiUrl = "";

  var today = new Date();
  var Lastweek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy+'-'+mm+'-'+dd

  var ldd = String(Lastweek.getDate()).padStart(2, "0");
  var lmm = String(Lastweek.getMonth() + 1).padStart(2, "0"); //January is 0!
  var lyyyy = Lastweek.getFullYear();
  Lastweek = lyyyy+'-'+lmm+'-'+ldd

  if (params.coinId === "Bitcoin") {
    apiUrl = `http://194.90.158.74/bgroup53/test2/tar4/api/Coins/?coin_name=${params.coinId}&interval_type=C&start=${Lastweek}T00:00:00&finish=${today}T23:00:00`;
  } else {
    apiUrl = `http://194.90.158.74/bgroup53/test2/tar4/api/Coins/?coin_name=${params.coinId}&interval_type=D&start=${Lastweek}T00:00:00&finish=${today}T23:00:00`;
  }
  const getHistory = (coin) => {
    fetch(apiUrl, {
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
          console.log(result);
          setData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  useEffect(() => {
    getHistory(coin);
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="Name" />
          <YAxis yAxisId="Value" />
          <YAxis yAxisId="Comp" orientation="right" />

          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />

          <Area
            name={coin}
            type="monotone"
            dataKey="Value"
            yAxisId="Value"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            name="Compound"
            type="monotone"
            dataKey="Comp"
            yAxisId="Comp"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
