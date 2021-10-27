import React, { useState } from 'react';
import api from '../api/user.api';
import styles from '../styles/users.create.page.module.css';
import User from "../models/User";
import { Link } from 'react-router-dom';
import StatusModalComponent from '../components/status.modal.component';

const UsersCreatePage: React.FC = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userInputs, setUserInputs] = useState({
    name: '',
    password: '',
    cpfCnpj: '',
    birthDate: '',
    phone: ''
  })

  const showModal = () => setModalVisibility(true);
  const closeModal = () => setModalVisibility(false);

  const postUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(false);
      showModal();
      await api.post<User>('', userInputs);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <h1>Crud de Usuários Feito em React</h1>
      <div className={styles.formContainer}>
        <form onSubmit={(e) => postUser(e)}>
          <label htmlFor="name">Nome:</label>
          <br />
          <input id="name" required placeholder="Digite seu Nome" className="form-control"
          autoComplete="off" onChange={(e) => setUserInputs({...userInputs, name: e.target.value})}/>
          <br />

          <label htmlFor="cpfCnpj">CPF/CNPJ:</label>
          <br />
          <input id="cpfCnpj" required placeholder="Digite seu CPF ou CNPJ" className="form-control"
          autoComplete="off" onChange={(e) => setUserInputs({...userInputs, cpfCnpj: e.target.value})}/>
          <br />

          <label htmlFor="phone">Telefone:</label>
          <br />
          <input id="phone" required placeholder="Digite seu Telefone" className="form-control"
          autoComplete="off" onChange={(e) => setUserInputs({...userInputs, phone: e.target.value})}/>
          <br />

          <label htmlFor="password">Senha:</label>
          <br />
          <input type="password" id="password" required placeholder="Digite sua Senha" 
          className="form-control" autoComplete="off" 
          onChange={(e) => setUserInputs({...userInputs, password: e.target.value})}/>
          <br />

          <label htmlFor="birthDate">Data de Nascimento:</label>
          <br />
          <input id="birthDate" type="date" required placeholder="Digite sua Data de Nascimento" className="form-control"
          autoComplete="off" onChange={(e) => {
            const data = e.target.value.split('-');
            const newData = `${data[2]}/${data[1]}/${data[0]}`;
            return setUserInputs({ ...userInputs, birthDate: newData });
          }}/>
          <br />

          <button className={`container ${styles.buttonSubmit}`} type="submit">Criar Usuário</button>
          <Link to="/users">
            <button className={`container ${styles.buttonUsers}`}>Listar Usuários</button>
          </Link>
          
        </form>

        <StatusModalComponent 
          closeModal={closeModal}
          modalVisibility={modalVisibility}
          error={error}
          errorMessage="Erro no servidor interno ao criar usuário!"
          isLoading={isLoading}
          showModal={showModal}
          successMessage="O usuário foi criado com sucesso!"
        />
      </div>
    </div>
  );
}

export default UsersCreatePage;