"use client";

import useToastError from "@/root/_app/hooks/useToastError";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";
import {
  useOrderDetail,
  useOrderStatusPayment,
} from "@/root/_app/services/remote/repository/order/index.service";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Button } from "../../../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../../../ui/dialog";
import ModalPayment from "../ModalPayment";

interface DetailOrderProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  onClose: () => void;
  id: string;
  isServer?: boolean;
}

export default function OrderDetailModal(props: DetailOrderProps) {
  const { isOpen, setIsOpen, title, onClose, id, isServer } = props;
  const { data: detail } = useOrderDetail(id);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const toastSuccess = useToastSuccess();
  const { mutateAsync: handleUpdateStatusPayment } = useOrderStatusPayment(id);
  const toastError = useToastError();

  const handleReject = async () => {
    try {
      await handleUpdateStatusPayment({
        status: "reject",
      });
      toastSuccess("Order rejected successfully");
      onClose();
    } catch (err: unknown) {
      toastError(err as string);
    }
  };
  const handleApprove = () => {
    setIsApproveModalOpen(true);
  };
  const handleConfirmApprove = async () => {
    try {
      await handleUpdateStatusPayment({
        status: "paid",
      });
      toastSuccess("Order approved successfully");
      setIsApproveModalOpen(false);
      onClose();
    } catch (err: unknown) {
      toastError(err as string);
    }
  };
  if (!isOpen) return null;
  const renderStatus = (status: string) => {
    let color = "";
    switch (status) {
      case "pending":
        color = "bg-[#F7B801]";
        break;
      case "waiting approval":
        color = "bg-[#007BFF]";
        break;
      case "paid":
        color = "bg-[#28A745]";
        break;
      case "rejected":
        color = "bg-[#DC3545]";
        break;
      default:
        color = "bg-[#6C757D]";
    }
    return (
      <div
        aria-label="status"
        className={`capitalize ${color} text-white px-2 py-1 rounded-3xl`}
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
            <ArrowLeft className="h-4 w-4" onClick={onClose} />
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
              </div>{" "}
              {/* Tambahkan ini */}
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

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Payment Proof
              </h4>
              <p className="text-blue-500 mt-1">
                {detail?.data.invoice.invoiceURL}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Account name
              </h4>
              <p className="font-medium">{detail?.data.invoice.merchantName}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Account number
              </h4>
              <p className="font-medium">
                {detail?.data?.payment?.manualPaid?.accountNumber}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Bank name
              </h4>
              <p className="font-medium">
                {detail?.data.invoice.paymentChannel}
              </p>
            </div>

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
          </div>
        </div>
      </DialogContent>
      <ModalPayment
        isOpen={isApproveModalOpen}
        setIsOpen={setIsApproveModalOpen}
        title="Approve Order"
        subtitle={`Are you sure you want to approve order ${detail?.data.orderNumber}?`}
        onApprove={handleConfirmApprove}
      />
    </Dialog>
  );
}
