import Table from "@/organisms/TableProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

const AdminProduct = () => {
  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Tabs defaultValue="credit" className="flex flex-col w-full">
        <div className="w-[264px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="credit"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Credit Hour
            </TabsTrigger>
            <TabsTrigger
              value="server"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Server Product
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1">
          <TabsContent value="credit">
            <Table title="Manage Credit Hour Here" isHour />
          </TabsContent>
          <TabsContent value="server">
            <Table title="Manage Server Product Here" isHour={false} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

export default AdminProduct;
