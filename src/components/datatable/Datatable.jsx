import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { userInputs } from "../../formSource";
import { LocalFireDepartment } from "@mui/icons-material";

let users;
const Datatable = (props) => {
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
         

          console.log("Coins Data: "+ JSON.stringify(data) )

        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };
  const getUsers=()=>{
    fetch("http://194.90.158.74/bgroup53/test2/tar4/api/Users/?search=", {
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
          console.log(result[0])
          console.log(result[0])
          users=result
          console.log(users[0])
          setData(result)

          console.log("data: "+ data)

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
    getUsers()
  },[])
  // if(data == undefined){
  //   alert("fff")
  // return <div><p>hello</p></div>
  // }
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
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row) => row.Email}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
