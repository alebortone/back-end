import { useEffect, useState } from 'react';
import api from '../service/BaseService'
import '../Styles/App.css'

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

  async function getUsers() {
    await api.get("/users").then((response) => setUser(response.data)).catch((error) => console.log("Ocorreu um erro: ", error));
  }

  useEffect(() => {
    getUsers();
  }, [])



  async function deleteUser(id: string) {
    await api.delete(`/users/${id}`);
    clearForm();
    getUsers();
  }

  function handlleEditar(e: User) {
    setHanddleEditar(true);
    setName(e.name)
    setEmail(e.email)
    setPassword(e.password)
    setId(e.id)
  }

  async function postUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        password,
        isActive
      })
      setHanddleEditar(false);
    }


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
  }


  return (
    <div>

      <div className='listaUsers'>
        <h1>Lista de Usuários</h1>
        <ul>
          {user.map((users) => (
            <li key={users.id}>
              <strong>Nome:</strong> {users.name} <br />
              <strong>Email:</strong> {users.email} <br />
              <strong>Status:</strong> {users.isActive ? 'Ativo' : 'Inativo'} <br />
              <strong>Criado em:</strong> {new Date(users.createdAt).toLocaleDateString()} <br />
              <button onClick={() => deleteUser(users.id)}>Deletar</button>
              <button onClick={() => handlleEditar(users)}>Atualizar</button>
            </li>
          ))}
        </ul>
      </div>

      <div className='taskCadastroUser'>
        <form onSubmit={postUser}>
          <input type="text" required placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="type" required placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" >{handdleEditar ? 'Atualizar Usuário' : 'Adicionar Usuário'}</button>
        </form>
      </div>

    </div>
  );
}

export default Users
