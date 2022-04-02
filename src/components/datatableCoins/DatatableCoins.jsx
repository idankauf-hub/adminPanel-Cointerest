import "./datatableCoins.scss";
import { DataGrid } from "@mui/x-data-grid";
import { coinsColumns} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { userInputs } from "../../formSource";

let coins;
const DatatableCoins = (props) => {
  const [data, setData] = useState();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const getCoins=()=>{
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
          console.log("Coins res: "+JSON.stringify(result))
          setData(result)
          coins=result

          console.log(coins)

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
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getCoins()
  },[])

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={coins}
        columns={coinsColumns}
        pageSize={9}
        getRowId={(row) => row.Email}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableCoins;
