import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home";
import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";
import  { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/Product/ProductDetails";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import Profile from "./components/UserProfile/Profile";
import UpdateUser from "./components/UserProfile/UpdateUser";
import ProtectedRoute from "./components/User/ProtectedRoute";

function App() {
  return (
    <Router>
    <div className="App">
    <Toaster  position="top-center"/>
     <Header/>
     <div className="container">
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/product/:id" element={<ProductDetails/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<SignUp/>}/>
     <Route path="/me/profile" element={<ProtectedRoute><Profile/></ProtectedRoute> }/>
     <Route path="/me/update_Profile" element={<UpdateUser/>}/>
     </Routes>
     </div>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
