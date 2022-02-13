import { NextPage } from 'next';
import { MdSearch } from 'react-icons/md';

import { Container, Search } from './styles';

export const InputSearch: NextPage = ({ ...rest }) => {
  return (
    <Container>
      <MdSearch size={24} />
      <Search {...rest} />
    </Container>
  );
}