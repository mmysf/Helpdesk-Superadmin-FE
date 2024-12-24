/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalToggleDurationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isActive: boolean;
  isDuration?: boolean;
  onConfirm?: () => void;
}

export default function ModalToggleDuration(props: ModalToggleDurationProps) {
  const { isOpen, setIsOpen, isActive, isDuration = false, onConfirm } = props;

  const handleDelete = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">ATTENTION</h2>
        </DialogHeader>
        <p className="text-gray-600 text-sm">
          Are you sure you want to{" "}
          <span>{isActive ? "deactivate" : "activate"}</span>{" "}
          {isDuration ? "Duration" : "Subscription"} ?
        </p>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant={isActive ? "destructive" : "default"}
            onClick={handleDelete}
          >
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
