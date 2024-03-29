import { Home } from "./components/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ShowUser } from "./components/showUser";
import { AddUser } from "./components/addUser";
import "./global.css"

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showUser" element={<ShowUser />} />
          <Route path="/addUser" element={<AddUser />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
