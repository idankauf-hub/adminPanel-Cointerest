import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route ,HashRouter} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import CoinCard from "./components/coinCard/CoinCard";
import InfluencerCard from "./components/influncerCard/InfluncerCard";
function App(props) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <HashRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List action="users" />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="coins">
              <Route index element={<List action="coins" />} />
              <Route path=":coinId" element={<CoinCard />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="influncers">
              <Route index element={<List action="influncers" />} />
              <Route path=":influncerId" element={<InfluencerCard />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
