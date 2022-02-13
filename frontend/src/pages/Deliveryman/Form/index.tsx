import * as Yup from "yup";
import { Form } from "@unform/web";
import { NextPage } from "next";
import { toast } from "react-toastify";
import React, { useRef, useEffect, useState } from "react";

import AvatarInput from "./AvatarInput";
import Input from "~/components/Form/Input";
import Header from "~/components/Form/Header";
import { ContainerForm } from "~/components/Form/Container/styles";

import api from "../../../services/api";
import history from "../../../services/history";
import { Container, ContainerAvatar } from "./styles";

const schema = Yup.object().shape({
  avatar_id: Yup.number().required("A foto do entregador é obrigatória!"),
  name: Yup.string().required("O nome do entregador é obrigatório!"),
  email: Yup.string()
    .email("Insira um email válido!")
    .required("O email do entragador é obrigatório!"),
});

const DeliverymanForm: NextPage = ({ match }) => {
  const { id } = match.params;
  const formRef = useRef<any>(null);
  const [avatar, setAvatar] = useState({ id: "", url: "" });

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get(`/deliveryman/${id}`);
      const { name, email, avatar: aux } = response.data;
      formRef.current.setData({
        name,
        email,
      });
      setAvatar((prevState) => (prevState = aux));
    }

    if (id) {
      loadDeliveryman();
    } else {
      setAvatar((prevState) => (prevState = { id: -1 }));
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        await api.put(`/deliveryman/${id}`, { ...data });
        toast.success("Destinatário atualizado com sucesso!");
      } else {
        await api.post("/deliveryman", { ...data });
        toast.success("Destinatário criado com sucesso!");
      }
      history.push("/deliverymen");
    } catch (err) {
      const validationErrors: any = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        const { type } = err.response.data;
        const message =
          type === "email"
            ? "E-mail já cadastrado, inserir com outro!"
            : "É obrigatório o envio do avatar!";
        toast.warn(message);
      }
    }
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Header content="Cadastro de entregadores" voltarLink="/deliverymen" />
        <ContainerForm>
          <ContainerAvatar>
            {avatar && <AvatarInput name="avatar_id" defaultValue={avatar} />}
          </ContainerAvatar>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite o nome do entregador"
          />
          <Input name="email" label="E-mail" placeholder="example@teste.com" />
        </ContainerForm>
      </Form>
    </Container>
  );
};

export default DeliverymanForm;
