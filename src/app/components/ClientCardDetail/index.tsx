import { Card } from "@/types/Card";
import { Box, Typography } from "@mui/material";
import React from "react";
import { StyledDataGrid } from "../StyledDataGrid";

interface ClientCardDetailProps {
  card?: Card;
  loading?: boolean;
  error?: boolean;
}

const ClientCardDetail: React.FC<ClientCardDetailProps> = ({
  card,
  error,
  loading,
}) => {
  const columns = [
    {
      field: "_id",
      headerName: "Cartão",
      flex: 1,
      minWidth: 200,
      hide: true,
      valueGetter: () => card?.cardNumber,
    },
    {
      field: "operationDate",
      headerName: "Data da operação",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Typography variant="body1">
            {new Date(params.row?.operationDate)?.toLocaleDateString("pt-BR")}
          </Typography>
        );
      },
    },
    {
      field: "operationType",
      headerName: "Tipo de operação",
      flex: 1,
      minWidth: 200,
      valueGetter: (params: any) => params.row?.operationType === "credit" ? "Crédito" : "Débito",
    },
    {
      field: "value",
      headerName: "Valor",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <Typography color={params.row?.operationType === "debit" ? "error" : "green"} variant="body1">
            {params.row?.value?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "auto",
        flex: 1,
      }}
    >
      <Box
        sx={{
          my: 5,
          ml: "auto",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="h6">Meus Cartões</Typography>
      </Box>
      <StyledDataGrid
        rows={
          card?.historic.map((item: any) => ({ ...item, id: item._id })) || []
        }
        columns={columns}
        loading={loading}
        sx={{ scrollbarWidth: "thin", overflowX: "auto" }}
      />
    </Box>
  );
};

export default ClientCardDetail;
