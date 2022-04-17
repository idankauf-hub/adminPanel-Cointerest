import "./datatableCoins.scss";
import { DataGrid } from "@mui/x-data-grid";
import { coinsColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userInputs } from "../../formSource";

let coins;
const DatatableCoins = (props) => {
  const [data, setData] = useState();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

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
              to={"/coins/"+params.row.Coin_name} state= "bitcoin"
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

  return (
    <div className="datatableCoins">
      <div className="datatableTitle">
        Add New Coin
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={coinsColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row) => row.Coin_name}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableCoins;
