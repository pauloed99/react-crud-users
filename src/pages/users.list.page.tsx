import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import api from "../api/user.api";
import CardsGroupComponent from "../components/cards.group.component";
import User from "../models/User";
import styles from "../styles/users.list.page.module.css";

interface FilterInputs {
  age: string;
  cpfCnpj: string;
}

const UsersListPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const inputsValues: FilterInputs = {age: '', cpfCnpj: ''};

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await api.get<User[]>('');
      setUsers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.request)
          setError('Erro de conexão com o servidor, tente mais tarde!');
        if (error.response)
          setError('Erro ao exibir os usuários, tente mais tarde!');
      }
    }
    setIsLoading(false);
  };

  const filterByAgeAndCpfCnpj = async (values: FilterInputs) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await api.get<User[]>('', {
        params: values,
      });
      setUsers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.request)
          setError("Erro de conexão com o servidor, tente mais tarde!");
        if (error.response)
          setError("Erro ao filtrar os usuários, tente mais tarde!");
      }
    }
    setIsLoading(false);
  };

  const deleteUser = async (id: number) => {
    try {
      setError('');
      setIsLoading(true);
      await api.delete(`${id}`);
      await getAllUsers();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.request)
          setError('Erro de conexão com o servidor, tente mais tarde!');
        if (error.response)
          setError('Erro ao deletar o usuário, verifique se ele existe!');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Lista de Usuários</h1>
      <div className={styles.formFilter}>
        <Formik
          initialValues={inputsValues}
          onSubmit={(values) => filterByAgeAndCpfCnpj(values)}
        >
          <Form>
            <label htmlFor="maxAge">Idade Máxima:</label>
            <Field
              id="maxAge"
              placeholder="Digite a idade máxima"
              name="maxAge"
              className={styles.inputFilter}
              autoComplete="off"
            />

            <label htmlFor="cpfCnpj">Cpf/Cnpj:</label>
            <Field
              id="cpfCnpj"
              placeholder="Digite o Cpf/Cnpj"
              name="cpfCnpj"
              className={styles.inputFilter}
              autoComplete="off"
            />
            <button className={styles.buttonFilter} type="submit">
              Filtrar
            </button>
          </Form>
        </Formik>
      </div>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <CardsGroupComponent users={users} deleteUser={deleteUser} />
      )}
    </div>
  );
};

export default UsersListPage;
