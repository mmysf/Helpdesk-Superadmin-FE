/* eslint-disable sonarjs/cognitive-complexity */

"use-client";

import { useTicketDetail } from "@/services_remote/repository/ticket/index.service";
import ModalAssignAgent from "@/root/_app/components/organisms/Modals/ModalAssignAgent";
import { Button } from "@/root/_app/components/ui/button";
import { ArrowLeftCircle, User2 } from "lucide-react";
import { useTicketCommentList } from "@/root/_app/services/remote/repository/ticket-comment/index.service";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface Props {
  params?: { [key: string]: string };
}

const AdminTicketDetail = ({ params }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { refetch, data } = useTicketDetail(params?.id || "");
  const detail = useMemo(() => data?.data, [data]);

  const { data: dataTicketComment } = useTicketCommentList(detail?.id || "", {
    query: {
      queryKey: ["ticket-comment", detail?.id],
      enabled: !!detail?.id,
    },
  });
  const ticketComments = useMemo(
    () => dataTicketComment?.data?.list || [],
    [dataTicketComment],
  );

  const handleOnCallback = () => {
    refetch();
    setIsOpen(false);
  };

  return (
    <div className="w-full p-6">
      <div className="flex items-center">
        <Button onClick={() => router.back()} variant="ghost">
          <ArrowLeftCircle size={20} />
        </Button>
        <h1>Detail Ticket</h1>
      </div>
      <div className="flex justify-evenly p-4 gap-6">
        <div className="w-full">
          <div className="w-full border-[1px] border-slate-400 rounded-md h-fit min-h-0.5">
            <div className="flex items-center justify-between m-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center">
                  <User2 className="w-7 h-7 text-slate-700" />
                </div>
                <p>{detail?.customer.name}</p>
              </div>
            </div>
            <div className="bg-[#2C4251] relative rounded-md h-full min-h-64 max-h-[560px] overflow-auto">
              {ticketComments.length === 0 && (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-slate-400">No Comment Yet</p>
                </div>
              )}
              {ticketComments.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col w-full p-3 bg-[#2C4251]"
                >
                  <div
                    className={`w-fit bg-white p-3 ${
                      item.sender === "agent"
                        ? "self-end rounded-tl-lg rounded-tr-none"
                        : "self-start rounded-tl-none rounded-tr-lg"
                    } rounded-b-lg`}
                  >
                    <div className="font-semibold text-xs">
                      {item.agent.name}
                    </div>
                    <div className="text-sm">{item.content}</div>
                    <div className="text-xs text-slate-400">
                      {formatDate(item.createdAt, "dd MMM yyyy, HH:mm")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-6">
          <div className="w-full flex justify-center">
            <p className="font-semibold text-lg">Ticket Information</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Subject</p>
            <p>{detail?.subject}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Description</p>
            <p>{detail?.content}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Ticket ID</p>
            <p>{detail?.code}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Creted On</p>
            <p>
              {formatDate(detail?.createdAt ?? Date.now(), "dd/MM/yyyy HH:mm")}
            </p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Requester</p>
            <p>{detail?.customer.name}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Status</p>
            <span
              className={clsx(
                "px-2 py-1 rounded-full uppercase text-xs text-white whitespace-nowrap",
                detail?.status === "open"
                  ? "bg-blue-500"
                  : detail?.status === "in_progress"
                    ? "bg-amber-500"
                    : detail?.status === "resolve"
                      ? "bg-green-500"
                      : detail?.status === "closed"
                        ? "bg-red-500"
                        : "bg-gray-500",
              )}
            >
              {detail?.status.replace("_", " ")}
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Priority</p>
            <p>{detail?.priority}</p>
          </div>
          {detail?.company.type && detail.company.type === "B2C" && (
            <div className="flex justify-center w-full mt-5">
              <Button onClick={() => setIsOpen(true)}>Assign To</Button>
            </div>
          )}
        </div>
      </div>
      <ModalAssignAgent
        ticketId={detail?.id}
        companyId={detail?.company.id}
        agents={detail?.agents ?? []}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCallback={handleOnCallback}
      />
    </div>
  );
};

export default AdminTicketDetail;
