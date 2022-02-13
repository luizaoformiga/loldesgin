import { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { useField } from '@unform/core';
import ReactInputMask from 'react-input-mask';

import { Container } from '../../../components/Form/Input/styles';

interface Props {
  label: string;
  name: string;
}

export const InputMask: NextPage<Props> = ({ label, name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error = '' } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref) {
        ref.setInputValue('');
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <ReactInputMask mask="" id={fieldName} ref={inputRef} {...rest} />

      {error && <span>** {error} **</span>}
    </Container>
  );
}
