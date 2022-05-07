import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableCoins from "../../components/datatableCoins/DatatableCoins"
import InfluncersTable from "../../components/influncerstable/InfluncersTable"
const List = (props) => {

  if(props.action=="coins"){
    return (
      <div className="list">
        <Sidebar/>
        <div className="listContainer">
          <DatatableCoins/>
        </div>
      </div>
    )
  }
  if(props.action=="influncers"){
    return (
      <div className="list">
        <Sidebar/>
        <div className="listContainer">
          <InfluncersTable/>
        </div>
      </div>
    )
  }
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Datatable/>
      </div>
    </div>
  )
}

export default List