"use client";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

import styles from "./styles.module.css";
import Image from "next/image";
import { Roles } from "@/types/Roles";
import { User } from "@/types/User";

export default function LoginComponent() {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const LoginSchema = z
    .object({
      name: z.string().min(1, { message: "Informe seu nome" }),
      email: z
        .string()
        .min(1, { message: "Informe seu email" })
        .email({ message: "Informe um email válido" }),
      phone: z.string().min(1, { message: "Informe seu telefone" }),
      password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
      confirmPassword: z.string().min(6, {
        message: "Senha deve ter no mínimo 6 caracteres",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const clientRegister = useCallback(
    async (values: any) => {
      setLoading(true)
      const userData: User = values;

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        body: JSON.stringify({ ...userData, roles: [Roles.USER] }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((response) => {
        console.log(response.status)
        if (response.status !== 201) {
          setLoading(false);
          return setOpenAlert(true);
        }

        return router.push("/login");
      });
    },
    [router]
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "1rem",
            overflow: "auto",
          }}
        >
          <Image
            src="https://static.tursites.com.br/data/design/user/vendas.laiketurismo.com.br/image/logo.png"
            alt="Laiketurismo"
            width={150}
            height={100}
            style={{ marginBottom: "1rem" }}
          />
          <Box
            component="form"
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(clientRegister)}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              Cadastre-se
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "2rem", textAlign: "center" }}
            >
              Viaje o mundo com Laike Turismo! Vale-viagens: benefícios
              exclusivos e destinos incríveis. Cadastre-se agora!
            </Typography>
            <TextField
              sx={{ marginBottom: "1rem" }}
              id="name"
              label="Nome completo"
              variant="outlined"
              {...register("name")}
              error={!!errors?.name}
              helperText={(errors?.name?.message || "").toString()}
            />
            <TextField
              sx={{ marginBottom: "1rem" }}
              id="email"
              label="E-mail"
              variant="outlined"
              {...register("email")}
              error={!!errors?.email}
              helperText={(errors?.email?.message || "").toString()}
            />
            <TextField
              sx={{ marginBottom: "1rem" }}
              id="phone"
              label="Telefone"
              variant="outlined"
              {...register("phone")}
              error={!!errors?.phone}
              helperText={(errors?.phone?.message || "").toString()}
            />
            <FormControl sx={{ marginY: "1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors?.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors?.password?.message && (
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors?.password?.message.toString()}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ marginY: "1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirme sua senha
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                error={!!errors?.confirmPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors?.confirmPassword?.message && (
                <FormHelperText sx={{ color: "#D32F2F" }}>
                  {errors?.confirmPassword?.message.toString()}
                </FormHelperText>
              )}
            </FormControl>
            <Button
              sx={{ marginTop: "1.5rem" }}
              variant="contained"
              type="submit"
              disabled={loading}
            >
              {loading ? "Aguarde..." : "Salvar"}
            </Button>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="caption"
                sx={{ marginTop: "1rem", color: "#666" }}
              >
                Ao clicar em Salvar, você concorda com nossos Termos de Uso e a
                Política de Privacidade.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body2"
                sx={{ marginTop: "1rem", textAlign: "center" }}
              >
                Já possui cadastro?
              </Typography>
              <Button variant="text" sx={{ mx: "auto" }} onClick={() => router.push('/login')}>
                Faça login
              </Button>
            </Box>
          </Box>
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={() => setOpenAlert(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenAlert(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              Não foi possível realizar o cadastro, entre em contato com o
              Suporte.
            </Alert>
          </Snackbar>
        </Paper>
      </div>
      <div className={styles.background} />
    </section>
  );
}
