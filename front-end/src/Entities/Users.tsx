import '../Styles/User.css'
import '../Styles/Entities.css'

import { useEffect, useState} from 'react';
import api from '../service/BaseService'

import Modal from '../Components/Modal';
import Swal from 'sweetalert2';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import SearchForm from '../Components/SearchForm';
import { BotoesDelEdit } from '../Components/BotoesDelEdit';

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
}

function Users() {

    const initialForm = {
        name: "",
        email: "",
        password: "",
        isActive: true,
    };

    const [user, setUser] = useState<User[]>([]);
    const [formUser, setFormUser] = useState(initialForm)
    const [id, setId] = useState<string | null>(null);
    const [isEditing, setisEditing] = useState(false);
    const [visualizar, setVisualizar] = useState(false)
    const [nameBusca, setNameBusca] = useState("")
    const [open, setOpen] = useState(false);

    async function getUsers() {
        await api.get("/user").then((response) => setUser(response.data)).catch((error) => console.log("Ocorreu um erro: ", error));
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
            await api.delete(`/user/${id}`);
            Swal.fire({ title: "Deletado!", icon: 'success' })
            getUsers();
        } else {
            Swal.fire({ title: "Operação cancelada!" })
        }

        clearForm();

    }

    function handlleEditar(e: User) {

        setFormUser({
            name: (e.name),
            email: (e.email),
            isActive: (e.isActive),
            password: (e.password)
        })

        setId(e.id)
        setisEditing(true);
        setOpen(true);
    }

    async function postUser() {

        if (!isEditing) {
            await api.post("/user", formUser);
        } else {
            await api.put(`/user/${id}`, formUser)
            setisEditing(false);
        }

        setOpen(false)
        clearForm();
        getUsers();
    }


    function clearForm() {
        setFormUser(initialForm)
        setOpcao("")
    }

    const [opcao, setOpcao] = useState('');

    function resetModal() {
        setOpen(false)
        setOpcao("")
        setisEditing(false)
    }

    async function buscarName() {

        try {
            const response = await api.get(`/user?name=${nameBusca}`);
            setUser(response.data);
        } catch (error) {
            console.log("Erro ao buscar:", error);
        }


    }

    function limparBusca(){
        setNameBusca("")
        getUsers()
    }


    return (
        <div className='containerEntities'>

            <SearchForm 
                value={nameBusca}
                onChange={setNameBusca}
                onSubmit={buscarName}
                onClear={limparBusca}
                onOpen={setOpen}
                textButton="Adicionar Usuario"
                />

            {open && (
                <Modal>
                    <h2>{isEditing ? "Editar usuario" : "Criar Usuário"} </h2>

                    <form className='cadastroUser' onSubmit={(e) => { e.preventDefault(); postUser() }}>
                        <div className='formInputs'>
                            <input className="inputCriarUser" type="text" required placeholder='Nome' value={formUser.name} onChange={(e) => setFormUser({ ...formUser, name: e.target.value })} />
                            <select className="inputCriarUser" id="itens" value={opcao} onChange={(e) => setOpcao(e.target.value)}>
                                <option value="" disabled>Selecione...</option>
                                <option value="ADMIM">Admin</option>
                                <option value="USUARIO">Usuario</option>
                            </select>
                            <input className="inputCriarUser" type="email" required placeholder='Email' value={formUser.email} onChange={(e) => setFormUser({ ...formUser, email: e.target.value })} />
                            {!isEditing && (
                                <div className="areaSenha">
                                    <input className="inputSenha" type={visualizar ? "text" : "password"} required placeholder='Senha' value={formUser.password} onChange={(e) => setFormUser({ ...formUser, password: e.target.value })} />
                                    <button className="buttonEye" onClick={() => setVisualizar(!visualizar)} type="button">
                                        {visualizar ? <FaRegEyeSlash className="eyeIcon" /> : <FaRegEye className="eyeIcon" />}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className='formBotoes'>
                            <button className="buttonCancelar" type="button" onClick={resetModal}>Cancelar</button>
                            <button className="buttonCriar" type="submit" > Salvar</button>
                        </div>
                    </form>

                </Modal>
            )} 


            <div className='lista'>
                
                <div className='cabecalhoArea gridUser'>
                    <h3 className="cabecalhoColuna">Usuario</h3>
                    <h3 className="cabecalhoColuna">Email</h3>
                    <h3 className="cabecalhoColuna">Perfil</h3>
                    <h3 className="cabecalhoColuna">Ações</h3>
                </div>
                <div>
                    {user.map((users) => (

                        <div className='userArea gridUser' key={users.id}>
                            <p>{users.name}</p>
                            <p>{users.email}</p>
                            <p>{users.isActive ? 'Ativo' : 'Inativo'}</p>
                            
                            <BotoesDelEdit onEditing={() => handlleEditar(users)} onDelete={()=>deleteUser(users.id)}/>
                                
                            
                        </div>

                    ))}
                </div>
            </div>


        </div>
    );
}

export default Users
