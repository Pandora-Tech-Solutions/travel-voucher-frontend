"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";
import ResetPassComponent from "../components/ResetPassComponent";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setOpenAlert(true);
    }
  }, [token]);

  return (
    <>
      <ResetPassComponent token={token || ''} />
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
          Token não fornecido
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResetPassword;
