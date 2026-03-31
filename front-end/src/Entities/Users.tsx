import { useEffect, useState, type ReactEventHandler } from 'react';
import api from '../service/BaseService'
import '../Styles/User.css'
import Modal from '../Components/Modal';
import Swal from 'sweetalert2';

import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
}

function Users() {

    const [user, setUser] = useState<User[]>([]);
    const [password, setPassword] = useState("")
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [handdleEditar, setHanddleEditar] = useState(false);
    const isActive = true;
    const [visualizar, setVisualizar] = useState(false)

    const [open, setOpen] = useState(false);

    async function getUsers() {
        await api.get("/users").then((response) => setUser(response.data)).catch((error) => console.log("Ocorreu um erro: ", error));
    }

    useEffect(() => {
        getUsers();
    }, [])



    async function deleteUser(id: string) {

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
            await api.delete(`/users/${id}`);
            Swal.fire({title: "Deletado!", icon: 'success'})
            getUsers();
        } else {
            Swal.fire({title: "Operação cancelada!"})
        }
        
        clearForm();
        
    }

    function handlleEditar(e: User) {
        setHanddleEditar(true);
        setName(e.name)
        setEmail(e.email)
        setId(e.id)
    }

    async function postUser() {

        if (!handdleEditar) {
            await api.post("/users", {
                name,
                email,
                password,
                isActive
            });
        } else {
            await api.put(`/users/${id}`, {
                id,
                name,
                email,
                isActive
            })
            setHanddleEditar(false);
        }

        setOpen(false)
        clearForm();
        getUsers();
    }

    async function getUserById(id: number) {
        await api.get(`/users/${id}`);
    }

    function clearForm() {
        setName("");
        setEmail("");
        setPassword("")
        setOpcao("")
    }

    const [opcao, setOpcao] = useState('');

    function resetModal() {
        setOpen(false)
        setOpcao("")
        setHanddleEditar(false)
    }


    return (
        <div className='containerUser'>

            <div className='areaAdd'>
                

                <div>
                    <input className= "inputBuscar"type="text" placeholder='Buscar...'/>
                    <button className='buttonBuscar'>Buscar</button>
                </div>
                <button className="buttonAdd" onClick={() => setOpen(!open)}> Adicionar Usuario </button>
            </div>

            {open && (
                <Modal>
                    <h2>Criar Usuário</h2>

                    <form className='cadastroUser' onSubmit={(e) => { e.preventDefault; postUser() }}>
                        <div className='formInputs'>
                            <input className="inputCriarUser" type="text" required placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                            <select className="inputCriarUser" id="itens" value={opcao} onChange={(e) => setOpcao(e.target.value)}>
                                <option value="" disabled>Selecione...</option>
                                <option value="ADMIM">Admin</option>
                                <option value="USUARIO">Usuario</option>
                            </select>
                            <input className="inputCriarUser" type="email" required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="areaSenha">
                                <input className="inputSenha" type={visualizar ? "text" : "password"} required placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button className="buttonEye" onClick={() => setVisualizar(!visualizar)} type="button">
                                    {visualizar ? <FaRegEyeSlash className="eyeIcon" /> : <FaRegEye className="eyeIcon" />}
                                </button>
                            </div>
                        </div>

                        <div className='formBotoes'>
                            <button className="buttonCancelar" type="button" onClick={resetModal}>Cancelar</button>
                            <button className="buttonCriar" type="submit" > Salvar</button>
                        </div>
                    </form>


                </Modal>
            ) || handdleEditar && (
                <Modal>
                    <h2>Atualizar Usuário</h2>

                    <form className='cadastroUser' onSubmit={() => { postUser() }}>
                        <div className='formInputs'>
                            <input className="inputCriarUser" type="text" required placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                            <select className="inputCriarUser" id="itens" value={opcao} onChange={(e) => setOpcao(e.target.value)}>
                                <option value="" disabled>Selecione...</option>
                                <option value="ADMIM">Admin</option>
                                <option value="USUARIO">Usuario</option>
                            </select>
                            <input className="inputCriarUser" type="email" required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className='formBotoes'>
                            <button className="buttonCancelar" type="button" onClick={resetModal}>Cancelar</button>
                            <button className="buttonCriar" type="submit" > Salvar</button>
                        </div>
                    </form>

                </Modal>

            )}

            <div className='lista'>
                <h1>Lista de Usuários</h1>
                <div className='cabecalhoArea gridUser'>
                    <h3>Usuario</h3>
                    <h3>Email</h3>
                    <h3>Perfil</h3>
                    <h3>Ações</h3>
                </div>
                <div>
                    {user.map((users) => (

                        <div className='userArea gridUser' key={users.id}>
                            <p>{users.name}</p>
                            <p>{users.email}</p>
                            <p>{users.isActive ? 'Ativo' : 'Inativo'}</p>
                            <div className='acoes'>
                                <button className="buttonAcoes" onClick={() => handlleEditar(users)}><RiEdit2Line className='editar' /></button>
                                <button className="buttonAcoes" onClick={() => deleteUser(users.id)}><MdOutlineDeleteOutline className='lixeira' /></button>
                            </div>
                        </div>

                    ))}
                </div>
            </div>


        </div>
    );
}

export default Users
