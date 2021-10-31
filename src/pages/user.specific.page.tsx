import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import api from '../api/user.api';
import User from '../models/User';
import styles from '../styles/users.create.page.module.css';
import StatusModalComponent from '../components/status.modal.component';
import axios from 'axios';

const UserSpecificPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState<User>({
        id: '',
        name: '',
        password: '',
        cpfCnpj: '',
        birthDate: '',
        phone: ''
    });  
    const {id} = useParams<{id: string}>();

    const showModal = () => setModalVisibility(true);
    const closeModal = () => setModalVisibility(false);
  
    useEffect(() => {getUser();}, []);
  
    const getUser = async () => {
      try {
          const response = await api.get<User>(id);
          setUser(response.data);
          setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
            if(error.request)
              setError('Erro de conexão com o servidor da aplicação')
            if(error.response){
              setError(error.message);
            }
          }
      }
      setIsLoading(false);
    } 
  
    const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError('');
            showModal();
            await api.put(id, user);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.request)
                  setError('Erro de conexão com o servidor da aplicação')
                if(error.response){
                  setError(error.message);
                }
            }
        }
        setIsLoading(false)
    }

    return (
      <div className={styles.mainContainer}>
          <h1>Usuário a ser pesquisado</h1>
          {   
              isLoading ?
                  <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </Spinner> : 
                  
              error ?
                  <h1>Não foi possível atualizar o usuário</h1> 
                  :
                  <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
                <form onSubmit={(e) => updateUser(e)}>
                <label htmlFor="name">Nome:</label>
                <br />
                <input id="name" required placeholder="Digite seu Nome" className="form-control"
                value={user.name}
                autoComplete="off" onChange={(e) => setUser({...user, name: e.target.value})}/>
                <br />

                <label htmlFor="cpfCnpj">CPF/CNPJ:</label>
                <br />
                <input id="cpfCnpj" placeholder="Digite seu CPF ou CNPJ" className="form-control"
                value={user.cpfCnpj}
                autoComplete="off" readOnly/>
                <br />

                <label htmlFor="phone">Telefone:</label>
                <br />
                <input id="phone" required placeholder="Digite seu Telefone" className="form-control"
                value={user.phone}
                autoComplete="off" onChange={(e) => setUser({...user, phone: e.target.value})}/>
                <br />

                <label htmlFor="password">Senha:</label>
                <br />
                <input type="password" id="password" placeholder="Digite sua Senha" 
                className="form-control" autoComplete="off" 
                onChange={(e) => setUser({...user, password: e.target.value})}/>
                <br />

                <label htmlFor="birthDate">Data de Nascimento:</label>
                <br />
                <input id="birthDate" placeholder="Digite sua Data de Nascimento" 
                className="form-control" value={user.birthDate}
                autoComplete="off" readOnly/>
                <br />

                <button className={`container ${styles.buttonSubmit}`} type="submit">Atualizar</button>

                </form>

                <StatusModalComponent 
                closeModal={closeModal}
                modalVisibility={modalVisibility}
                error={error}
                isLoading={isLoading}
                showModal={showModal}
                successMessage="O usuário foi editado com sucesso!"
                />
            </div>
            </div>
            }
        </div>
    );
}

export default UserSpecificPage;