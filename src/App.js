import { Home } from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ShowUsers } from "./components/showUser";
import { AddUser } from "./components/addUser";
// import { Navbar } from './components/Navbar';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showUsers" element={<ShowUsers />} />
          <Route path="/addUser" element={<AddUser />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
