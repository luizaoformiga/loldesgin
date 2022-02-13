import React, { useEffect, useState } from 'react';

import Title from '~/components/Title';
import BoxEmpty from '~/components/BoxEmpty';
import { Item, List } from '~/components/ListItens/styles';
import ActionsDrop from '~/components/Form/ActionsDrop';

import api from '../../../services/api';
import { Container, ProblemDescription, Canceled } from './styles';
import { NextPage } from 'next';

interface Props {
  id: string;
  delivery: {
    id: string;
    canceled_at: Date;
  };
  description: string;
}

const DeliveryProblemList: NextPage = () => {
  const [deliveryProblems, setDeliveryProblems] = useState([]);
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    async function loadDeliveryProblems(): Promise<void> {
      const response = await api.get('/delivery-problems');
      setDeliveryProblems((prevState) => prevState = response.data);
    }

    loadDeliveryProblems();
  }, [reloadList]);

  return (
    <Container>
      <Title content="Problemas na entrega" />

      {deliveryProblems.length > 0 ? (
        <List>
          <Item>
            <strong>Encomenda</strong>
            <strong>Problema</strong>
            <strong style={{ textAlign: 'right' }}>Ações</strong>
          </Item>
          {deliveryProblems.map((delProblem: Props) => (
            <Item key={delProblem.id}>
              <span>
                #{delProblem.delivery.id}
                {delProblem.delivery.canceled_at && (
                  <Canceled>CANCELADA</Canceled>
                )}
              </span>
              <ProblemDescription>{delProblem.description}</ProblemDescription>
              <ActionsDrop
                setReloadList={setReloadList}
                actions={{
                  view: {
                    url: `/problem/${delProblem.id}/view`,
                    type: 'deliveryProblem',
                  },
                  cancel: {
                    id: delProblem.delivery.id,
                    disabled: !!delProblem.delivery.canceled_at,
                    url: `/problem/${delProblem.delivery.id}/cancel-delivery`,
                    type: 'Problema',
                  },
                }}
              />
            </Item>
          ))}
        </List>
      ) : (
        <BoxEmpty content="Sem nenhum problema registrado" />
      )}
    </Container>
  );
}

export default DeliveryProblemList;