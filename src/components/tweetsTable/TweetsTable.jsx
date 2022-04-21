import "./tweetsTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { tweetsColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userInputs } from "../../formSource";

let coins;
const TweetsTable = (props) => {
  const [data, setData] = useState();

  const getCoins = () => {
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
          console.log("Coins res: " + JSON.stringify(result));
          // coins=result
          setData(result);
          console.log(coins);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/coins/"+params.row.Coin_name} 
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getCoins();
  }, []);

  return ( <div><h1>loader</h1></div> &&
    <div className="datatableCoins">

      <DataGrid
        className="datagrid"
        rows={data}
        columns={tweetsColumns.concat(actionColumn)}
        pageSize={5}
        getRowId={(row) => row.Coin_name}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default TweetsTable;
