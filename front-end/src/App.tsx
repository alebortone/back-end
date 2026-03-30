
import { Outlet } from "react-router-dom";
import SideBar from "./Components/Sidebar";
import "./Styles/App.css";




function App() {


    return (
        <div className="containerPag" >
            <SideBar/>
            
            <div className="containerHome">
                
                <h1>Bem vindo</h1>
                
                <Outlet/>
            </div>                    
        </div>
    )
}

export default App;