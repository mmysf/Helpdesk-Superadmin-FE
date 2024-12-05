/* eslint-disable react/no-array-index-key */

"use client";

import CompanyItem from "../../../components/molecules/CompanyItem";
import NewTicket from "../../../components/organisms/NewTicket";

const DetailCompany = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <CompanyItem />
      <div className="container mx-auto">
        <NewTicket />
      </div>
    </main>
  );
};

export default DetailCompany;
