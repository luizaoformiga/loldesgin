import Modal from 'react-modal';
import { MdInsertPhoto } from 'react-icons/md';
import { Container, GroupInfo, Signature, ContentProblem } from './styles';
import { NextPage } from 'next';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  setIsOpen: Function;
  isOpen: boolean;
  info: object;
}

export const ModalView: NextPage<Props> = ({ setIsOpen, isOpen, info }) => {
  function closeModal(): void {
    return setIsOpen({ del: false, view: false });
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel="Informações Encomenda"
    >
      <Container>
        {info.type === 'delivery' && (
          <>
            <GroupInfo>
              <h3>Informações da Encomenda</h3>
              <p>
                {info.recipient.street}, {info.recipient.number}
              </p>
              <p>
                {info.recipient.city} - {info.recipient.state}
              </p>
              <p>{info.recipient.cep}</p>
            </GroupInfo>
            <GroupInfo>
              <h3>Datas</h3>
              <p>
                <strong>Retirada:</strong> {info.start_date}
              </p>
              <p>
                <strong>Entrega:</strong> {info.end_date}
              </p>
            </GroupInfo>
            <GroupInfo>
              <h3>Assinatura do destinatário</h3>
              <Signature border={info.signature}>
                {info.signature ? (
                  <img
                    src={info.signature.url}
                    alt="Foto da assinatura do destinatário"
                  />
                ) : (
                  <span>
                    <MdInsertPhoto size={44} color="#ababab" />
                    Sem Assinatura
                  </span>
                )}
              </Signature>
            </GroupInfo>
          </>
        )}
        {info.type === 'deliveryProblem' && (
          <ContentProblem>
            <h3> VISUALIZAR PROBLEMA </h3>
            <strong>Produto</strong>
            <p> {info.delivery.product} </p>

            <strong>Descrição</strong>
            <p> {info.description} </p>
          </ContentProblem>
        )}
      </Container>
    </Modal>
  );
}

ModalView.propTypes = {
  setIsOpen: func
  isOpen: bool
  info: object
};
