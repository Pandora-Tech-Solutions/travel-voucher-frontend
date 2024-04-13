'use client'
import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { User } from '@/types/User';
import UserData from '@/app/components/UserRegister/UserData';

const MyData: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  return (
    <UserData user={user as User} />
  )
}

export default MyData;