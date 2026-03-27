import React, { useEffect, useState } from "react";
import  api  from "../service/BaseService";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    async function autenticarLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        try{
        const response  = await api.post("/auth/login", {
            email,
            password
        })
            localStorage.setItem("token", response.data.access_token)
            navigate('/home');

        }catch(error){
         alert("Email ou senha invalidos!")
        }

    }

    function mostrar() {
        alert(localStorage.getItem("token"))
    }

    return (
        <main>
            <div className="container">
                <div className="taskCadastro">
                    <form className="formUser" action="" onSubmit={autenticarLogin}>
                        <h1>Login</h1>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">  Entrar </button>
                    </form>
                </div>
                
            </div>

        </main>
    )

}

export default Login