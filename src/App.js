import { Routes,Route,BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import Login from "./Components/Auth/Login";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from "./Components/Auth/Register";
import User from "./Components/User/User";
import AcountPage from "./Components/Pages/AcountPage";
import Test from "./Components/Pages/Test";
import DetailPage from "./Components/Pages/DetailPage";
import EditPage from "./Components/Pages/EditPage";
axios.defaults.withCredentials=true
function App() {
  return (
    <User>
   <Router>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/account" element={<AcountPage />}/>
      <Route path="/account/:slug?" element={<AcountPage />}/>
      <Route path="/detail/:id?" element={<DetailPage />}/>
      <Route path="/test" element={<Test />}/>
      <Route path="/edit/:id?" element={<EditPage />}/>
    </Routes>
   </Router>
    </User>
  );
}

export default App;
