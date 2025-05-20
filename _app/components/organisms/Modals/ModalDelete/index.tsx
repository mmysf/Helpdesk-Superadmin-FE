/* eslint-disable no-unused-vars */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  subtitle: string;
  onConfirm?: () => void;
}

export default function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
  const { isOpen, setIsOpen, title, subtitle, onConfirm } = props;

  const handleDelete = () => {
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 text-sm">{subtitle}</p>
        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-600"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
