import "./tweetsTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { tweetsColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userInputs } from "../../formSource";
import BasicModal from "../basicModal/BasicModal";

let coins;
const TweetsTable = (props) => {
  //console.log(props.influncer.influncerId)
  const [data, setData] = useState();

  const getTweets = () => {
    fetch("http://194.90.158.74/bgroup53/test2/tar4/api/Tweets", {
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
          if (props?.influncer?.influncerId) {
            console.log(props.influncer.influncerId);
            let r = result.filter(
              (word) => word.Author === props.influncer.influncerId
            );
            setData(r);
          } else {
            setData(result);
          }
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
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">
              <BasicModal tweet={params.row.Tweet_id} />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getTweets();
  }, []);

  if (data) {
    return (
      <div className="tweetsTable">
        <DataGrid
          getRowId={(row) => row.Tweet_id}
          className="datagrid"
          rows={data}
          columns={tweetsColumns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[9]}
          isCellEditable={(params) => params.row.Tweet_time}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  }
};

export default TweetsTable;
