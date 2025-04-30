/* eslint-disable no-unused-vars */

"use client";

import {
  useCustomerB2cDetail,
  useCustomerB2cSubscriptionList,
} from "@/root/_app/services/remote/repository/customer/index.service";
import { format } from "date-fns";
import { DefaultListParams } from "@/root/_app/services/remote/repository";
import { Dialog, DialogContent, DialogHeader } from "../../../ui/dialog";
import PaginationWithoutLinks from "../../PaginationWithoutLinks";

interface ModalDetailCustomerB2cProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  id: string;
}

export default function ModalDetailCustomerB2c(
  props: ModalDetailCustomerB2cProps,
) {
  const { isOpen, setIsOpen, title, id } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(1);
  const [params, setParams] = useState<DefaultListParams>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams({
        page: currentPage,
        limit: currentLimit,
        sort: "createdAt",
        dir: "desc",
      });
    }, 3e2);

    return () => clearTimeout(timeout);
  }, [currentPage, currentLimit]);

  const { data } = useCustomerB2cDetail(id);

  const { data: serverList } = useCustomerB2cSubscriptionList(id, {
    axios: { params },
    query: { queryKey: ["subscription-list", params] },
  });

  const formatSeconds = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}h ${m}m ${s}s`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent className="max-w-3xl max-h-[650px] overflow-scroll">
        <DialogHeader className="flex flex-row items-center gap-2">
          <h2 className="text-lg font-bold">{title}</h2>
        </DialogHeader>
        <div className="flex justify-evenly">
          <div className="flex flex-col space-y-2 w-full">
            <p className="text-lg font-semibold">Credit Hour</p>
            <div>
              <p className="text-xs font-light text-gray-600">Product</p>
              <p>
                {data?.data.subscription?.hourPackage != null
                  ? data?.data.subscription.hourPackage.name
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs font-light text-gray-600">Status</p>
              <p
                className={`${data?.data.subscription?.status === "active" ? "text-green-500" : "text-gray-600"} capitalize`}
              >
                {data?.data.subscription?.status}
              </p>
            </div>
            <div>
              <p className="text-xs font-light text-gray-600">
                Total Credit Hour
              </p>
              <p>
                {data?.data.subscription?.hourPackage != null
                  ? formatSeconds(
                      data?.data.subscription.balance?.time.total ?? 0,
                    )
                  : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs font-light text-gray-600">
                Credit Hour Used
              </p>
              <p>
                {data?.data.subscription?.hourPackage != null
                  ? formatSeconds(
                      data?.data.subscription.balance?.time.used ?? 0,
                    )
                  : "-"}
              </p>
            </div>
          </div>
          <div className="w-[2px] bg-gray-300 h-full mx-5" />
          <div className="flex flex-col space-y-2 w-full">
            <p className="text-lg font-semibold">Server Product</p>
            {serverList?.data.list && serverList?.data.list.length > 0 ? (
              <>
                {serverList?.data.list.map((item) => (
                  <div key={item.id}>
                    <div>
                      <p className="text-xs font-light text-gray-600">
                        Product
                      </p>
                      <p>{item.serverPackage.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-light text-gray-600">Status</p>
                      <p className="text-green-500 capitalize">{item.status}</p>
                    </div>
                    <div>
                      <p className="text-xs font-light text-gray-600">
                        Validity
                      </p>
                      <p>{item.serverPackage.validity} Day(s)</p>
                    </div>
                    <div>
                      <p className="text-xs font-light text-gray-600">
                        Expired At
                      </p>
                      <p>
                        {format(new Date(item.expiredAt), "dd MMM yyyy, HH:mm")}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-3">
                  <PaginationWithoutLinks
                    totalData={serverList?.data.total || 1}
                    currentPage={currentPage}
                    perPage={currentLimit}
                    setCurrentPage={setCurrentPage}
                    setCurrentLimit={setCurrentLimit}
                  />
                </div>
              </>
            ) : (
              <div>
                <p className="text-xs font-light text-gray-600">
                  There is no subscription for server product
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
