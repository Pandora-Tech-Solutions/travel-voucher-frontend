"use client";
import React, { useCallback } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { theme } from "@/app/theme";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateCardMutation,
  useUpdateCardMutation,
} from "@/store/features/card-slice";
import { useRouter } from "next/navigation";
import { Card } from "@/types/Card";

interface IUserRegisterProps {
  card?: Card;
  loading?: boolean;
  error?: boolean;
}

const CardRegister: React.FC<IUserRegisterProps> = ({
  card,
  error,
  loading,
}) => {
  const [updateCard, updateCardStatus] = useUpdateCardMutation();
  const [createCard, createCardStatus] = useCreateCardMutation();

  const router = useRouter();

  const UserSchema = z.object({
    cardNumber: z.string().min(1, { message: "Informe o número do cartão" }),
    cardExpirationDate: z.string().min(1, { message: "Informe o número do cartão" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues:
      card || {},
  });

  console.log(errors)

  const cardCreate = useCallback(
    async (values: any) => {
      try {
        const cardData: Card = values;

        if (!!card) {
          updateCard({ ...cardData, _id: card._id });
          return router.push("/cms/cards");
        }

        createCard(cardData);
        return  router.push("/cms/cards");
        } catch (error) {
        console.log(error);
      }
    },
    [createCard, router, updateCard, card]
  );

  return loading ? (
    <CircularProgress />
  ) : (
    <Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(cardCreate)}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 5, mx: { md: 10 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">{!!card ? "Editar cartão" : "Novo cartão"}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      id="cardNumber"
                      label="Número do cartão"
                      {...register("cardNumber")}
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={!!errors?.cardNumber}
                      helperText={(errors?.cardNumber?.message || "").toString()}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <TextField
                      focused
                      id="cardExpirationDate"
                      label="Data de validade"
                      {...register("cardExpirationDate")}
                      variant="outlined"
                      type="date"
                      fullWidth
                      size="small"
                      error={!!errors?.cardExpirationDate}
                      helperText={(errors?.cardExpirationDate?.message || "").toString()}
                    />
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

export default CardRegister;
