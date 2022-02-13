import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import { Wrapper, Content } from './styles';
import { NextPage } from 'next';

const DefaultLayout: NextPage = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default DefaultLayout;