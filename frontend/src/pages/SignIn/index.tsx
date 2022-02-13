import * as Yup from 'yup';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '~/components/Form/Input';
import { signInRequest } from '~/store/modules/auth/actions';
import { ContainerForm } from '~/components/Form/Container/styles';

import logo from '~/assets/logo_white.png';
import { Container, BtnLogin } from './styles';
import { NextPage } from 'next';

const SignIn: NextPage = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  // data: {email, password}
  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(signInRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Container>
      <img src={logo} alt="Fast Feet" width={300} height="auto" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ContainerForm>
          <Input
            label="SEU E-MAIL"
            name="email"
            type="text"
            value="admin@fastfeet.com"
            placeholder="exemplo@email.com"
          />

          <Input
            label="SUA SENHA"
            name="password"
            type="password"
            placeholder="***********"
          />

          <BtnLogin type="submit">
            {loading ? 'Carregando...' : 'Entrar no Sistema'}
          </BtnLogin>
        </ContainerForm>
      </Form>
    </Container>
  );
}

export default SignIn;