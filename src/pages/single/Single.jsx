import {useEffect,useState} from "react"
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {useParams} from "react-router-dom"
const Single = (props) => {
  const [data, setData] = useState();
  let params=useParams();
  console.log(params)
  const getUser=()=>{
    fetch("http://194.90.158.74/bgroup53/test2/tar4/api/Users/?email=tomer123@gmail.com&n=1", {
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
          setData(result)  
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  useEffect(() => {
    getUser()
  },[])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data && data.Image}
                alt=""
                className="itemImg"
              />
              <>{data &&
              <div className="details">
                <h1 className="itemTitle">{data.Username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.Email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Bio:</span>
                  <span className="itemValue">
                  {data.Bio}
                  </span>
                </div>

              </div>
                }
              </>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Activity (Last 6 Months)" />
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

export default Single;
