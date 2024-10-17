import "primereact/resources/themes/lara-light-cyan/theme.css";  // Or any other theme
import 'primereact/resources/primereact.min.css';   
import "primeflex/primeflex.css"         // PrimeReact core
import 'primeicons/primeicons.css';    
import "primeflex/themes/primeone-light.css"    

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
// import Login from "./Components/Login";
         
import Signup from "./Components/signup"
import "./App.css"
import ForgetPassword from "./Components/Forget-Password";
import ChangePassword from "./Components/Change-Password";
import States from "./Components/States";
import Cities from "./Components/Cities";
import Areas from "./Components/Areas";
import RoleCategories from "./Components/RoleCategories";
import Home from "./Components/Home";
function App() {
  
 

  return (
    <BrowserRouter>
    <Routes>
      

      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/login"  element={<Signup/>}/>
      
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/states" element={<Dashboard><States/></Dashboard>}/>
      <Route path="/change-password" element={<ChangePassword/>}/>
      <Route path="/cities" element={<Dashboard><Cities/></Dashboard>}/>
      <Route path="/areas" element={<Dashboard><Areas/></Dashboard>}/>
      <Route path="/role-categories" element={<Dashboard><RoleCategories/></Dashboard>}/>
      <Route path='/'  element={<Dashboard><Home/></Dashboard>} />
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
