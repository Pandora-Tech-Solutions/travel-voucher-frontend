"use client";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ForgotPassComponent() {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const ForgotPassSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Informe seu email" })
      .email({ message: "Informe um email válido" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPassSchema),
  });

  const handleForgotPass = useCallback(async (values: any) => {
    const { email } = values;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.status !== 200 && response.status !== 201)
      return setOpenAlert(true);

    setSuccess(true);
  }, []);

  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          width: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleForgotPass)}
      >
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          Recuperar senha
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Para recuperar seu acesso, preencha o campo com seu email.
        </Typography>
        {!success ? (
          <>
            <TextField
              sx={{ marginBottom: "1rem" }}
              id="email"
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors?.email}
              helperText={(errors?.email?.message || "").toString()}
            />
            <Button
              sx={{ marginTop: "1.5rem" }}
              variant="contained"
              type="submit"
            >
              Recuperar acesso
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{ marginBottom: "2rem", textAlign: "center" }}
            >
              Um email foi enviado com as instruções para recuperar sua senha.
            </Typography>
            <Button onClick={() => (window.location.href = "/login")}>
              Voltar para o login
            </Button>
          </>
        )}
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
          Por favor, verifique suas credenciais ou entre em contato com o
          Suporte.
        </Alert>
      </Snackbar>
    </Paper>
  );
}
