import { useState } from "react";
import Popup from "reactjs-popup";
import { NextPage } from "next";

import {
  MdDelete,
  MdEdit,
  MdVisibility,
  MdDeleteForever,
} from "react-icons/md";
import { toast } from "react-toastify";

import { Container, Actions, Action } from "./styles";
import { ModalDelete } from "../../Modals/Delete/delete";
import { ModalView } from "../../Modals/View/view";
import api from "../../../services/api";

interface Props {
  setReloadList: (bool: boolean) => void;
  actions: {
    del: any;
    cancel: any;
    view: any;
    edit: any;
  };
}

export const ActionsDrop: NextPage<Props> = ({ setReloadList, actions }) => {
  const [infoModalView, setInfoModalView] = useState({});
  const [modalIsOpen, setIsOpen] = useState({ view: false, del: false });

  async function handleModalDelete(): Promise<void> {
    const { url, type } = actions.del || actions.cancel;

    await api.delete(url);
    setReloadList(true);
    setIsOpen((prevState) => (prevState = { view: false, del: false }));

    if (type.includes("Problema")) {
      toast.success("Encomenda cancelada com sucesso!");
      toast.info("E-mail enviado ao entregador!");
    } else {
      toast.info(`${type} excluida!`);
    }
  }

  async function handleModalView(): Promise<void> {
    const { url, type } = actions.view;
    setIsOpen({ ...modalIsOpen, view: true });

    const { data } = await api.get(url);
    setInfoModalView({ type, ...data });
  }

  return (
    <Container>
      <Popup
        trigger={<button type="button">...</button>}
        position="bottom center"
        on="click"
        contentStyle={{
          width: "160px",
          borderRadius: "4px",
        }}
      >
        <Actions>
          {actions.view && (
            <Action>
              <button type="button" onClick={handleModalView}>
                <MdVisibility size={16} color="#8E5BE8" />
                <p>Visualizar</p>
              </button>
            </Action>
          )}
          {actions.edit && (
            <Action>
              <Link to={actions.edit}>
                <MdEdit size={16} color="#4D85EE" />
                <p>Editar</p>
              </Link>
            </Action>
          )}
          {actions.del && (
            <Action>
              <button
                type="button"
                onClick={() => setIsOpen({ ...modalIsOpen, del: true })}
              >
                <MdDelete size={16} color="#DE3B3B" />
                <p>Excluir</p>
              </button>
            </Action>
          )}
          {actions.cancel && !actions.cancel.disabled && (
            <Action>
              <button
                type="button"
                onClick={() => setIsOpen({ ...modalIsOpen, del: true })}
              >
                <MdDeleteForever size={16} color="#DE3B3B" />
                <p>Cancelar</p>
              </button>
            </Action>
          )}
        </Actions>
      </Popup>
      <ModalDelete
        isOpen={modalIsOpen.del}
        setIsOpen={setIsOpen}
        handleDelete={handleModalDelete}
        type={actions.del ? actions.del.type : actions.cancel.type}
      />
      <ModalView
        isOpen={modalIsOpen.view}
        setIsOpen={setIsOpen}
        info={infoModalView}
      />
    </Container>
  );
};
