import { theme } from "@/app/theme";
import { useGetCompaniesQuery } from "@/store/features/company-slice";
import { useUpdateUserMutation } from "@/store/features/user-slice";
import { useAppSelector } from "@/store/hooks";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { StyledDataGrid } from "../StyledDataGrid";

interface CompanySearchProps {
  setCompanys: (companys: any) => void;
  companysSelected: any[];
}

const CompanySearch: React.FC<CompanySearchProps> = ({ companysSelected }) => {
  const { data, isFetching, isError } = useGetCompaniesQuery({});
  const [updateUser, updateUserStatus] = useUpdateUserMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [select, setSelect] = useState(companysSelected || []);

  const handleSelectCompany = (option: any) => {
    const selectedCompany = data?.data.find((item) => item._id === option.id);
    setSelect(selectedCompany ? [...select, selectedCompany] : [select]);
  };

  const handleUpdateUser = () => {
    try {
      updateUser({
        ...user,
        _id: user._id,
        companies: [
          ...(user.companies as any),
          ...select.map((item) => item._id),
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const dataWithIds = data?.data.map((item) => ({
    ...item,
    id: item._id,
  }));

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "CNPJ",
      flex: 1,
      minWidth: 200,
      valueGetter: (params) => params.row.cnpj,
    },
    {
      field: "fantasyName",
      headerName: "Nome Fantasia",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "companyName",
      headerName: "Razão Social",
      flex: 1,
      minWidth: 200,
    },
  ];

  return (
    <>
      <Box flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Autocomplete
            id="company-search"
            sx={{ minWidth: 180, mr: 2 }}
            options={
              data?.data.map(
                (item) => ({ id: item._id, label: item.companyName } as any)
              ) || []
            }
            onChange={(_, newValue) => handleSelectCompany(newValue)}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} placeholder="Empresa" />
            )}
          />
          <Button
            sx={{
              fontWeight: 700,
              fontSize: 12,
              maxWidth: 180,
            }}
            variant="contained"
            onClick={handleUpdateUser}
          >
            Adicionar empresa que representa
          </Button>
        </Box>
        <Box sx={{ my: 2 }}>
          <StyledDataGrid
            rows={dataWithIds || []}
            columns={columns}
            loading={isFetching}
            sx={{ scrollbarWidth: "thin", overflowX: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default CompanySearch;
