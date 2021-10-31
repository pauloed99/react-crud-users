import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/user.api";
import StatusModalComponent from "../components/status.modal.component";
import signinSchemaValidator from "../helpers/validators/signin.schema.validator";
import styles from "../styles/users.create.page.module.css";

interface SigninInputs {
  name: string;
  password: string;
  cpfCnpj: string;
  birthDate: string;
  phone: string;
}

const UsersCreatePage: React.FC = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const inputsValues: SigninInputs = {
    name: '',
    password: '',
    cpfCnpj: '',
    birthDate: '',
    phone: '',
  };

  const showModal = () => setModalVisibility(true);
  const closeModal = () => setModalVisibility(false);

  const postUser = async (values: SigninInputs, action: FormikHelpers<SigninInputs>) => {
    try {
      setIsLoading(true);
      setError('');
      showModal();
      await api.post("", values);
      action.resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if(error.request)
          setError('Erro de conexão com o servidor da aplicação')
        if(error.response){
          setError('Erro ao criar registro no banco de dados, verifique seus dados');
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Crud de Usuários Feito em React</h1>
      <div className={styles.formContainer}>
        <Formik
          initialValues={inputsValues}
          onSubmit={(values, action) => postUser(values, action)}
          validationSchema={signinSchemaValidator}
        >
          {({setFieldValue}) => (
            <Form>
              <div className={styles.labelInput}>
                <label htmlFor="name">Nome:</label>
                <Field
                  id="name"
                  placeholder="Digite seu Nome"
                  className={`form-control ${styles.input}`}
                  autoComplete="off"
                  name="name"
                />
                <ErrorMessage name="name">
                  {(error) => <p className={styles.errorMessage}>{error}</p>}
                </ErrorMessage>
              </div>

              <div className={styles.labelInput}>
                <label htmlFor="cpfCnpj">CPF/CNPJ:</label>
                <Field
                  id="cpfCnpj"
                  placeholder="Digite seu CPF ou CNPJ"
                  className={`form-control ${styles.input}`}
                  autoComplete="off"
                  name="cpfCnpj"
                />
                <ErrorMessage name="cpfCnpj">
                  {(error) => <p className={styles.errorMessage}>{error}</p>}
                </ErrorMessage>
              </div>

              <div className={styles.labelInput}>
                <label htmlFor="phone">Telefone:</label>
                <Field
                  id="phone"
                  placeholder="Digite seu Telefone"
                  className={`form-control ${styles.input}`}
                  autoComplete="off"
                  name="phone"
                />
                <ErrorMessage name="phone">
                  {(error) => <p className={styles.errorMessage}>{error}</p>}
                </ErrorMessage>
              </div>

              <div className={styles.labelInput}>
                <label htmlFor="password">Senha:</label>
                <Field
                  type="password"
                  id="password"
                  placeholder="Digite sua Senha"
                  className={`form-control ${styles.input}`}
                  autoComplete="off"
                  name="password"
                />
                <ErrorMessage name="password">
                  {(error) => <p className={styles.errorMessage}>{error}</p>}
                </ErrorMessage>
              </div>

              <div className={styles.labelInput}>
                <label htmlFor="birthDate">Data de Nascimento:</label>
                <input
                  id="birthDate"
                  type="date"
                  placeholder="Digite sua Data de Nascimento"
                  className={`form-control ${styles.input}`}
                  autoComplete="off"
                  name="birthDate"
                  onChange={(e) => {
                    const data = e.target.value.split('-');
                    const newData = `${data[2]}/${data[1]}/${data[0]}`;
                    setFieldValue('birthDate', newData);
                  }}
                />
                <ErrorMessage name="birthDate">
                  {(error) => <p className={styles.errorMessage}>{error}</p>}
                </ErrorMessage>
              </div>

              <button
                className={`container ${styles.buttonSubmit}`}
                type="submit"
              >
                Criar Usuário
              </button>
              <Link to="/users">
                <button className={`container ${styles.buttonUsers}`}>
                  Listar Usuários
                </button>
              </Link>
            </Form>
          )}
        </Formik>

        <StatusModalComponent
          closeModal={closeModal}
          modalVisibility={modalVisibility}
          error={error}
          isLoading={isLoading}
          showModal={showModal}
          successMessage="O usuário foi criado com sucesso!"
        />
      </div>
    </div>
  );
};

export default UsersCreatePage;
