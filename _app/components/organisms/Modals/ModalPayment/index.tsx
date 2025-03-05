"use client";

import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../../../ui/dialog";

interface ConfirmApproveModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  subtitle: string;
  onApprove: () => Promise<void>;
}

export default function ConfirmApproveModal(props: ConfirmApproveModalProps) {
  const { isOpen, setIsOpen, title, subtitle, onApprove } = props;

  const handleApprove = async () => {
    await onApprove();
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
            className="bg-green-600 hover:bg-green-700"
            onClick={handleApprove}
          >
            Approve Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
