"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import {
useGetCompaniesQuery,
useRemoveCompanyMutation,
} from "@/store/features/company-slice";
import { StyledDataGrid } from "../StyledDataGrid";

const CompanyList: React.FC = () => {
  const router = useRouter();
  const { data, isFetching, isError } = useGetCompaniesQuery({});
  const [deleteCompany, deleteCompanyStatus] = useRemoveCompanyMutation();

  const dataWithIds = data?.data.map((item) => ({
    ...item,
    id: item._id,
  }));

  const handleEditUser = (id: string) => {
    router.push(`/cms/companies/${id}`);
  }

  const handleNewUser = () => {
    router.push(`/cms/companies/new`);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 200 },
    { field: "fantasyName", headerName: "Nome Fantasia", flex: 1, minWidth: 200 },
    { field: "companyName", headerName: "Razão Social", flex: 1, minWidth: 200 },
    { field: "cnpj", headerName: "CNPJ", flex: 1, minWidth: 200 },
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
            onClick={() => deleteCompany(params.id as string)}
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

export default CompanyList;
