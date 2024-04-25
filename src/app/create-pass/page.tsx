"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";
import ResetPassComponent from "../components/ResetPassComponent";

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
    <Suspense>
      <ResetPassComponent token={token || ''} newUser />
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
    </Suspense>
  );
};

export default ResetPassword;
