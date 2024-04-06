import { useUpdateCardMutation } from "@/store/features/card-slice";
import { Card, OperationType } from "@/types/Card";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";

interface ValueModalProps {
  card: Card;
  isCredit?: boolean;
  closeModal: () => void;
  clientId: string;
}

const ValueModal: React.FC<ValueModalProps> = ({ card, isCredit, closeModal, clientId }) => {
  const [updateCard] = useUpdateCardMutation();
  const [value, setValue] = React.useState<number>(0);

  const addOperation = async () => {
    try {
      await updateCard({
        ...card,
        userId: clientId,
        historic: [
          ...card.historic,
          {
            operationDate: new Date(),
            operationType: isCredit
              ? OperationType.CREDIT
              : OperationType.DEBIT,
            value,
          },
        ],
      });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper component="form" sx={{ maxWidth: "600px", p: 3, m: "auto" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {isCredit ? 'Adicionar Crédito' : 'Debitar valor'}
      </Typography>
      <TextField
        id="outlined-basic"
        label="Valor"
        variant="outlined"
        type="number"
        fullWidth
        required
        onChange={(e) => setValue(Number(e.target.value))}
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
      />
      <Button onClick={addOperation}>Salvar</Button>
      <Button onClick={closeModal}>Cancelar</Button>
    </Paper>
  );
};

export default ValueModal;
