/* eslint-disable no-unused-vars */

"use client";

import { useForm } from "react-hook-form";
import * as zod from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";

interface ConfirmApproveModalProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  subtitle: string;
  onApprove: (note: string) => void;
}

export default function ConfirmApproveModal(props: ConfirmApproveModalProps) {
  const { isOpen, setIsOpen, title, subtitle, onApprove } = props;

  const schema = z.object({
    note: z
      .string({
        message: "Note is required",
      })
      .min(1, { message: "Note is required" }),
  });

  const form = useForm<z.infer<typeof schema>>({
    mode: "all",
    resolver: zod.zodResolver(schema),
  });

  const handleApprove = async (data: { note: string }) => {
    await onApprove(data.note);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600 text-sm">{subtitle}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleApprove)}
            className="flex flex-col gap-3"
          >
            <div className="mt-2">
              <FormField
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="note"
                        data-testid="note"
                        placeholder="Note"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-center mt-8 gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                cancel
              </Button>
              <Button color="primary" type="submit">
                Approve Order
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
