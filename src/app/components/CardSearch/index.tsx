import { useCallback, useState } from "react";
import {
  useGetCardByUserIdQuery,
  useGetCardsQuery,
  useUpdateCardMutation,
} from "@/store/features/card-slice";
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
import { Add, HorizontalRule } from "@mui/icons-material";
import ValueModal from "./ValueModal";
import { User } from "@/types/User";
import { Card } from "@/types/Card";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { StyledDataGrid } from "../StyledDataGrid";

interface CardSearchProps {
  clientId: string;
  user: User;
}

const CardSearch: React.FC<CardSearchProps> = ({ clientId, user }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCredit, setIsCredit] = useState(false);
  const [cardToOperation, setCardToOperation] = useState<Card | null>(null);

  const {
    data: userCards,
    isFetching,
    isError,
  } = useGetCardByUserIdQuery(clientId || "");

  const {
    data: cards,
    isFetching: isFetchingCards,
    isError: isErrorCards,
  } = useGetCardsQuery({onlyWithoutUser: true});

  const [updateCard] = useUpdateCardMutation();

  const addCardUser = async (card: Card) => {
    try {
      await updateCard({ ...card, userId: user._id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (isCredit: boolean, card: Card) => {
    setIsCredit(isCredit);
    setCardToOperation(card);
    setOpenModal(true);
  };

  const cardTotal = useCallback(
    (card: Card) =>
      card?.historic.reduce((acc: number, operation: any) => {
        if (operation.operationType === "credit") {
          return acc + operation.value;
        } else if (operation.operationType === "debit") {
          return acc - operation.value;
        } else {
          return acc;
        }
      }, 0),
    []
  );

  const isCardValid = useCallback((cardExpirationDate: string) => {
    const expirationDate = new Date(cardExpirationDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return expirationDate < today ;
  }, [])

  const columns: GridColDef[] = [
    { field: "id", headerName: "Cartão", flex: 1, width: 200, valueGetter: (params) => params.row.cardNumber},
    {
      field: "cardExpirationDate",
      headerName: "Validade",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        const isExpired = isCardValid(params.row?.cardExpirationDate);
        return (
          <Typography
            color={isExpired ? "error" : "green"}
            variant="body1"
          >
            {new Date(params.row?.cardExpirationDate)?.toLocaleDateString(
              "pt-BR"
            )}
          </Typography>
        );
      }
    },
    {
      field: "total",
      headerName: "Saldo",
      flex: 1,
      minWidth: 200,
      valueGetter: (params) =>
        `R$${cardTotal(params.row as Card)
          .toFixed(2)
          .replace(".", ",")}`,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 100,
      cellClassName: "actions",
      resizable: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <GridActionsCellItem
            icon={<Add color="info" />}
            key="edit"
            label="Edit"
            className="textPrimary"
            onClick={() => handleOpenModal(true, params.row as Card)}
            color="inherit"
            disabled={isCardValid(params.row?.cardExpirationDate)}
          />
          <GridActionsCellItem
            icon={<HorizontalRule color="error" />}
            key="delete"
            label="Delete"
            className="textPrimary"
            onClick={() => handleOpenModal(false, params.row as Card)}
            color="inherit"
            disabled={isCardValid(params.row?.cardExpirationDate)}
          />
        </Box>
      ),
    },
  ];

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
            onChange={(_, value) => setSelectedCard(value as Card)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Selecione um cartão"
                variant="outlined"
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mx: 2 }}
            onClick={() => selectedCard && addCardUser(selectedCard)}
          >
            Adicionar
          </Button>
        </Box>
        <Box sx={{ my: 5 }}>
          <Typography variant="h6">Cartões do cliente</Typography>
          <StyledDataGrid
            rows={
              userCards?.map((item: any) => ({ ...item, id: item._id })) || []
            }
            columns={columns}
            loading={isFetching}
            sx={{ scrollbarWidth: "thin", overflowX: "auto", minHeight: 200 }}
          />
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
          <ValueModal
            isCredit={isCredit}
            card={cardToOperation as Card}
            closeModal={() => setOpenModal(false)}
            clientId={clientId}
          />
        </Modal>
      </Box>
    )
  );
};

export default CardSearch;
