"use client";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";

import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { User } from "@/types/User";
import UserData from "./UserData";
import CompanySearch from "../CompanySearch";
import CardSearch from "../CardSearch";

interface IUserRegisterProps {
  user?: User;
  loading?: boolean;
  error?: boolean;
  clientId?: string;
  isAdmin?: boolean;
}

const UserRegister: React.FC<IUserRegisterProps> = ({
  user,
  error,
  loading,
  clientId = "",
  isAdmin = false,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return !user && loading ? (
    <CircularProgress />
  ) : (
    <Box>
      {!isAdmin && (
        <Tabs value={value} onChange={handleChange} sx={{ mb: 3 }}>
          <Tab label="Dados do cliente" />
          <Tab label="Empresas do cliente" />
          <Tab label="Cartões do cliente" />
        </Tabs>
      )}
      {value === 0 && <UserData user={user} isAdmin={isAdmin} />}
      {value === 1 && (
        <CompanySearch
          companysSelected={user?.companies || []}
          setCompanys={() => ({})}
        />
      )}
      {value === 2 && <CardSearch clientId={clientId} user={user as any} />}
    </Box>
  );
};

export default UserRegister;
