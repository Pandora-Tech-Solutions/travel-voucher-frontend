"use client";
import CardRegister from "@/app/components/CardRegister";
import { useGetCardQuery } from "@/store/features/card-slice";
import { useParams } from 'next/navigation'

const UpdateCard = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetCardQuery(id as string);

  return <CardRegister card={data} loading={isFetching} error={isError} />;
}

export default UpdateCard;
