import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
    const { label,variant,name,value,onChange } = props
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField name={name} value={value} onChange={onChange} id="outlined-basic" label={label} variant={variant} />
    </Box>
  );
}