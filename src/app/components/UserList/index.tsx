"use client";
import React, { useEffect } from 'react';

import { useLazyGetUsersQuery } from '@/store/features/user-slice';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';

const UserList: React.FC = () => {
  const { users } = useAppSelector((state: RootState) => state.users);
  const [ getUsers, status ] = useLazyGetUsersQuery()

  console.log(users, status)

  useEffect(() => {
    getUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <div />;
}

export default UserList;