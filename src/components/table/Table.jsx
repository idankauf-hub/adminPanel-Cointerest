import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const List = () => {
  const [data, setData] = useState();
  let params = useParams();
  console.log(params.userId);

  const getAssets = () => {
    fetch(
      "http://194.90.158.74/bgroup53/test2/tar4/api/Assets/?email=" +
        params.userId,
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
          console.log(result);
          setData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  useEffect(() => {
    getAssets();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Coin name</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">In USD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.Coin_info.Coin_name}>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.Coin_info.Coin_picture} alt="" className="image" />
                  {row.Coin_info.Coin_name}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {row.Amount}
              </TableCell>

              <TableCell className="tableCell">{row.Asset_worth_in_USD}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
