"use client";
import React, { useCallback } from "react";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "@/app/theme";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { states } from "@/utils/constants/states";
import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "@/store/features/company-slice";
import { useRouter } from "next/navigation";
import { Company } from "@/types/Company";
import { cnpjMask, phoneMask, zipcodeMask } from "@/utils/masks";

interface ICompanyRegisterProps {
  company?: Company;
  loading?: boolean;
  error?: boolean;
}

const CompanyRegister: React.FC<ICompanyRegisterProps> = ({
  company,
  error,
  loading,
}) => {
  const [updateCompany, updateUserStatus] = useUpdateCompanyMutation();
  const [createCompany, createUserStatus] = useCreateCompanyMutation();

  const router = useRouter();

  const CompanySchema = z.object({
    companyName: z.string().min(1, { message: "Informe a Razão Social" }),
    fantasyName: z.string().min(1, { message: "Informe o Nome Fantasia" }),
    email: z
      .string()
      .min(1, { message: "Informe o email" })
      .email({ message: "Informe um email válido" }),
    cnpj: z.string().min(1, { message: "Informe seu CNPJ" }),
    phone: z.string().min(1, { message: "Informe seu telefone" }),
    address: z.object({
      zipcode: z.string().min(1, { message: "Informe seu CEP" }),
      street: z.string().min(1, { message: "Informe sua rua" }),
      number: z.string().min(1, { message: "Informe o número" }),
      complement: z.string(),
      neighborhood: z.string().min(1, { message: "Informe o bairro" }),
      city: z.string().min(1, { message: "Informe a cidade" }),
      state: z.string().min(1, { message: "Informe o estado" }),
    }),
  });

  const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = cnpjMask(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = phoneMask(event.target.value);
  }

  const handleZipCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = zipcodeMask(event.target.value);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CompanySchema),
    defaultValues:
      {
        ...company,
        address: { ...company?.address, number: company?.address?.number.toString() },
      } || {},
  });

  const companyCreate = useCallback(
    async (values: any) => {
      try {
        const companyData: Company = values;

        if (!!company) {
          updateCompany({ ...companyData, _id: company._id });
          return router.push("/cms/clients");
        }

        createCompany({ ...companyData });
        return  router.push("/cms/clients");
        } catch (error) {
        console.log(error);
      }
    },
    [createCompany, router, updateCompany, company]
  );

  return loading ? (
    <CircularProgress />
  ) : (
    <Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(companyCreate)}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 5, mx: { md: 10 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Dados da Empresa</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="companyName"
                      label="Razão Social"
                      {...register("companyName")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.companyName}
                      helperText={(errors?.companyName?.message || "").toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="fantasyName"
                      label="Nome Fantasia"
                      {...register("fantasyName")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.fantasyName}
                      helperText={(errors?.fantasyName?.message || "").toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="cnpj"
                      label="CNPJ"
                      {...register("cnpj")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.cnpj}
                      helperText={(errors?.cnpj?.message || "").toString()}
                      onChange={handleCnpjChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="phone"
                      label="Telefone"
                      {...register("phone")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.phone}
                      helperText={(errors?.phone?.message || "").toString()}
                      onChange={handlePhoneChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="email"
                      label="E-mail"
                      {...register("email")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.email}
                      helperText={(errors?.email?.message || "").toString()}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ p: 3, mb: 3, mx: { md: 10 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">Endereço</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="zipcode"
                      label="CEP"
                      {...register("address.zipcode")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.address?.zipcode}
                      helperText={(
                        errors?.address?.zipcode?.message || ""
                      ).toString()}
                      onChange={handleZipCodeChange}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="street"
                      label="Rua"
                      {...register("address.street")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.address?.street}
                      helperText={(
                        errors?.address?.street?.message || ""
                      ).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="number"
                      label="Número"
                      {...register("address.number")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.address?.number}
                      helperText={(
                        errors?.address?.number?.message || ""
                      ).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="complement"
                      label="Complemento"
                      {...register("address.complement")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.address?.complement}
                      helperText={(
                        errors?.address?.complement?.message || ""
                      ).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="neighborhood"
                      label="Bairro"
                      {...register("address.neighborhood")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.address?.neighborhood}
                      helperText={(
                        errors?.address?.neighborhood?.message || ""
                      ).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="city"
                      label="Cidade"
                      {...register("address.city")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.address?.city}
                      helperText={(
                        errors?.address?.city?.message || ""
                      ).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="state">Estado</InputLabel>
                      <Select
                        labelId="state"
                        id="state"
                        {...register("address.state")}
                        label="Estado"
                        error={!!errors?.address?.state}
                        defaultValue={company?.address?.state || ""}
                      >
                        {states.map((state) => (
                          <MenuItem value={state.value} key={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors?.address?.state?.message && (
                        <FormHelperText sx={{ color: "#D32F2F" }}>
                          {errors?.address?.state?.message.toString()}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Box
          sx={{
            mb: 5,
            mx: { md: 10 },
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
          }}
        >
          <Button
            sx={{
              fontWeight: 700,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            }}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              ml: 7,
              background: theme.palette.primary.main,
              fontWeight: 700,
              minWidth: { sm: 120 },
            }}
            type="submit"
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyRegister;
