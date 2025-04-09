/* eslint-disable sonarjs/no-duplicate-string */

"use client";

import useToastError from "@/root/_app/hooks/useToastError";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";
import {
  useOrderDetail,
  useOrderStatusPayment,
  useUploadAttachmentProof,
} from "@/root/_app/services/remote/repository/order/index.service";
import { ArrowLeft } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../../../ui/dialog";
import ModalPayment from "../ModalPayment";
import { Input } from "../../../ui/input";
import { InputUpload } from "../../../ui/input-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";

interface DetailOrderProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  onClose: (isRefresh?: boolean) => void;
  onSuccessSubmit: () => void;
  id: string;
  isServer?: boolean;
}

// type FormApprove = {
//   accountName: string;
//   accountNumber: string;
//   bankName: string;
//   note: string;
//   attachmentId: string;
// };

type FileList = {
  url: string;
  size: number;
  fileName: string;
  id: string;
};

export default function OrderDetailModal(props: DetailOrderProps) {
  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const { isOpen, setIsOpen, title, onClose, id, isServer, onSuccessSubmit } =
    props;
  const { data: detail } = useOrderDetail(id);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [fileData, setFileData] = useState<FileList | null>(null);

  const toastSuccess = useToastSuccess();
  const { mutateAsync: handleUpdateStatusPayment } = useOrderStatusPayment(id);
  const toastError = useToastError();
  const { mutate: uploadAttachment, isPending: isLoading } =
    useUploadAttachmentProof();

  const schema = z.object({
    paymentProof: z
      .string({
        message: "Attachment is required",
      })
      .min(1, { message: "Attachment is required" }),
    accountName: z
      .string({
        message: "Account Name is required",
      })
      .min(1, { message: "Account Name is required" }),
    accountNumber: z
      .string({
        message: "Account Number is required",
      })
      .min(1, { message: "Account Number is required" }),
    bankName: z
      .string({
        message: "Bank Name is required",
      })
      .min(1, { message: "Bank Name is required" }),
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`File ${file.name} is too large. Maximum size is 1 MB`);
        } else {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", `Attachment-${Date.now().toString()}`);
          uploadAttachment(formData, {
            onSuccess: (data) => {
              toast.success("Attachment uploaded");
              form.setValue("paymentProof", data.data.id, {
                shouldValidate: true,
              });
              setFileData({
                url: data.data.url,
                size: data.data.size,
                fileName: data.data.name,
                id: data.data.id,
              });
            },
            // eslint-disable-next-line no-shadow
            onError: (e) => {
              toast.error(e.data.message);
            },
          });
        }
      });
    }
  };

  const handleReject = async () => {
    try {
      await handleUpdateStatusPayment({
        status: "reject",
        note: "reject",
      });
      toastSuccess("Order rejected successfully");
      onClose(true);
    } catch (err: unknown) {
      toastError(err as string);
    }
  };
  const handleApprove = () => {
    if (detail?.data.status !== "waiting_approval") {
      setIsOpenForm(true);
    } else {
      setIsApproveModalOpen(true);
    }
  };

  const handleConfirmApprove = async (note?: string) => {
    let data;
    if (detail?.data.status === "expired") {
      data = {
        status: "paid",
        attachmentId: fileData?.id,
        accountName: form.getValues("accountName"),
        accountNumber: form.getValues("accountNumber"),
        bankName: form.getValues("bankName"),
        note: form.getValues("note"),
      };
    } else {
      data = {
        status: "paid",
        note,
      };
    }
    try {
      await handleUpdateStatusPayment(data, {
        onSuccess: () => {
          toastSuccess("Order approved successfully");
          setIsApproveModalOpen(false);
          onClose();
          onSuccessSubmit();
        },
        onError: (e) => {
          toastError(e.data.message);
        },
      });
    } catch (err: unknown) {
      toastError(err as string);
    }
  };

  const onSubmit = () => {
    handleConfirmApprove();
  };

  if (!isOpen) return null;
  const renderStatus = (status: string) => {
    let color = "";
    switch (status) {
      case "pending":
        color = "bg-[#F7B801]";
        break;
      case "waiting_approval":
        color = "bg-[#007BFF]";
        break;
      case "paid":
        color = "bg-[#28A745]";
        break;
      case "reject":
        color = "bg-[#DC3545]";
        break;
      default:
        color = "bg-[#6C757D]";
    }
    return (
      <div
        aria-label="status"
        className={`uppercase ${color} flex items-center justify-center w-fit text-white px-2 py-1 rounded-3xl`}
        role="button"
      >
        {status?.replace("_", " ")}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-row items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <ArrowLeft className="h-4 w-4" onClick={() => onClose()} />
          </Button>
          <h2 className="text-lg font-bold">{title}</h2>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Order ID
              </h3>
              <p className="text-lg font-bold">{detail?.data.orderNumber}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <div className="mt-1">
                <span>{renderStatus(detail?.data.status as string)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Date
              </h3>
              <p className="font-medium">
                {detail?.data.createdAt
                  ? new Date(detail.data.createdAt).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : ""}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Customer
              </h3>
              <p className="font-medium">{detail?.data.customer.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Email
              </h3>
              <p className="font-medium">{detail?.data.customer.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Package Name
              </h3>
              <p className="font-medium">
                {isServer
                  ? detail?.data?.serverPackage?.name
                  : detail?.data?.hourPackage?.name}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {isServer ? "Validity" : "Credit Hour"}
              </h3>
              <p className="font-medium">
                {isServer
                  ? detail?.data?.serverPackage?.validity
                  : detail?.data?.hourPackage?.hours}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Benefit
              </h3>
              {(isServer
                ? detail?.data?.serverPackage?.benefit
                : detail?.data?.hourPackage?.benefit
              )?.map((item) => (
                <div className="flex items-center gap-1" key={item}>
                  <GoDotFill />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Proof</h3>
            {isOpenForm && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <div>
                    <FormField
                      name="paymentProof"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Proof</FormLabel>
                          <FormControl>
                            <InputUpload
                              {...field}
                              name="paymentProof"
                              selectedFileName={fileData?.fileName || ""}
                              isLoading={isLoading}
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                field.onChange(file);
                                handleFileChange(e);
                                field.onBlur();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2">
                    <FormField
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id="accountName"
                              data-testid="accountName"
                              placeholder="Account Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2">
                    <FormField
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id="accountNumber"
                              data-testid="accountNumber"
                              placeholder="Account Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-2">
                    <FormField
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id="bankName"
                              data-testid="bankName"
                              placeholder="Bank Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                    <Button
                      variant="outline"
                      onClick={() => setIsOpenForm(false)}
                    >
                      cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Confirm Payment
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {!isOpenForm && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Payment proof attachment
                  </h4>
                  {detail?.data.payment.manualPaid?.attachment?.name !== "" ? (
                    <a
                      target="_blank"
                      href={detail?.data.payment.manualPaid?.attachment?.url}
                      className="text-blue-500 mt-1"
                    >
                      {detail?.data.payment.manualPaid.attachment.name}
                    </a>
                  ) : (
                    <span className="text-gray-400 mt-1">No attachment</span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Account name
                  </h4>
                  <p className="font-medium">
                    {detail?.data.payment.manualPaid?.accountName ?? "-"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Account number
                  </h4>
                  <p className="font-medium">
                    {detail?.data?.payment?.manualPaid?.accountNumber ?? "-"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Bank name
                  </h4>
                  <p className="font-medium">
                    {detail?.data.payment.manualPaid?.bankName ?? "-"}
                  </p>
                </div>
                {(detail?.data.status.toString() === "waiting_approval" ||
                  detail?.data.status.toString() === "expired") && (
                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <ModalPayment
        isOpen={isApproveModalOpen}
        setIsOpen={setIsApproveModalOpen}
        title="Approve Order"
        subtitle={`Are you sure you want to approve order ${detail?.data.orderNumber}?`}
        onApprove={(note) => handleConfirmApprove(note)}
      />
    </Dialog>
  );
}
