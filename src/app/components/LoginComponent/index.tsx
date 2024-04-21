"use client";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  LoginPayload,
  logIn,
  useLoginUserMutation,
} from "@/store/features/auth-slice";

export default function LoginComponent() {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const [loginUser, status] = useLoginUserMutation();

  const LoginSchema = z.object({
    email: z
      .string()
      .min(1, { message: "Informe seu email" })
      .email({ message: "Informe um email válido" }),
    password: z.string().min(1, { message: "Informe sua senha" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const userLogin = useCallback(
    async (values: any) => {
      const { email, password }: LoginPayload = values;
      const { data } = (await loginUser({ email, password })) as any;

      if (data?.access_token) {
        dispatch(logIn({ access_token: data?.access_token, user: data?.user }));
        router.push("/cms");
      }
    },
    [dispatch, loginUser, router]
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (status && status?.isError) {
      setLoading(false);
      setOpenAlert(true);
    }
  }, [status]);

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
        onSubmit={handleSubmit(userLogin)}
      >
        <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
          Vale Viagens
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "2rem", textAlign: "center" }}
        >
          Faça login e comece a aventura
        </Typography>
        <TextField
          sx={{ marginBottom: "1rem" }}
          id="email"
          label="Email"
          variant="outlined"
          {...register("email")}
          error={!!errors?.email}
          helperText={(errors?.email?.message || "").toString()}
        />
        <FormControl sx={{ marginY: "1rem" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
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
        <Grid container>
          <Grid item xs sx={{ display: "flex", alignItems: "center" }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography
                    variant="caption"
                    sx={{ marginTop: "1rem", textAlign: "center" }}
                  >
                    Lembre de mim
                  </Typography>
                }
                sx={{ fontSize: "0.5rem" }}
              />
            </FormGroup>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="text"
              size="small"
              sx={{ fontSize: "0.8rem" }}
              onClick={() => (window.location.href = "/forgot-pass")}
            >
              Esqueceu sua senha?
            </Button>
          </Grid>
        </Grid>
        <Button sx={{ marginTop: "1.5rem" }} variant="contained" type="submit" disabled={loading}>
          {loading ? 'Aguarde...' : 'Entrar'}
        </Button>
        {/* <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="body2"
            sx={{ marginTop: "1rem", textAlign: "center" }}
          >
            Novo por aqui?
          </Typography>
          <Button variant="text" sx={{ mx: "auto" }}>
            Criar conta
          </Button>
        </Box> */}
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
