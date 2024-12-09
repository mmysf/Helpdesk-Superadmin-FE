/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use-client";

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

const AdminTicketDetail = () => {
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

  const [isOpen, setIsOpen] = useState(false);

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
                  onChange={(e) => {}}
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
            <p>Unable click button</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">description</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ut
              quia dolorum delectus, debitis fugiat possimus, exercitationem
              amet quo nobis et illo laboriosam rerum corporis nostrum earum ex
              ducimus animi?
            </p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Ticket ID</p>
            <p>TICKET-123</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Creted On</p>
            <p>12 Dec 2024, 12:23</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Requester</p>
            <p>email@email.com</p>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Status</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <p>Pending</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs text-slate-400">Priority</p>
            <p>High</p>
          </div>
          <div className="mt-5 bg-slate-300 rounded-md flex justify-between items-center p-3">
            <div className="flex items-center gap-2">
              <Timer />
              <p className="text-slate-600 font-light">00:00:00</p>
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
