/* eslint-disable react/no-array-index-key */

"use client";

import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import CompanyItem from "../../../components/molecules/CompanyItem";
import NewTicket from "../../../components/organisms/NewTicket";
import ChartTicket from "../../../components/molecules/ChartTicket";
import ChartTime from "../../../components/molecules/ChartTime";

const DetailCompany = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex space-x-3 items-center cursor-pointer mb-4 mt-5">
        <HiOutlineArrowCircleLeft className="text-2xl" />
        <p className="font-semibold">COMPANY 1</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <CompanyItem />
        <ChartTicket />
        <ChartTime />
      </div>

      <div className="container mx-auto">
        <NewTicket />
      </div>
    </main>
  );
};

export default DetailCompany;
