import { theme } from "@/app/theme";
import { useGetCompaniesQuery } from "@/store/features/company-slice";
import {
  Autocomplete,
  Box,
  Button,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface CompanySearchProps {
  setCompanys: (companys: any) => void;
  companysSelected: any[];
}

const CompanySearch: React.FC<CompanySearchProps> = ({
  companysSelected,
  setCompanys,
}) => {
  const { data, isFetching, isError } = useGetCompaniesQuery({});

  const handleSelectCompany = (option: any) => {
    const selectedCompany = data?.data.find((item) => item._id === option.id);
    setCompanys([...companysSelected, selectedCompany]);
  };

  return (
    <>
      <Button
        sx={{
          fontWeight: 400,
          fontSize: 12,
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          mb: 2,
        }}
        variant="text"
        onClick={() => ({})}
      >
        Adicionar empresa que representa
      </Button>
      <Box flexDirection="column">
        <Autocomplete
          id="company-search"
          options={
            data?.data.map(
              (item) => ({ id: item._id, label: item.companyName } as any)
            ) || []
          }
          onChange={(_, newValue) => handleSelectCompany(newValue)}
          getOptionLabel={(option) => option.label}
          style={{ width: 300, margin: "0 0 0 auto" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Empresa" />
          )}
        />
        {companysSelected.length ? (
          <Paper elevation={3} sx={{ my: 2 }}>
            <List>
              {companysSelected.map((company) => (
                <ListItem key={company.companyName}>
                  {company.companyName}
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : null}
      </Box>
    </>
  );
};

export default CompanySearch;
