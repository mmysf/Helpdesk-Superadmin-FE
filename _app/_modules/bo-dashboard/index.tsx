/* eslint-disable react/no-array-index-key */

import Stats from "@/organisms/stats";

import NewTicket from "../../components/organisms/NewTicket";
import CompanyDashboard from "../../components/organisms/CompanyDashboard";

const AdminDashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Stats />
      <CompanyDashboard />
      <div className="container mx-auto">
        <NewTicket />
      </div>
      {/* <ProductActive /> */}
    </main>
  );
};

export default AdminDashboard;
