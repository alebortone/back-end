# 🚀 UserFlow - Full Stack Task Manager

Este é um projeto Full Stack desenvolvido para gerenciar usuários e tarefas, com um sistema sólido de autenticação e persistência de dados.

## 🛠️ Tecnologias Utilizadas

### **Back-end**
- **Framework:** [NestJS](https://nestjs.com/)
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM
- **Autenticação:** JWT (JSON Web Token) com Passport
- **Segurança:** Hashing de senhas com Bcrypt

### **Front-end**
- **Framework:** [React](https://reactjs.dev/)
- **Build Tool:** Vite
- **Linguagem:** TypeScript

---

## 📌 Funcionalidades
- [x] **Autenticação:** Login seguro e geração de tokens JWT.
- [x] **Gestão de Usuários:** CRUD completo e armazenamento de senhas com hash.
- [x] **Gestão de Tasks:** CRUD de tarefas vinculado aos usuários.
- [x] **Segurança:** Proteção de rotas no back-end para usuários autenticados.

---

## 📂 Estrutura do Repositório

- `/back-end`: API robusta construída com NestJS.
- `/meu-app-react`: Interface moderna construída com React + Vite.

---

## 🚀 Como executar o projeto

### **1. Pré-requisitos**
Certifique-se de ter o **Node.js** e o **PostgreSQL** instalados em sua máquina.

### **2. Configuração do Back-end**
1. Entre na pasta: `cd back-end`
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env` com as credenciais do seu PostgreSQL (Host, Porta, Usuário, Senha e Database).
4. Inicie o servidor: `npm run start:dev`

### **3. Configuração do Front-end**
1. Entre na pasta: `cd meu-app-react`
2. Instale as dependências: `npm install`
3. Inicie o projeto: `npm run dev`

---

## 👨‍💻 Autor
**Alexandre Bortone** Estudante de Sistemas de Informação - UFLA