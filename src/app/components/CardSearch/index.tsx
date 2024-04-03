import {
  useGetCardByUserIdQuery,
  useGetCardsQuery,
} from "@/store/features/card-slice";
import { useAppSelector } from "@/store/hooks";
import {
  Autocomplete,
  Box,
  Button,
  List,
  ListItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ValueModal from "./ValueModal";
import { useState } from "react";

interface CardSearchProps {
  clientId?: string;
}

const CardSearch: React.FC<CardSearchProps> = ({ clientId }) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    data: userCards,
    isFetching,
    isError,
  } = useGetCardByUserIdQuery(clientId || "");

  const {
    data: cards,
    isFetching: isFetchingCards,
    isError: isErrorCards,
  } = useGetCardsQuery({});

  console.log(userCards);

  console.log(cards);

  return (
    !isFetching &&
    !!cards && (
      <Box flexDirection="column">
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Autocomplete
            id="card-search"
            options={cards.data || []}
            getOptionLabel={(option: { cardNumber: string }) =>
              option.cardNumber
            }
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecione um cartão"
                variant="outlined"
              />
            )}
          />
          <Button variant="contained" color="primary" sx={{ mx: 2 }}>
            Adicionar
          </Button>
        </Box>
        <Box sx={{ my: 5 }}>
          <Typography variant="h6">Cartões do cliente</Typography>
          <List>
            {userCards?.map((card: any) => (
              <Paper key={card._id} sx={{ p: 2, my: 2 }}>
                <ListItem sx={{ width: "100%" }}>
                  {card.cardNumber}{" "}{new Date(card.cardExpirationDate).toLocaleDateString('pt-BR')}
                  <Button onClick={() => setOpenModal(true)}>
                    Adicionar crédito
                  </Button>
                  <Button onClick={() => setOpenModal(true)}>
                    Debitar valor
                  </Button>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Box>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ValueModal />
        </Modal>
      </Box>
    )
  );
};

export default CardSearch;
