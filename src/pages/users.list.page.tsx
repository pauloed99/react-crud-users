import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../api/user.api';
import CardsGroupComponent from '../components/cards.group.component';
import User from '../models/User';
import styles from '../styles/users.list.page.module.css';

const UsersListPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);  
  const [inputs, setInputs] = useState({age: '', cpfCnpj: ''});

  useEffect(() => {getAllUsers();}, []);



  const getAllUsers = async () => {
    try {
        const response = await api.get<User[]>('');
        setUsers(response.data);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        setError(true);
    }
  }

  const filterByAgeAndCpfCnpj = async () => {
      try {
          setError(false);
          setIsLoading(true);
          const response = await api.get<User[]>('', {
              params: {maxAge: inputs.age,cpfCnpj: inputs.cpfCnpj}
          });
          setUsers(response.data);
          setIsLoading(false);
      } catch (error) {
          setError(true);
          setIsLoading(false);
      }
  }

  const deleteUser = async (id: string) => {
      try {
        setError(false);
        setIsLoading(true);
        await api.delete(`${id}`);
        await getAllUsers();
        setIsLoading(false);
      } catch (error) {
        console.log(2);
        setError(true);
        setIsLoading(false);
      }
  }

  return (
    <div className={styles.mainContainer}>
        <h1>Lista de Usuários</h1>
        
        <div className={styles.formFilter}>
            <label htmlFor="maxAge">Idade Máxima:</label>
            <input id="maxAge" placeholder="Digite a idade máxima" 
            className={styles.inputFilter} autoComplete="off" 
            onChange={(e) => setInputs({...inputs, age: e.target.value})}/>

            <label htmlFor="cpfCnpj">Cpf/Cnpj:</label>
            <input id="cpfCnpj" placeholder="Digite o Cpf/Cnpj" 
            className={styles.inputFilter} autoComplete="off" 
            onChange={(e) => setInputs({...inputs, cpfCnpj: e.target.value})}/>
        </div>
        
        <button className={styles.buttonFilter} onClick={filterByAgeAndCpfCnpj}>Filtrar</button>

        {   
            isLoading ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : 
                
            error ?
                <h1>Erro no servidor da aplicação</h1> 
                :
                <CardsGroupComponent users={users} deleteUser={deleteUser}/>
        }
    </div>
  );
}

export default UsersListPage;