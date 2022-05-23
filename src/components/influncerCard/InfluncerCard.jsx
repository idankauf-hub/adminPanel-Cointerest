import { useEffect, useState } from "react";
import "./influncerCard.scss";
import Sidebar from "../sidebar/Sidebar";
import Chart from "../chart/Chart";
import { useParams, useLocation } from "react-router-dom";
import { Timeline, Tweet } from "react-twitter-widgets";
import { Influencers } from "../../Influencers";
import VerifiedIcon from "@mui/icons-material/Verified";
import TweetsTable from "../tweetsTable/TweetsTable";

const InfluencerCard = (props) => {
  const [data, setData] = useState(Influencers);
  const [pred, setPred] = useState();

  let params = useParams();

  const getUser = () => {
    const tmp = Influencers.filter(
      (data) => data.username === params.influncerId
    );
    setData(tmp);
    console.log(tmp);
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
                src={"https://unavatar.io/twitter/" + data[0].username}
                alt=""
                className="itemImg"
              />
              <>
                {data && (
                  <div className="details">
                    <h1 className="itemTitle">
                      {data[0].username + "     "}
                      {data && data[0].verified === true ? (
                        <VerifiedIcon color="secondary" />
                      ) : (
                        ""
                      )}
                    </h1>
                    <h3 className="itemTitle">
                      <span>Followers: </span>
                      {data[0].followers_count}
                    </h3>
                  </div>
                )}
              </>
            </div>
          </div>
          <div className="right">
            {<h1>Loading...</h1> && (
              <Chart
                aspect={3 / 1}
                title="Coin data"
                coin={data && data[0].Coin_name}
              />
            )}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Tweets</h1>
          {/* <Timeline
            dataSource={{
              sourceType: "profile",
              screenName: params.influncerId,
            }}
            options={{
              height: "800",
            }}
          /> */}
          {<TweetsTable influncer={params}/>}
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;
