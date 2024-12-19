"use-client";

import {
  TicketLogTime,
  useTicketDetail,
} from "@/services_remote/repository/ticket/index.service";
import ModalAssignAgent from "@/root/_app/components/organisms/Modals/ModalAssignAgent";
import { Button } from "@/root/_app/components/ui/button";
import { Input } from "@/root/_app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/root/_app/components/ui/select";
import {
  ArrowLeftCircle,
  Play,
  Search,
  SendHorizonal,
  Timer,
  History,
  FilePlus,
} from "lucide-react";

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
  const comments = [
    {
      id: 1,
      sender: "customer",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      createdAt: "2023-08-22T12:00:00.000Z",
      customerName: "John Doe",
    },
    {
      id: 2,
      sender: "agent",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      createdAt: "2023-08-22T12:00:00.000Z",
      customerName: "John Doe",
    },
  ];

  const { data } = useTicketDetail(params?.id || "");
  const [isOpen, setIsOpen] = useState(false);
  const detail = useMemo(() => data?.data, [data]);

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
                <p>Ticket Title</p>
              </div>
              <Button className="bg-transparent">
                <Search className="text-slate-400" />
              </Button>
            </div>
            <div className="bg-[#2C4251] relative rounded-md h-full">
              {comments.map((item) => (
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
                      {item.customerName}
                    </div>
                    <div className="text-sm">{item.content}</div>
                    <div className="text-xs text-slate-400">
                      {item.createdAt}
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-2 bg-transparent rounded-md">
                <Input
                  type="text"
                  placeholder="Type your message here"
                  onChange={() => {}}
                  className="w-full"
                  endContent={
                    <div className="flex">
                      <Button className="bg-transparent text-slate-400">
                        <FilePlus />
                      </Button>
                      <Button className="bg-transparent text-slate-400">
                        <SendHorizonal />
                      </Button>
                    </div>
                  }
                />
              </div>
              <div className="flex space-x-2 w-full p-4 justify-center items-center">
                <Select>
                  <SelectTrigger className="w-fit text-gray-500 h-5">
                    <SelectValue placeholder="Select Agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent">Agent 1</SelectItem>
                    <SelectItem value="closed">Agent 2</SelectItem>
                    <SelectItem value="in progress">Agent 3</SelectItem>
                  </SelectContent>
                </Select>
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center space-x-1 bg-white rounded-full px-2 py-1"
                  >
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                    <div>
                      <p className="text-xs">Pending</p>
                    </div>
                  </div>
                ))}
              </div>
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
            <p>{detail?.createdAt}</p>
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
            <div className="flex gap-2">
              <Button className="bg-white text-slate-900">
                <Play className="text-slate-600" />
                Resume
              </Button>
              <Button className="bg-white text-slate-900">
                <History className="text-slate-600" />
                Time Logs History
              </Button>
            </div>
          </div>
          <div className="flex justify-center w-full mt-5">
            <Button onClick={() => setIsOpen(true)}>Assign To</Button>
          </div>
        </div>
      </div>
      <ModalAssignAgent isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default AdminTicketDetail;
