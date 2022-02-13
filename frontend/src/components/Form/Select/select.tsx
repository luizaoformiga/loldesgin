import React, { useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';
import { NextPage } from 'next';

import { Container } from './styles';

interface Props {
  name: string;
  label: string;
}

export const Select: NextPage<Props> = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map(option => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      {error && <span>** {error} **</span>}
    </Container>
  );
}