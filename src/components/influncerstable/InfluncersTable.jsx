import "./influncerstable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { influncersColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {Influencers } from "../../Influencers";
import VerifiedIcon from '@mui/icons-material/Verified';

let users;
const InfluncersTable = (props) => {
  const [data, setData] = useState(Influencers);


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/influncers/" + params.row.username}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={influncersColumns.concat(actionColumn)}
        pageSize={9}
        getRowId={(row) => row.author_id}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default InfluncersTable;
