/* eslint-disable no-unused-vars */

"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../../../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../../../ui/dialog";

interface ModalDetailCustomerB2cProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
}

export default function ModalDetailCustomerB2c(
  props: ModalDetailCustomerB2cProps,
) {
  const { isOpen, setIsOpen, title } = props;
  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent className="max-w-3xl max-h-[650px] overflow-scroll">
        <DialogHeader className="flex flex-row items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <ArrowLeft className="h-4 w-4" onClick={() => setIsOpen(false)} />
          </Button>
          <h2 className="text-lg font-bold">{title}</h2>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
