import Stats from "@/organisms/stats";
import ProductActive from "@/organisms/product-active";

const AdminDashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Stats />
      <ProductActive />
    </main>
  );
};

export default AdminDashboard;
