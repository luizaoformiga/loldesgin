import { NextPage } from 'next';
import { Container } from './styles';

interface Props {
  content: string;
}

export const Title: NextPage<Props> = ({ content }) => {
  return (
    <Container>
      <span>{content}</span>
    </Container>
  );
}
