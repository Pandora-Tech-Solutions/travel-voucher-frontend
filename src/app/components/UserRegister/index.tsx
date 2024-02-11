"use client";
import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "@/app/theme";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/User";
import { states } from "@/utils/constants/states";

const UserRegister: React.FC = () => {
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
    cep: z.string().min(1, { message: "Informe seu CEP" }),
    street: z.string().min(1, { message: "Informe sua rua" }),
    number: z.string().min(1, { message: "Informe o número" }),
    complement: z.string().min(1, { message: "Informe o complemento" }),
    neighborhood: z.string().min(1, { message: "Informe o bairro" }),
    city: z.string().min(1, { message: "Informe a cidade" }),
    state: z.string().min(1, { message: "Informe o estado" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
  };

  const userCreate = useCallback(async (values: any) => {
    const { email, password }: User = values;
    console.log(values);
  }, []);

  return (
    <Box>
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
                        onChange={handleChange}
                        error={!!errors?.roles}
                      >
                        <MenuItem value={"10"}>Ten</MenuItem>
                        <MenuItem value={"20"}>Twenty</MenuItem>
                        <MenuItem value={"30"}>Thirty</MenuItem>
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
                      id="cep"
                      label="CEP"
                      {...register("cep")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.cep}
                      helperText={(errors?.cep?.message || "").toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="street"
                      label="Rua"
                      {...register("street")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.street}
                      helperText={(errors?.street?.message || "").toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="number"
                      label="Número"
                      {...register("number")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.number}
                      helperText={(errors?.number?.message || "").toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="complement"
                      label="Complemento"
                      {...register("complement")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.complement}
                      helperText={(
                        errors?.complement?.message || ""
                      ).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="neighborhood"
                      label="Bairro"
                      {...register("neighborhood")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.neighborhood}
                      helperText={(
                        errors?.neighborhood?.message || ""
                      ).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="city"
                      label="Cidade"
                      {...register("city")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.city}
                      helperText={(errors?.city?.message || "").toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="state">Estado</InputLabel>
                      <Select
                        labelId="state"
                        id="state"
                        {...register("state")}
                        label="Estado"
                        onChange={handleChange}
                        error={!!errors?.state}
                      >
                        {states.map((state) => (
                          <MenuItem value={state.value} key={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors?.state?.message && (
                        <FormHelperText sx={{ color: "#D32F2F" }}>
                          {errors?.state?.message.toString()}
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

export default UserRegister;
