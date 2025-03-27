"use-client";

import {
  TicketLogTime,
  useTicketDetail,
} from "@/services_remote/repository/ticket/index.service";
import ModalAssignAgent from "@/root/_app/components/organisms/Modals/ModalAssignAgent";
import { Button } from "@/root/_app/components/ui/button";
import { ArrowLeftCircle, Search, Timer } from "lucide-react";
import { useTicketCommentList } from "@/root/_app/services/remote/repository/ticket-comment/index.service";
import { formatDate } from "date-fns";

interface RenderTimerProps {
  logTime?: TicketLogTime;
}

interface Props {
  params?: { [key: string]: string };
  // searchParams?: { [key: string]: string };
}

const format = (str: string, ...values: (string | number)[]) =>
  str.replace(/%s/g, () => String(values.shift()));

const RenderTimer: React.FC<RenderTimerProps> = ({ logTime }) => {
  const interval = useRef<NodeJS.Timeout>();
  const [seconds, setSeconds] = useState<number>(
    logTime?.totalDurationInSeconds || 0,
  );

  const total = useMemo(() => {
    let h = 0;
    let m = 0;
    let s = 0;

    if (seconds && seconds > 0) {
      h = Math.floor(seconds / 3600);
      m = Math.floor((seconds % 3600) / 60);
      s = seconds % 60;
    }

    return format(
      "%s:%s:%s",
      h.toString().padStart(2, "0"),
      m.toString().padStart(2, "0"),
      s.toString().padStart(2, "0"),
    );
  }, [seconds]);

  useEffect(() => {
    if (logTime?.status === "running") {
      interval.current = setInterval(() => {
        setSeconds((v) => (v || 0) + 1);
      }, 1e3);
    }

    return () => clearInterval(interval.current);
  }, [logTime]);

  return <p className="text-slate-600 font-light">{total}</p>;
};

const AdminTicketDetail = ({ params }: Props) => {
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
        <Button onClick={() => {}} variant="ghost">
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
                  {/* <LogoBrand /> */}
                </div>
                <p>{detail?.customer.name}</p>
              </div>
              <Button className="bg-transparent">
                <Search className="text-slate-400" />
              </Button>
            </div>
            <div className="bg-[#2C4251] relative rounded-md h-full max-h-[560px] overflow-auto">
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
                      {formatDate(item.createdAt, "dd/MM/yyyy HH:mm")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-6">
          <div className="w-full flex justify-center">
            <p className="font-semibold text-lg">Ticket Iformation</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Subject</p>
            <p>{detail?.subject}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">description</p>
            <p>{detail?.content}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Ticket ID</p>
            <p>{detail?.code}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Creted On</p>
            <p> {formatDate(detail?.createdAt ?? "", "dd/MM/yyyy HH:mm")}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Requester</p>
            <p>{detail?.customer.name}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <div>{detail?.status}</div>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Priority</p>
            <p>{detail?.priority}</p>
          </div>
          <div className="mt-5 bg-slate-300 rounded-md flex gap-2 justify-between items-center p-3">
            <div className="flex items-center gap-2">
              <Timer />
              <RenderTimer logTime={detail?.logTime} />
            </div>
            {/* <div className="flex gap-2">
              <Button className="bg-white text-slate-900">
                <Play className="text-slate-600" />
                Resume
              </Button>
              <Button className="bg-white text-slate-900">
                <History className="text-slate-600" />
                Time Logs History
              </Button>
            </div> */}
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
