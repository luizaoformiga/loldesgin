import { NextPage } from "next";

import { Header } from "../../../components/Header/header";
import { Wrapper, Content } from "./styles";

const DefaultLayout: NextPage = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default DefaultLayout;
