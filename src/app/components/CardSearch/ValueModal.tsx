import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

const ValueModal: React.FC = () => {
  return (
    <Paper component="form" sx={{ maxWidth: '600px', p: 3, m: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>Debitar valor</Typography>
      <TextField
        id="outlined-basic"
        label="Valor"
        variant="outlined"
        type="number"
        fullWidth
        required
        InputProps={{
          inputProps: {
            min: 0,
          },
        }} />
        <Button>Salvar</Button>
        <Button>Cancelar</Button>
    </Paper>
  );
}

export default ValueModal;