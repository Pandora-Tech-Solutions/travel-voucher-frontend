"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import {
  useGetCardsQuery,
  useRemoveCardMutation,
} from "@/store/features/card-slice";
import { StyledDataGrid } from "../StyledDataGrid";

const CardsList: React.FC = () => {
  const { data, isFetching, isError } = useGetCardsQuery({});
  const router = useRouter();

  const handleNewCard = () => {
    router.push(`/cms/cards/new`);
  };

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
      field: "userId",
      headerName: "Cliente",
      flex: 1,
      minWidth: 200,
      valueGetter: (params) => params.row?.userId?.name,
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
            icon={<EditIcon color="info" />}
            key="edit"
            label="Edit"
            className="textPrimary"
            onClick={() => console.log(params.id as string)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            key="delete"
            label="Delete"
            className="textPrimary"
            onClick={() => console.log(params.id as string)}
            color="inherit"
          />
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 400,
        width: "100%",
        overflowX: "auto",
        flex: 1,
      }}
    >
      <Box sx={{ my: 5, ml: "auto" }}>
        <Button variant="contained" onClick={handleNewCard}>
          Cadastrar
        </Button>
      </Box>
      <StyledDataGrid
        rows={data?.data.map((item: any) => ({ ...item, id: item._id })) || []}
        columns={columns}
        loading={isFetching}
        sx={{ scrollbarWidth: "thin", overflowX: "auto" }}
      />
    </Box>
  );
};

export default CardsList;
