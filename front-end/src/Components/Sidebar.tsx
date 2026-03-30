import { Link } from "react-router-dom";
import "../Styles/SideBar.css";
import logo from "../assets/logo_usertasker.png";
import { FiUsers } from "react-icons/fi";
import { LuClipboardCheck } from "react-icons/lu";

function SideBar() {

    return (

        <div className="sideBar">

            <div className="containerSideBar">
                <Link className="link" to="/home">
                    <div className="areaLogo">
                        <img className="imgLogoSideBar" src={logo} />
                        <h2 className="nomeSistema">UserTasker</h2>
                    </div>
                </Link>
                <div className="areaBotoes">
                    <div className="navButton">
                        <Link className="link" to="users"> <FiUsers />Usuarios</Link> 
                    </div>
                    <div className="navButton">
                         <Link className="link"to="task"><LuClipboardCheck />Tarefas</Link> 
                    </div>
                </div>
            </div>

        </div>

    )

}

export default SideBar;