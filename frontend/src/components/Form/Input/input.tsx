import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';
import { NextPage } from 'next';

interface Props {
  label: string;
  name: string;
}

export const Input: NextPage<Props> = ({ label, name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error = '' } = useField(
    name
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span>** {error} **</span>}
    </Container>
  );
}