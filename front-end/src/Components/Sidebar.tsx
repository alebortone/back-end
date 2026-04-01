import { Link } from "react-router-dom";
import "../Styles/SideBar.css";
import logo from "../assets/logo_usertasker.png";
import { FiUsers } from "react-icons/fi";
import { LuClipboardCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";


function SideBar() {



    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/");
    }


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
                    <Link className="link" to="users">
                        <div className="navButton">
                            <FiUsers />Usuarios
                        </div>
                    </Link>
                    <Link className="link" to="task">
                        <div className="navButton">
                            <LuClipboardCheck />Tarefas
                        </div>
                    </Link>


                </div>
                <div className="navButton  sair">
                    <button className="link"onClick={logout}><IoMdExit /> Sair</button>
                </div>
            </div>

        </div>

    )

}

export default SideBar;