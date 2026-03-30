import React, { useEffect, useState } from "react";
import api from "../service/BaseService";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_usertasker.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [visualizar, setVisualizar] = useState(false)

    async function autenticarLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            })
            localStorage.setItem("token", response.data.access_token)
            navigate('/home');

        } catch (error) {
            alert("Email ou senha invalidos!")
        }

    }

    return (
        <main>
            <div className="containerLogin">

                <div className="taskLogo">
                    <img className="imgLogo" src={logo} />
                    <h1 className="nomeSistema">UserTasker</h1>
                </div>

                <div className="taskCadastro">
                    <form className="formUser" action="" onSubmit={autenticarLogin}>
                        <h1>Bem vindo de volta</h1>
                        <h2>Login:</h2>
                        <label htmlFor="inputEmail">E-mail:
                            <input className="inputLogin" id="inputEmail" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label htmlFor="inputSenha">Senha:
                            <input id="inputSenha" type={visualizar?"text":"password"} placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="areaIcon">
                                <button className="buttonIcon" onClick={()=>setVisualizar(!visualizar)} type="button">
                                    {visualizar? <FaRegEyeSlash className="eyeIcon" /> : <FaRegEye className="eyeIcon" /> }
                                </button>
                            </div>
                        </label>
                        <button className="buttonLogin" type="submit">  Entrar </button>
                    </form>
                </div>

            </div>

        </main>
    )

}

export default Login