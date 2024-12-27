/* eslint-disable no-unused-vars */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import useToastError from "@/hooks/useToastError";
import useToastSuccess from "@/hooks/useToastSuccess";
import { useAgentList } from "@/services_remote/repository/agent/index.service";
import { useTicketAssignTo } from "@/services_remote/repository/ticket/index.service";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { Input } from "../../../ui/input";
import { Checkbox } from "../../../ui/checkbox";
import { Card, CardContent } from "../../../ui/card";

interface ModalAssignAgentProps {
  ticketId?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCallback?: () => void;
}

interface FormData {
  agentIds: string[];
}

export default function ModalAssignAgent({
  isOpen,
  ticketId,
  setIsOpen,
  onCallback,
}: ModalAssignAgentProps) {
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const [searchAgent, setSearchAgent] = useState("");

  const { data } = useAgentList({ axios: { params: { limit: 1e3 } } });
  const { mutateAsync: handleAssignTo } = useTicketAssignTo(ticketId || "");

  const agentList = useMemo(
    () =>
      (data?.data.list || []).filter(
        (v) =>
          searchAgent === "" ||
          v.name.toLocaleLowerCase().includes(searchAgent.toLocaleLowerCase()),
      ),
    [data, searchAgent],
  );

  const { getValues, handleSubmit, setValue, watch } = useForm<FormData>();

  const handleCheckboxChange = (val: string, isChecked: boolean) => {
    const currentValues = getValues("agentIds") || [];
    setValue(
      "agentIds",
      isChecked
        ? [...currentValues, val]
        : currentValues.filter((v) => v !== val),
    );
  };

  const hansleOnSubmit = async (payload: FormData) => {
    await handleAssignTo(payload).catch((err) => {
      toastError(err.data?.message || err.message);
      throw err;
    });
    toastSuccess("Tiket berhasil di-assign ke agent");
    if (onCallback) onCallback();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">Assign to Agent</h2>
        </DialogHeader>

        <div>
          <Input
            placeholder="Search Agent"
            className="rounded-md bordered-input"
            value={searchAgent}
            endContent={
              <Button variant="ghost">
                <Search />
              </Button>
            }
            onChange={(e) => setSearchAgent(e.target.value)}
          />
          <Card className="mt-3">
            <CardContent className="p-3">
              {agentList.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex items-center justify-between gap-2 p-2"
                >
                  <p className="text-sm">{item.name}</p>
                  <Checkbox
                    className="border-slate-400"
                    value={item.id}
                    onCheckedChange={(isChecked) =>
                      handleCheckboxChange(item.id, isChecked as boolean)
                    }
                    checked={(watch("agentIds") || []).includes(item.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(hansleOnSubmit)}>
            <p>Assign</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
