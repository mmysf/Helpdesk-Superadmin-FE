"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  entityName: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onDelete,
  entityName,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">ATTENTION</h2>
        </DialogHeader>
        <p className="text-gray-600 text-sm">
          Are you sure you want to delete this {entityName}?
        </p>

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-red-600"
            variant="destructive"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
