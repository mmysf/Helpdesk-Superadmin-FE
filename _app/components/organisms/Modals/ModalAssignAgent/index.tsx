/* eslint-disable no-unused-vars */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../../ui/input";
import { Checkbox } from "../../../ui/checkbox";
import { Card, CardContent } from "../../../ui/card";

interface ModalAssignAgentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AGENT = Array.from({ length: 3 }, (_, i) => ({
  id: `${i}`,
  agent: `Agent ${i}`,
}));

export default function ModalAssignAgent(props: ModalAssignAgentProps) {
  const { isOpen, setIsOpen } = props;
  const [searchAgent, setSearchAgent] = useState("");

  const handleSubmit = () => {
    setIsOpen(false);
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
              {AGENT.map((agent) => (
                <div
                  key={agent.id}
                  className="w-full flex items-center justify-between gap-2 p-2"
                >
                  <p className="text-sm">{agent.agent}</p>
                  <Checkbox className="border-slate-400" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <p>Assign</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
