/* eslint-disable react/no-array-index-key */

"use client";

import Link from "next/link";
import { Routes } from "@/root/_app/config/routes";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { useCompanyDetail } from "@/services_remote/repository/company/index.service";
import CompanyItem from "../../../components/molecules/CompanyItem";
import NewTicket from "../../../components/organisms/NewTicket";
import ChartTicket from "../../../components/molecules/ChartTicket";
import ChartTime from "../../../components/molecules/ChartTime";

interface Params {
  id: string;
}

const DetailCompany = ({ params }: { params: Params }) => {
  const companyId = useMemo(() => params.id, [params.id]);
  const { data, isFetching } = useCompanyDetail(companyId);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex space-x-3 items-center mb-4 mt-5">
        <Link href={Routes.BO_COMPANY}>
          <HiOutlineArrowCircleLeft className="text-2xl" />
        </Link>
        <p className="font-semibold">COMPANY 1</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CompanyItem data={data?.data} isLoading={isFetching} />
        <ChartTicket companyId={companyId} />
        <ChartTime companyId={companyId} />
      </div>

      <div className="container mx-auto">
        <NewTicket companyID={companyId} />
      </div>
    </main>
  );
};

export default DetailCompany;
