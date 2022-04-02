import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableCoins from "../../components/datatableCoins/DatatableCoins"
const List = (props) => {
  if(props.action=="coins"){
    return (
      <div className="list">
        <Sidebar/>
        <div className="listContainer">
          <Navbar/>
          <DatatableCoins/>
        </div>
      </div>
    )
  }
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List