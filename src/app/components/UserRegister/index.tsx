"use client";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";
import { User } from "@/types/User";
import UserData from "./UserData";
import CompanySearch from "../CompanySearch";
import CardSearch from "../CardSearch";

interface IUserRegisterProps {
  user?: User;
  loading?: boolean;
  error?: boolean;
  clientId?: string;
}

const UserRegister: React.FC<IUserRegisterProps> = ({
  user,
  error,
  loading,
  clientId = '',
}) => {

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return !user && loading ? (
    <CircularProgress />
  ) : (
    <Box>
      <Tabs value={value} onChange={handleChange} sx={{ mb: 3 }}>
        <Tab label="Dados do cliente" />
        <Tab label="Empresas do cliente" />
        <Tab label="Cartões do cliente" />
      </Tabs>
      {value === 0 && <UserData user={user} />}
      {value === 1 && <CompanySearch companysSelected={user?.companies || []} setCompanys={() => ({})} />}
      {value === 2 && <CardSearch clientId={clientId} />}
    </Box>
  );
};

export default UserRegister;
