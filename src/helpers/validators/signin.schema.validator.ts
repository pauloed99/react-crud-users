import * as Yup from 'yup';

const signinSchemaValidator = Yup.object().shape(
    {
        name: Yup.string().required('O nome deve ser preenchido!'),
        cpfCnpj: Yup.string().required('O CPF ou CNPJ deve ser preenchido!'),
        phone: Yup.number().required('O telefone deve ser preenchido!')
        .typeError('Apenas números são permitidos!'),
        password: Yup.string().required('A senha deve ser preenchida!'),
        birthDate: Yup.string().required('A data de nascimento deve ser preenchida!')
    }
);

export default signinSchemaValidator;