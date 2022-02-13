import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import Title from "~/components/Title";
import BuscarCadastro from "~/components/BuscarCadastro";
import BoxEmpty from "~/components/BoxEmpty";
import { Item, List } from "~/components/ListItens/styles";
import ActionsDrop from "~/components/Form/ActionsDrop";
import Paginate from "~/components/Paginate";

import { Container, Avatar } from "./styles";
import api from "../../../services/api";

interface Props {
  id: string;
  name: string;
  avatar: {
    url: string;
  };
  email: string;
}

export const DeliverymanList: NextPage = () => {
  const [deliverymen, setDeliverymen] = useState([]);
  const [searchDeliveryman, setSearchDeliveryman] = useState("");
  const [page, setPage] = useState(1);
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    async function loadDeliveries(): Promise<void> {
      const response = await api.get(
        `/deliverymen?name=${searchDeliveryman}&page=${page}`
      );
      setDeliverymen((prevState) => prevState = response.data);
    }

    loadDeliveries();
  }, [searchDeliveryman, page, reloadList]);

  return (
    <Container>
      <Title content="Gerenciando Entregadores" />
      <BuscarCadastro
        placeholder="Buscar por entregador"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchDeliveryman(e.target.value)
        }
        linkBtn="/deliveryman/new"
      />
      {deliverymen.length > 0 ? (
        <List>
          <Item>
            <strong>ID</strong>
            <strong>Foto</strong>
            <strong>Nome</strong>
            <strong>Email</strong>
            <strong style={{ textAlign: "right" }}>Ações</strong>
          </Item>
          {deliverymen.map((deliveryman: Props) => (
            <Item key={deliveryman.id}>
              <span>#{deliveryman.id}</span>
              <Avatar
                src={
                  deliveryman.avatar
                    ? deliveryman.avatar.url
                    : `https://api.adorable.io/avatars/50/${deliveryman.name}.png`
                }
              />
              <span>{deliveryman.name}</span>
              <span>{deliveryman.email}</span>
              <ActionsDrop
                setReloadList={setReloadList}
                actions={{
                  del: {
                    url: `/deliveryman/${deliveryman.id}`,
                    type: "Entregador",
                  },
                  edit: `/deliveryman/${deliveryman.id}/edit`,
                }}
              />
            </Item>
          ))}
        </List>
      ) : (
        <BoxEmpty content="Lista de entregadores vazia" />
      )}
      <Paginate page={page} setPage={setPage} sizeItens={deliverymen.length} />
    </Container>
  );
};
