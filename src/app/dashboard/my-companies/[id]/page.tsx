"use client";
import CompanyRegister from "@/app/components/CompanyRegister";
import { useGetUserQuery } from "@/store/features/user-slice";
import { useParams } from 'next/navigation'

const UpdateClient = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetUserQuery(id as string);

  return <CompanyRegister company={{} as any} loading={isFetching} error={isError} />;
}

export default UpdateClient;
