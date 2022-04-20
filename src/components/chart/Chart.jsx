import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const getHistory = (coin) => {
  fetch(
    `http://194.90.158.74/bgroup53/test2/tar4/api/Coins/?coin_name=${coin}&start=2022-01-01T00:00:00&finish=2022-04-04T00:00:00`,

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
        console.log(result[0]);
      },
      (error) => {
        console.log("err post=", error);
      }
    );
};

const Chart = ({ aspect, title,coin }) => {
  const [data, setData] = useState(
    [    { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 }]
  );
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
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="2">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
