import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from '@material-ui/core';

const CustomSelectPicker = props => {
  const classes = useStyles();
  const { menuItems, defaultValue, name, fullWidth, label, handleSelectPickerChange, helperText } = props

  return (
    <FormControl className={classes.formControl} style={fullWidth ? {width: '100%'} : {}}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        onChange={handleSelectPickerChange}
        value={defaultValue}
        required
      >
      {menuItems.map(({name, value}) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

const useStyles = makeStyles({
  formControl: {
    minWidth: 240,
  },
});


export default CustomSelectPicker;
