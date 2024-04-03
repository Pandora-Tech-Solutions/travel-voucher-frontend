"use client";
import UserRegister from "@/app/components/UserRegister";
import { useGetUserQuery } from "@/store/features/user-slice";
import { useParams } from 'next/navigation'

const UpdateClient = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetUserQuery(id as string); // Fix: Access the first element of the id array

  return <UserRegister user={data} loading={isFetching} error={isError} clientId={id as string} />; // Fix: Access the first element of the id array
}

export default UpdateClient;
