"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import {
  useGetUsersQuery,
  useRemoveUserMutation,
} from "@/store/features/user-slice";
import { StyledDataGrid } from "../StyledDataGrid";

const UserList: React.FC = () => {
  const router = useRouter();
  const { data, isFetching, isError } = useGetUsersQuery({});
  const [deleteUser, deleteUserStatus] = useRemoveUserMutation();

  const dataWithIds = data?.data.map((item) => ({
    ...item,
    id: item._id,
  }));

  const handleEditUser = (id: string) => {
    router.push(`/cms/clients/${id}`);
  }

  const handleNewUser = () => {
    router.push(`/cms/clients/new`);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "CPF", flex: 1, minWidth: 200, valueGetter: (params) => params.row.cpf},
    { field: "name", headerName: "Nome", flex: 1, minWidth: 200 },
    { field: "email", headerName: "E-mail", flex: 1, minWidth: 200 },
    { field: "rg", headerName: "RG", flex: 1, minWidth: 200 },
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
            onClick={() => handleEditUser(params.id as string)}
            color="inherit"
          />
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            key="delete"
            label="Delete"
            className="textPrimary"
            onClick={() => deleteUser(params.id as string)}
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
        <Button variant="contained" onClick={handleNewUser}>Cadastrar</Button>
      </Box>
      <StyledDataGrid
        rows={dataWithIds || []}
        columns={columns}
        loading={isFetching}
        sx={{ scrollbarWidth: "thin", overflowX: "auto" }}
      />
    </Box>
  );
};

export default UserList;
