import { useEffect, useState } from "react";
import api from "../service/BaseService";

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
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

    async function getUsersAux(){
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

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <button onClick={() => hanndleEditar(task)}>Editar</button>
                    <button onClick={() => deleteTask(task.id)}>Excluir</button>
                </div>

            ))}

            <form onSubmit={postUser}>
                <input type="text" required placeholder='Titulo' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" required placeholder='Descricao' value={description} onChange={(e) => setDescription(e.target.value)} />

                <select value={userAuxId} onChange={e => setUserAuxId (e.target.value)}>
                    
                    <option value="">Selecione</option>
                    {userAux.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <h3>Usuario selecionado {userAuxId}</h3>
                <button type="submit" >{handdleEditar ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}</button>
            </form>

        </div>
    );

}

export default Task