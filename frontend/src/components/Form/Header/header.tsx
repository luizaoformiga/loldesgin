import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { NextPage } from 'next';

import Title from '~/components/Title';
import { Container, Btns, BtnSubmit, BtnBack } from './styles';

interface Props {
  content: string;
  voltarLink: string;
}

export const Header: NextPage<Props> = ({ content, voltarLink = '/' }) => {
  return (
    <Container>
      <Title content={content} />
      <Btns>
        <BtnBack to={voltarLink}>
          <MdKeyboardArrowLeft size={22} />
          VOLTAR
        </BtnBack>
        <BtnSubmit type="submit">
          <MdCheck size={22} />
          SALVAR
        </BtnSubmit>
      </Btns>
    </Container>
  );
}
