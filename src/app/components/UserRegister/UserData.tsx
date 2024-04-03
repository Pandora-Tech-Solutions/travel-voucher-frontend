import { useCreateUserMutation, useUpdateUserMutation } from '@/store/features/user-slice';
import { Roles } from '@/types/Roles';
import { User } from '@/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { states } from "@/utils/constants/states";
import { theme } from '@/app/theme';
import CompanySearch from '../CompanySearch';

interface UserDataProps {
  user?: User;
}

const UserData: React.FC<UserDataProps> = ({ user }) => {
  const [updateUser, updateUserStatus] = useUpdateUserMutation();
  const [createUser, createUserStatus] = useCreateUserMutation();
  const [companiesSelected, setCompanySelected] = useState<any[]>(
    user?.companies || []
  );

  const router = useRouter();

  const UserSchema = z.object({
    name: z.string().min(1, { message: "Informe seu nome" }),
    email: z
      .string()
      .min(1, { message: "Informe seu email" })
      .email({ message: "Informe um email válido" }),
    cpf: z.string().min(1, { message: "Informe seu CPF" }),
    rg: z.string().min(1, { message: "Informe seu RG" }),
    phone: z.string().min(1, { message: "Informe seu telefone" }),
    roles: z.string().min(1, { message: "Informe sua função" }),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues:
      {
        ...user,
        address: { ...user?.address, number: user?.address.number.toString() },
      } || {},
  });

  const userCreate = useCallback(
    async (values: any) => {
      try {
        const userData: User = values;

        if (companiesSelected.length)
          userData.companies = companiesSelected.map((company) => company._id);

        if (!!user) {
          updateUser({
            ...userData,
            _id: user._id,
            roles: [userData.roles as any],
          });
          return router.push("/cms/clients");
        }

        createUser({ ...userData, roles: [userData.roles as any] });
        return router.push("/cms/clients");
      } catch (error) {
        console.log(error);
      }
    },
    [companiesSelected, createUser, router, updateUser, user]
  );

  return (
    <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(userCreate)}
  >
    <Paper elevation={3} sx={{ p: 3, mb: 5, mx: { md: 10 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Dados Pessoais</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField
                  id="name"
                  label="Nome"
                  {...register("name")}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={!!errors?.name}
                  helperText={(errors?.name?.message || "").toString()}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  id="cpf"
                  label="CPF"
                  {...register("cpf")}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={!!errors?.cpf}
                  helperText={(errors?.cpf?.message || "").toString()}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  id="rg"
                  label="RG"
                  {...register("rg")}
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={!!errors?.rg}
                  helperText={(errors?.rg?.message || "").toString()}
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
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="role">Função</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    {...register("roles")}
                    label="Função"
                    error={!!errors?.roles}
                    defaultValue={user?.roles[0] || ""}
                  >
                    <MenuItem value={Roles.ADMIN}>Admin</MenuItem>
                    <MenuItem value={Roles.COMPANY_ADMIN}>
                      Company Admin
                    </MenuItem>
                    <MenuItem value={Roles.USER}>User</MenuItem>
                  </Select>
                  {errors?.roles?.message && (
                    <FormHelperText sx={{ color: "#D32F2F" }}>
                      {errors?.roles?.message.toString()}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={3} sx={{ p: 3, mb: 0, mx: { md: 10 } }}>
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
                    defaultValue={user?.address?.state || ""}
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
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "column",
        p: 3,
        mb: 3,
        mx: { md: 10 },
      }}
    >
    </Box>
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
  );
}

export default UserData;