import { MdAdd } from "react-icons/md";
import { NextPage } from "next";

import { InputSearch } from "../InputSearch/input-search";
import { Container } from "./styles";

interface Props {
  linkBtn: string;
}

export const BuscarCadastro: NextPage<Props> = ({ linkBtn, ...rest }) => {
  return (
    <Container>
      <InputSearch {...rest} />
      <Link to={linkBtn}>
        <MdAdd size={18} color="#FFF" />
        cadastrar
      </Link>
    </Container>
  );
};
