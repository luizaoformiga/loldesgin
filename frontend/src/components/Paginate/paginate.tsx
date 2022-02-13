import { NextPage } from 'next';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Container, BtnControlPage } from './styles';

interface Props {
  setPage: (result: number) => void;
  page: number;
  sizeItens: number;
}

export const Paginate: NextPage<Props> = ({ setPage, page, sizeItens }) => {
  function handleNewPage(modifier: number): void {
    if ((modifier === -1 && page > 0) || sizeItens) {
      return setPage(page + modifier);
    }
  }

  return (
    <Container>
      <BtnControlPage onClick={() => handleNewPage(-1)} disabled={page === 1}>
        <MdKeyboardArrowLeft size={25} />
        Anterior
      </BtnControlPage>
      <BtnControlPage
        onClick={() => handleNewPage(1)}
        disabled={sizeItens !== 10}
      >
        Próxima
        <MdKeyboardArrowRight size={25} />
      </BtnControlPage>
    </Container>
  );
}
