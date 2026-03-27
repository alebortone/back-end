import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "./Entities/Login";
import  api  from "./service/BaseService";
import Task from "./Entities/Task";



const checkAuth = async () => {
    try {
        await api.get('/auth/me');
        return true;
    } catch {
        localStorage.removeItem('token');
        return false;
    }
};

function App() {

    const [pageLoaded, setPageLoaded] = useState(false)
    const [autenticado, setAutenticado] = useState(false)

    useEffect(() => {
        async function validar() {
            const isAuth = await checkAuth();
            setAutenticado(isAuth);
            setPageLoaded(true);
        }

        validar();
    }, []);


    return (
        <div>
            {(autenticado ?
                <div>
                    <h1>Bem vindo</h1>
                    
                </div>
                :
                <Login />
            )}
        </div>
    )
}

export default App;