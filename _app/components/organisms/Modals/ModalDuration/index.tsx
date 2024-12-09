/* eslint-disable no-unused-vars */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "../../../ui/input";

interface ModalDurationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isNew: boolean;
}

export default function ModalDuration(props: ModalDurationProps) {
  const { isOpen, setIsOpen, isNew } = props;
  const [duration, setDuration] = useState("0");

  const handleSubmit = () => {
    setIsOpen(false);
  };

  const onHandleNumber = (type: string) => {
    if (type === "inc") {
      setDuration(String(Number(duration) + 1));
    } else {
      if (Number(duration) === 0) return;
      setDuration(String(Number(duration) - 1));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">
            {isNew ? "Create New" : "Update"} Duration
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2">
          <p>{isNew && <span>New</span>} Duration Category for Subscription</p>
          <div className="flex items-center gap-2">
            <Input
              placeholder="0"
              inputMode="numeric"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="rounded-md bordered-input"
              wrapperClass="max-w-16"
              endContent={
                <div className="mr-3">
                  <ChevronUp
                    onClick={() => onHandleNumber("inc")}
                    className="h-4 w-4 text-slate-500"
                  />
                  <ChevronDown
                    onClick={() => onHandleNumber("dec")}
                    className="h-4 w-4 text-slate-500"
                  />
                </div>
              }
            />
            <p>Months</p>
          </div>
        </div>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isNew ? <span>Create</span> : <span>Update</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
