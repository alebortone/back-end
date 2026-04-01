
import { Outlet } from "react-router-dom";
import SideBar from "./Components/Sidebar";
import "./Styles/App.css";
import { useLocation } from "react-router-dom";
import UserEmail from "./service/EmailLogado";



function App() {

    const location = useLocation();

    function getTitulo() {
    if (location.pathname.includes("users")) return "Usuários";
    if (location.pathname.includes("task")) return "Tarefas";
    if (location.pathname === "/home") return `Bem-vindo `;
        
    return "Página"
}
    return (
        <div className="containerPag" >
            <SideBar/>
            
            <div className="containerHome">
                
                <h1 className="tituloPag">{getTitulo()} {location.pathname === "/home" ? <UserEmail/>: ""}</h1>
                
                <Outlet/>
            </div>                    
        </div>
    )
}

export default App;