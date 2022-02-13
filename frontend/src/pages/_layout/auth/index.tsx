import { Wrapper } from './styles';
import { NextPage } from 'next';

const AuthLayout: NextPage = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
}

export default AuthLayout;
