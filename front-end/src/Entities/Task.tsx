import "../Styles/Task.css"
import '../Styles/Entities.css'

import { useEffect, useState } from "react";
import api from "../service/BaseService";
import Modal from "../Components/Modal";
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import UserEmail from "../service/EmailLogado";
import Swal from 'sweetalert2';
import SearchForm from "../Components/SearchForm";

type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
    user: UserAux
}

type UserAux = {
    id: string;
    name: string;
    email: string
}

function Task() {

    const initialForm = {
        title: "",
        description: "",
        completed: false,

    };

    const [tasks, setTasks] = useState<Task[]>([]);
    const [form, setForm] = useState(initialForm);
    const [isEditing, setisEditing] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [titleBusca, setTitleBusca] = useState("")


    function getTasks() {
        api.get("/task").then((response) => setTasks(response.data)).catch((error) => console.log("Ocorreu um erro: ", error));
    }

    useEffect(() => {
        getTasks();

    }, [])

    function hanndleEditar(e: Task) {
        setForm({
            title: (e.title),
            description: (e.description),
            completed: (e.completed),
        })
        setId(e.id)
        setisEditing(true);
        setOpen(true)
    }

    async function createTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isEditing) {
            await api.post("/task", form);

        } else {
            await api.put(`/task/${id}`, form);
            setisEditing(false);
        }

        setOpen(false)
        clearForm();
        getTasks();
    }

    function clearForm() {
        setForm(initialForm)
    }

    async function deleteTask(id: number) {

        const acao = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Deseja mesmo excluir usuario?.',
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#c41616',
            confirmButtonText: 'Sim, excluir',
            confirmButtonColor: '#1daa29'
        });
        if (acao.isConfirmed) {
            await api.delete(`/task/${id}`);
            Swal.fire({ title: "Deletado!", icon: 'success' })
            getTasks();

        } else {
            alert("operação cancelada")
        }
        clearForm();
    }

    const [open, setOpen] = useState(false)
    const [opcao, setOpcao] = useState('');

    function resetModal() {
        setOpen(false)
        setOpcao("")
        setisEditing(false)
    }

    async function buscarTitle() {

        try {
            const response = await api.get(`/task?title=${titleBusca}`);
            setTasks(response.data);
        } catch (error) {
            console.log("Erro ao buscar:", error);
        }

    }

    function limparBusca(){
        setTitleBusca("")
        getTasks()
    }


    return (
        <div className='containerEntities'>
            
                <SearchForm 
                value={titleBusca}
                onChange={setTitleBusca}
                onSubmit={buscarTitle}
                onClear={limparBusca}
                onOpen={setOpen}
                textButton="Adicionar Tarefa"
                />
                

            <div className='lista'>
                <div className='cabecalhoArea gridTask'>
                    <h3 className="cabecalhoColuna">Titulo</h3>
                    <h3 className="cabecalhoColuna" >Descrição</h3>
                    <h3 className="cabecalhoColuna" >Usuario</h3>
                    <h3 className="cabecalhoColuna" >Progresso</h3>
                    <h3 className="cabecalhoColuna">Ações</h3>
                </div>
                <div>
                    {tasks.map((task) => (

                        <div className='taskArea gridTask' key={task.id}>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                            <div className="colunaUser">
                                <p>{task.user.name}</p>
                                <p>{task.user.email}</p>
                            </div>
                            <p>{task.completed ? "Completada" : "Incompleta"}</p>

                            <div className='acoes'>
                                <button className="buttonAcoes" onClick={() => hanndleEditar(task)}><RiEdit2Line className='editar' /></button>
                                <button className="buttonAcoes" onClick={() => deleteTask(task.id)}><MdOutlineDeleteOutline className='lixeira' /></button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>



            {open && (
                <Modal>
                    <h2>{isEditing? "Editar tarefa" : "Criar Tarefa"} </h2>
                    <p>Usuario: <UserEmail /></p>

                    <form className="formTask" onSubmit={createTask}>
                        <div className="areaInputTask">
                            <label className="labelTask" htmlFor=""> Insira um titulo:
                                <input className="inputCriarTask" type="text" required placeholder='Titulo' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                            </label>

                            <label className="labelTask" htmlFor=""> Insira um descrição:
                                <input className="inputCriarTask" type="text" required placeholder='Descricao' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                            </label>

                            <label className="labelTask" htmlFor=""> Qual a prioridade?
                                <select className="inputCriarUser" id="itens" value={opcao} onChange={(e) => setOpcao(e.target.value)}>
                                    <option value="" disabled>Selecione...</option>
                                    <option value="MINIMA">Minima</option>
                                    <option value="MEDIA">Media</option>
                                    <option value="MAXIMA">Maxima</option>
                                </select>
                            </label>
                            {isEditing && (
                                <label className="labelTask" htmlFor=""> Concluir tarefa?
                                    <input className="inputCheck" type="checkbox" checked={form.completed} onChange={(e) => setForm({ ...form, completed: e.target.checked })} />
                                </label>
                            )}
                        </div>


                        <div className="areaBotoesCriarTask">
                            <button className="buttonCancelar" type="button" onClick={resetModal}>Cancelar</button>
                            <button className="buttonCriar" type="submit" > Salvar</button>
                        </div>

                    </form>


                </Modal>
            )}

        </div>
    );

}

export default Task