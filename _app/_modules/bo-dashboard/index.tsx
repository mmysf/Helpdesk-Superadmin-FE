/* eslint-disable react/no-array-index-key */

"use client";

import Stats from "@/organisms/stats";
import CompanyItem from "../../components/molecules/CompanyItem";
import PaginationWithoutLinks from "../../components/organisms/PaginationWithoutLinks";
import NewTicket from "../../components/organisms/NewTicket";

const AdminDashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Stats />
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold ml-5">Our Company Partner</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2">
          {[1, 2, 3].map((item, index) => (
            <CompanyItem key={index} />
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <PaginationWithoutLinks
            totalData={100}
            perPage={10}
            currentPage={1}
            setCurrentPage={() => {}}
            setCurrentLimit={() => {}}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <NewTicket />
      </div>
      {/* <ProductActive /> */}
    </main>
  );
};

export default AdminDashboard;
