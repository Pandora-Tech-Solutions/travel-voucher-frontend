"use client";
import CardRegister from "@/app/components/CardRegister";
import ClientCardDetail from "@/app/components/ClientCardDetail";
import { useGetCardQuery } from "@/store/features/card-slice";
import { useParams } from 'next/navigation'

const ClientCardDetailPage = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetCardQuery(id as string);

  return <ClientCardDetail card={data} loading={isFetching} error={isError} />;
}

export default ClientCardDetailPage;
