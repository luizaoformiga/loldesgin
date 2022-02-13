import { Container } from './styles';
import { NextPage } from 'next';

interface Props {
  content: string;
}

export const BoxEmpty: NextPage<Props> = ({ content }) => {
  return (
    <Container>
      <span>{content}</span>
    </Container>
  );
}

