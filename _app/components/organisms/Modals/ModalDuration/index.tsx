/* eslint-disable no-unused-vars */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useProductDurationCreate,
  useProductDurationUpdate,
} from "@/services_remote/repository/product-duration/index.service";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";
import useToastError from "@/root/_app/hooks/useToastError";
import { Input } from "../../../ui/input";

interface ModalDurationProps {
  isOpen: boolean;
  productDurationId?: string;
  defaultDuration?: string;
  setIsOpen: (isOpen: boolean) => void;
  onCallback?: () => void;
}

export default function ModalDuration({
  defaultDuration,
  isOpen,
  productDurationId,
  setIsOpen,
  onCallback,
}: ModalDurationProps) {
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState("");

  const isEdit = useMemo(() => !!productDurationId, [productDurationId]);

  const { mutateAsync: handleCreate } = useProductDurationCreate();
  const { mutateAsync: handleUpdate } = useProductDurationUpdate(
    productDurationId || "",
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = { durationInMonth: Number(duration) };
    const action = isEdit ? handleUpdate(payload) : handleCreate(payload);
    await action
      .catch((err) => {
        toastError(err?.data?.message || err.message);
        throw err;
      })
      .finally(() => setIsLoading(false));
    toastSuccess("Data berhasil disimpan");
    if (onCallback) onCallback();
    setIsOpen(false);
  };

  const onHandleNumber = (type: string) => {
    if (type === "inc") {
      setDuration(String(Number(duration) + 1));
    } else {
      if (Number(duration) === 0) return;
      setDuration(String(Number(duration) - 1));
    }
  };

  useEffect(() => {
    setDuration(isOpen ? defaultDuration || "" : "");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-bold">
            {isEdit ? "Update" : "Create New"} Duration
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2">
          <p>
            {!isEdit && <span>New</span>} Duration Category for Subscription
          </p>
          <div className="flex items-center gap-2">
            <Input
              disabled={isLoading}
              placeholder=""
              inputMode="numeric"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="rounded-md bordered-input"
              wrapperClass="max-w-16"
              endContent={
                <div className="mr-3">
                  <ChevronUp
                    onClick={() => onHandleNumber("inc")}
                    className="h-4 w-4 text-slate-500"
                  />
                  <ChevronDown
                    onClick={() => onHandleNumber("dec")}
                    className="h-4 w-4 text-slate-500"
                  />
                </div>
              }
            />
            <p>Months</p>
          </div>
        </div>
        <DialogFooter className="flex justify-between mt-6">
          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
