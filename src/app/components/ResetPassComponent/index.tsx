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

interface ResetPasswordProps {
  token: string;
}

const ResetPassComponent: React.FC<ResetPasswordProps> = ({ token }) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const ResetPassSchema = z.object({
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPassSchema),
  });

  const handleForgotPass = useCallback(
    async (values: any) => {
      const { password } = values;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, token }),
        }
      );

      if (response.status !== 200 && response.status !== 201)
        return setOpenAlert(true);

      setSuccess(true);
      window.location.href = "/login";
    },
    [token]
  );

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
          Redefina sua senha
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Digite sua nova senha.
        </Typography>
        <TextField
          sx={{ marginBottom: "1rem" }}
          id="password"
          label="Senha"
          variant="outlined"
          {...register("password")}
          error={!!errors?.password}
          helperText={(errors?.password?.message || "").toString()}
        />
        <Button sx={{ marginTop: "1.5rem" }} variant="contained" type="submit">
          Recuperar acesso
        </Button>
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
          Não foi possível recuperar a sua senha, por favor, entre em contato
          com o Suporte.
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Senha recuperada com sucesso.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ResetPassComponent;
