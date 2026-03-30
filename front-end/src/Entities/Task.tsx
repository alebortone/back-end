import { useEffect, useState } from "react";
import api from "../service/BaseService";
import Modal from "../Components/Modal";
import "../Styles/Task.css"

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
    user :UserAux
}

type UserAux = {
    id: string;
    name: string;
}

function Task() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [userAux, setUserAux] = useState<UserAux[]>([]);

    const [userAuxId, setUserAuxId] = useState<string | "">("");
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState<number | null>(null);
    const [completed, setCompleted] = useState(false);
    const [handdleEditar, setHanddleEditar] = useState(false);


    function getTasks() {
        api.get("/task").then((response) => setTasks(response.data)).catch((error) => console.log("Ocorreu um erro: ", error));
    }

    async function getUsersAux() {
        await api.get("/users").then((response) => setUserAux(response.data)).catch((error) => console.log("Ocorreu um erro: ", error));
    }

    useEffect(() => {
        getTasks();
        getUsersAux();
    }, [])

    function hanndleEditar(e: Task) {
        setTitle(e.title)
        setDescription(e.description)
        setCompleted(e.completed)
        setId(e.id)
        setUserAuxId(e.userId)
        setHanddleEditar(true);
    }

    async function postUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!handdleEditar) {
            await api.post("/task", {
                title,
                description,
                completed,
                userId: userAuxId

            });

        } else {
            await api.put(`/task/${id}`, {
                title,
                description,
                completed,
                userId: userAuxId

            })
            setHanddleEditar(false);
        }


        clearForm();
        getTasks();

    }

    function clearForm() {
        setTitle("");
        setDescription("");
        setCompleted(false);
    }

    async function deleteTask(id: number) {
        await api.delete(`/task/${id}`);
        getTasks();
    }

    const [open, setOpen] = useState(false)
    const [opcao, setOpcao] = useState('');

    function resetModal() {
        setOpen(false)
        setOpcao("")
        setHanddleEditar(false)
    }


    return (
        <div>

            <button onClick={() => setOpen(true)}>Adcionar tarefa REAL</button>
            {open && (
                <Modal>
                    <h2>Criar Tarefa</h2>

                    <form className="formTask" onSubmit={postUser}>
                        <div className="areaInputTask">
                            <label htmlFor=""> Insira um titulo:
                                <input className = "inputCriarTask" type="text" required placeholder='Titulo' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </label>
                            
                            <label htmlFor=""> Insira um descrição
                                <input className = "inputCriarTask" type="text" required placeholder='Descricao' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </label>

                            <label htmlFor=""> Qual a prioridade?
                                <select className="inputCriarUser" id="itens" value={opcao} onChange={(e) => setOpcao(e.target.value)}>
                                    <option value="" disabled>Selecione...</option>
                                    <option value="MINIMA">Minima</option>
                                    <option value="MEDIA">Media</option>
                                    <option value="MAXIMA">Maxima</option>
                                </select>
                            </label>
                        </div>

                        
                        <div className="areaBotoesCriarTask">
                            <button className="buttonCancelar" type="button" onClick={resetModal}>Cancelar</button>
                            <button className="buttonCriar" type="submit" > Salvar</button>
                        </div>
                    </form>
                    

                </Modal>
            ) || handdleEditar && (
                <Modal>
                    <h2>Criar Usuário</h2>


                </Modal>

            )}



            {tasks.map((task) => (
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>{task.user.name}</p>
                    <button onClick={() => hanndleEditar(task)}>Editar</button>
                    <button onClick={() => deleteTask(task.id)}>Excluir</button>
                </div>

            ))}

            
        </div>
    );

}

export default Task