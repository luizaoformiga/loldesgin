import { NextPage } from 'next';
import Modal from 'react-modal';

import { ContentModal, ContainerBtns, BtnYes, BtnNo } from './styles';

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

const messageContent = {
  Encomenda: 'remover esta encomenda',
  Entregador: 'remover este entregador',
  Destinatario: 'remover este destinatário',
  Problema: 'cancelar esta encomenda',
};

interface Props {
  setIsOpen: Function;
  handleDelete: Function;
  isOpen: boolean;
  type: string;
}

export const ModalDelete: NextPage<Props> = ({ type, setIsOpen, handleDelete, isOpen }) => {
  function closeModal(): void {
    return setIsOpen({ view: false, del: false });
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel="Remover Encomenda"
    >
      <ContentModal>
        <h2>Você deseja {messageContent[type]}?</h2>
        <ContainerBtns>
          <BtnYes type="button" onClick={handleDelete}>
            Sim
          </BtnYes>
          <BtnNo type="button" onClick={closeModal}>
            Não
          </BtnNo>
        </ContainerBtns>
      </ContentModal>
    </Modal>
  );
}
