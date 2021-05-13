import React from 'react';
import { TextField } from '@material-ui/core';

const CustomTextField = props => {
  const {
    required,
    name,
    label,
    defaultValue,
    type,
    handleTextChange,
    multiline,
    error,
    helperText
  } = props

  return (
    <TextField
      type={type}
      required={required}
      id={name}
      name={name}
      label={label}
      onChange={handleTextChange}
      fullWidth
      value={defaultValue}
      multiline={multiline}
      error={error}
      helperText={error ? helperText : null}
    />
  )
}

export default CustomTextField;
