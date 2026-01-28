import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('O email é obrigatório'),
  name: yup.string().required('O nome é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
    .required('A confirmação de senha é obrigatória'),
});
