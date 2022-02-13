import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { MdInsertPhoto } from 'react-icons/md';
import { PropTypes } from 'prop-types';

import api from '~/services/api';
import { Container, InputPhoto } from './styles';
import { NextPage } from 'next';

const AvatarInput: NextPage = ({ name, defaultValue }) => {
  const { fieldName, registerField, error = '' } = useField(name);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [defaultValue, fieldName, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {file !== -1 ? (
          <img src={preview} alt="Foto do entregador" />
        ) : (
          <InputPhoto>
            <MdInsertPhoto size={44} color="#ababab" />
            <strong>Adicionar Foto</strong>
          </InputPhoto>
        )}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
      {error && <span>** {error} **</span>}
    </Container>
  );
}


export default AvatarInput;