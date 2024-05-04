"use client";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Box,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./styles.module.css";
import Image from "next/image";

interface ResetPasswordProps {
  token: string;
  newUser?: boolean;
}

const ResetPassComponent: React.FC<ResetPasswordProps> = ({
  token,
  newUser = false,
}) => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const ResetPassSchema = z
    .object({
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
    <section className={styles.container}>
      <div className={styles.content}>
        <Paper
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Image
            src="https://static.tursites.com.br/data/design/user/vendas.laiketurismo.com.br/image/logo.png"
            alt="Laiketurismo"
            width={150}
            height={100}
          />
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
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              {newUser ? "Crie sua senha" : "Redefina sua senha"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "2rem", textAlign: "center" }}
            >
              Entre com a senha escolhida.
            </Typography>
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
                Confirme a senha
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
                      onMouseDown={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="confirmPassword"
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
            >
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
              Não foi possível recuperar a sua senha, por favor, entre em
              contato com o Suporte.
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
      </div>
      <div className={styles.background} />
    </section>
  );
};

export default ResetPassComponent;
