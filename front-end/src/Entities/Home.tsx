import { BsPersonWorkspace } from "react-icons/bs";
import "../Styles/Home.css"
import { FiUsers } from "react-icons/fi";
import { LuClipboardCheck } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { useEffect, useState } from "react";
import api from "../service/BaseService";



type DashboardData = {
    totalUsers: number;
    totalTasks: number;
    completedTasks: number;
    pendentsTasks: number;
    myTasks: Task[]
    myTasksCont: number;
    myCompletedTasks: number;
    myPendentsTasks: number
};

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}




function Home() {


    const [data, setData] = useState<DashboardData | null>(null);
    const percent = data?.totalTasks ? (data.completedTasks / data.totalTasks) * 100: 0;

    async function fetchDashboard() {
        try {
            const response = await api.get("/dashboard");
            setData(response.data);
        } catch (error) {
            console.log("Erro ao carregar dashboard", error);

        }
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    
    return (

        <div className='containerEntities'>

            <div className="areaCards">


                <h2 className="cabecalhoColuna">Geral</h2>
                <div className="cardsGeral">

                    <div className="cardUsers card">
                        <h3>Usuarios:</h3>

                        <p className="nomeLinha">Total de usuarios: {data?.totalUsers}</p>
                        <p className="nomeLinha" >Usarios criados hoje: </p>
                        <FiUsers className="icon" />
                    </div>

                    <div className="cardTarefas card">
                        <h3>Tarefas:</h3>

                        <p className="nomeLinha">Total de tarefas: {data?.totalTasks}</p>
                        <p className="nomeLinha" >Tarefas pendentes: {data?.pendentsTasks}</p>
                        <p className="nomeLinha" >Tarefas criadas hoje: </p>
                        <VscTasklist className="icon" />
                    </div>
                    <div className="cardTarefasConcluidas card">
                        <h3>Tarefas Concluidas</h3>

                        <p className="nomeLinha">Total concluidas: {data?.completedTasks}</p>
                        <p className="nomeLinha" >Taxa de conclusão: {percent}%</p>
                        <LuClipboardCheck className="icon" />
                    </div>
                </div>

                <h2 className="cabecalhoColuna">Pessoal</h2>
                
                <div className="areaPessoal">
                    <div className="cardTarefasUser card">
                        <div className="tarefasAtuais">
                            <h3>Minhas tarefas</h3>

                            {data?.myTasks.map((task) => (

                                <div className="taskUser" key={task.id}>
                                    <p><strong>Titulo:</strong> {task.title}</p>
                                    <p><strong>Descrição:</strong> {task.description}</p>
                                </div>
                            ))}

                        </div>

                        <div className="tarefasAdjacentes">
                            <p className="nomeLinha">Tarefas concluidas: {data?.myCompletedTasks}</p>
                            <p className="nomeLinha">Tarefas pendentes : {data?.myPendentsTasks}</p>

                        </div>
                        <BsPersonWorkspace className="iconPessoal" />
                    </div>
                </div>

            </div>

        </div>
    )

}


export default Home;