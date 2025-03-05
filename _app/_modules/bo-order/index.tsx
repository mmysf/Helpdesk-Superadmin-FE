import Order from "@/organisms/TableOrder";
import Server from "@/organisms/TableServer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

const AdminOrder = () => {
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
            <Order />
          </TabsContent>
          <TabsContent value="server">
            <Server />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

export default AdminOrder;
