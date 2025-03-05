/* eslint-disable no-unused-vars */

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

interface ConfirmStatusModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  subtitle: string;
  onConfirm?: () => void;
}

export default function ConfirmStatusModal(props: ConfirmStatusModalProps) {
  const { isOpen, setIsOpen, title, subtitle, onConfirm } = props;

  const handleStatus = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">{title}</h2>
        </DialogHeader>
        <p className="text-gray-600 text-sm">{subtitle}</p>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-primary hover:bg-primary/80"
            variant="destructive"
            onClick={handleStatus}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
